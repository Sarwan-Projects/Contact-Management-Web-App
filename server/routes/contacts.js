const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');

// Validation rules for contact
const contactValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email'),
    body('phone')
        .trim()
        .notEmpty().withMessage('Phone number is required')
        .matches(/^[\d\s\-\+\(\)]{10,15}$/).withMessage('Please provide a valid phone number'),
    body('message')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Message cannot exceed 500 characters')
];

// @route   GET /api/contacts
// @desc    Get all contacts
// @access  Public
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching contacts'
        });
    }
});

// @route   POST /api/contacts
// @desc    Create a new contact
// @access  Public
router.post('/', contactValidation, async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }

    try {
        const { name, email, phone, message } = req.body;

        const contact = await Contact.create({
            name,
            email,
            phone,
            message: message || ''
        });

        res.status(201).json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error('Error creating contact:', error);
        
        // Handle mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while creating contact'
        });
    }
});

// @route   DELETE /api/contacts/:id
// @desc    Delete a contact
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        await contact.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting contact:', error);
        
        // Handle invalid ObjectId
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: 'Invalid contact ID'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while deleting contact'
        });
    }
});

module.exports = router;
