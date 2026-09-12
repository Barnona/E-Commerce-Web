const mongoose = require('mongoose');

const Connection = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        throw new Error('MONGO_URI is not configured');
    }

    try {
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        throw error;
    }
};

module.exports = Connection;
