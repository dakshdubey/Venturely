import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret',
});

export const createPaymentLink = async (amount: number, email: string, name: string, description: string) => {
    try {
        const response = await razorpay.paymentLink.create({
            amount: amount * 100, // Razorpay expects amount in paise
            currency: 'INR',
            accept_partial: false,
            description: description,
            customer: {
                name: name,
                email: email,
            },
            notify: {
                sms: false,
                email: true,
            },
            reminder_enable: true,
            callback_url: `${process.env.FRONTEND_URL}/payment-success`,
            callback_method: 'get',
        });
        return response;
    } catch (error) {
        console.error('Error creating Razorpay payment link:', error);
        throw error;
    }
};

export default razorpay;
