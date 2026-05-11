import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

app.post('/api/send-email', upload.single('attachment'), async(req, res) => {
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
            mailOptions.attachments = [{
                filename: attachment.originalname || 'Offer_Letter.pdf',
                content: attachment.buffer
            }];
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

app.post('/api/submit-form', async(req, res) => {
    try {
        const { name, email, company, phone, service, budget, message, timeline } = req.body;

        if (!name || !email || !message || !service) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: name, email, service, message'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email format'
            });
        }

        const payload = {
            name: String(name).trim(),
            email: String(email).trim().toLowerCase(),
            company: company ? String(company).trim() : null,
            phone: phone ? String(phone).trim() : null,
            service: String(service).trim(),
            budget: budget ? String(budget).trim() : null,
            message: String(message).trim(),
            timeline: timeline ? String(timeline).trim() : null,
        };

        const { data, error } = await supabase
            .from('contact_submissions')
            .insert([payload])
            .select('id, created_at')
            .single();

        if (error) {
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Submission saved successfully',
            submission: data
        });
    } catch (error) {
        console.error("Error submitting form:", error);
        res.status(500).json({ success: false, error: error.message || 'Internal server error' });
    }
});

app.post('/api/weekly-keepalive', async(req, res) => {
    try {
        const token = req.headers['x-keepalive-token'];
        if (!process.env.KEEPALIVE_TOKEN || token !== process.env.KEEPALIVE_TOKEN) {
            return res.status(401).json({ success: false, error: 'Unauthorized keepalive request' });
        }

        const { error } = await supabase
            .from('db_keepalive_logs')
            .insert([{
                source: 'server-cron',
                note: 'Weekly keepalive ping'
            }]);

        if (error) throw error;

        return res.status(200).json({ success: true, message: 'Keepalive logged' });
    } catch (error) {
        console.error('Keepalive error:', error);
        return res.status(500).json({ success: false, error: error.message || 'Keepalive failed' });
    }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));