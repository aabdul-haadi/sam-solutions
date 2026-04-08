import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import multer from 'multer';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/send-email', upload.single('attachment'), async (req, res) => {
    try {
        const { to, subject, body } = req.body;
        const attachment = req.file;

        const transporter = nodemailer.createTransport({
            host: 'mail.spacemail.com',
            port: 465,
            secure: true, 
            auth: {
                user: 'info@samcreative-solutions.com',
                pass: process.env.SMTP_PASSWORD 
            }
        });

        const mailOptions = {
            from: '"SAM CREATIVE SOLUTIONS" <info@samcreative-solutions.com>',
            to,
            subject,
            text: body, 
        };

        if (attachment) {
            mailOptions.attachments = [
                {
                    filename: attachment.originalname || 'Offer_Letter.pdf',
                    content: attachment.buffer
                }
            ];
        }

        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, messageId: info.messageId });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/admin-login', (req, res) => {
    const { password } = req.body;
    if (password === process.env.ADMIN_PASSWORD) {
        res.status(200).json({ success: true });
    } else {
        res.status(401).json({ success: false, error: 'Incorrect password' });
    }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
