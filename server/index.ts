import express from 'express';
import cors from 'cors';
import * as admin from 'firebase-admin';
import multer from 'multer';
import { WebSocketServer } from 'ws';
import http from 'http';

process.on('uncaughtException', (err, origin) => {
  console.error('CRITICAL: UNCAUGHT EXCEPTION');
  console.error(err);
  console.error('Origin:', origin);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('CRITICAL: UNHANDLED REJECTION');
  console.error(reason);
  process.exit(1);
});

const serviceAccount = require('./firebase-service-account.json');

const app = express();
const port = process.env.PORT || 3001;

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://sam-solutions-b236b.appspot.com'
  });
  console.log("Successfully connected to Firebase!");
} catch (error) {
  console.error("Firebase initialization error:", error);
  process.exit(1);
}

const db = admin.firestore();
const bucket = admin.storage().bucket();

const allowedOrigins = [
  'https://5173-firebase-sam-solutionsgit-1774216538931.cluster-y3k7ko3fang56qzieg3trwgyfg.cloudworkstations.dev',
  'http://localhost:5173'
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (origin && allowedOrigins.includes(origin)) {
      callback(null, true);
    } else if (!origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' data:;");
  next();
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Handler for the root URL
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Server is running and ready to accept form submissions.',
    status: 'OK'
  });
});

const allowedFields = [
  'name', 'email', 'company', 'phone', 'service', 'budget',
  'message', 'timeline', 'source', 'comment', 'website'
];

app.post('/api/contact', async (req, res) => {
  try {
    const submission: { [key: string]: any } = {};
    for (const field of allowedFields) {
      if (req.body[field]) {
        submission[field] = req.body[field];
      }
    }

    if (!submission.name || !submission.email || (!submission.message && !submission.comment)) {
      return res.status(400).json({ message: 'Name, email, and a message/comment are required.' });
    }
    
    const collection = db.collection('form-submissions');
    const result = await collection.add(submission);
    res.status(201).json({ message: 'Form submitted successfully!', id: result.id });

  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({ message: 'An internal error occurred while submitting the form.' });
  }
});

const internshipRouter = express.Router();

internshipRouter.post('/applications', upload.single('resume'), async (req, res) => {
    try {
        const { body, file } = req;

        if (!file) {
            return res.status(400).send('Resume file is required.');
        }

        const blob = bucket.file(`resumes/${Date.now()}-${file.originalname}`);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });

        blobStream.on('error', (err) => res.status(500).send(err));

        blobStream.on('finish', async () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            const applicationData = { ...body, resumeUrl: publicUrl, status: 'pending' };

            await db.collection('internship-applications').add(applicationData);

            res.status(201).send({ message: 'Application submitted successfully', url: publicUrl });
        });

        blobStream.end(file.buffer);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/applications', async (req, res) => {
  try {
    const snapshot = await db.collection('internship-applications').get();
    const applications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
});

app.post('/api/applications/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status || !['approved', 'rejected', 'pending'].includes(status.toLowerCase())) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        await db.collection('internship-applications').doc(id).update({ status: status.toLowerCase() });

        res.status(200).json({ message: `Application ${id} status updated to ${status}` });
    } catch (error) {
        console.error('Error updating application status:', error);
        res.status(500).json({ message: 'Failed to update application status' });
    }
});


app.use('/api/internships', internshipRouter);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

db.collection('internship-applications').onSnapshot(snapshot => {
    const applications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(applications));
        }
    });
}, err => {
    console.error('Error listening to firestore changes:', err);
});

server.listen(port, () => {
  console.log(`Server with WebSocket is running on http://localhost:${port}`);
});
