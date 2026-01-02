const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please provide a valid email address'
        ]
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [
            /^[\d\s\-\+\(\)]{10,15}$/,
            'Please provide a valid phone number'
        ]
    },
    message: {
        type: String,
        trim: true,
        maxlength: [500, 'Message cannot exceed 500 characters'],
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', ContactSchema);
