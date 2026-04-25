import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import authRoutes from './routes/authRoutes';
import serviceRoutes from './routes/serviceRoutes';
import projectRoutes from './routes/projectRoutes';
import quotationRoutes from './routes/quotationRoutes';
import { handleRazorpayWebhook } from './controllers/webhookController';
import path from 'path';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/quotations', quotationRoutes);
app.post('/api/webhooks/razorpay', handleRazorpayWebhook);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Venturely Server is running' });
});

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
