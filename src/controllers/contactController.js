import ContactMessage from '../models/ContactMessage.js';

export const submitContactForm = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const messageCount = await ContactMessage.countDocuments({
            email,
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        });

        if (messageCount >= 2) {
            return res.status(429).json({
                error: 'You can only send up to 2 messages per day.'
            });
        }

        await ContactMessage.create({ name, email, message });
        return res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Submit contact form error:', error);
        return res.status(500).json({ error: 'Something went wrong.' });
    }
};
