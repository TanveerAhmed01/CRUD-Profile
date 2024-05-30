const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

const register = async (req, res) => {
    try {
        const { firstName, lastName, gender, dateOfBirth, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { firstName, lastName, gender, dateOfBirth, email, password: hashedPassword, profileImageUrl: '' };
        await User.create(user);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, gender, dateOfBirth, email, profileImageUrl } = req.body;

        // Ensure all required fields are defined and not empty
        if (!firstName || !lastName || !gender || !dateOfBirth || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Log the request body for debugging
        console.log('Request Body:', req.body);

        // Remove undefined values from the updatedUser object
        const updatedUser = {
            firstName,
            lastName,
            gender,
            dateOfBirth,
            email,
            profileImageUrl: profileImageUrl || '', // Handle undefined profileImageUrl
        };

        // Call the User.update method with the updated user object
        await User.update(req.user.id, updatedUser);

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: error.message });
    }
};



const deleteAccount = async (req, res) => {
    try {
        await User.delete(req.user.id);
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const uploadProfileImage = async (req, res) => {
    try {
        const profileImageUrl = `/uploads/${req.file.filename}`;
        await User.update(req.user.id, { profileImageUrl });
        res.json({ message: 'Profile image uploaded successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const requestPasswordReset = async (req, res) => {
    console.log('Request Password Reset:', req.body); // Log request body for debugging
    try {
        const { email } = req.body;
        console.log('Requested email:', email); // Log email for debugging
        const user = await User.findByEmail(email);
        if (!user) {
            console.log('User not found:', email); // Log if user not found for debugging
            return res.status(400).json({ message: 'User not found' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expiration = new Date(Date.now() + 3600000); // 1 hour
        console.log('Generated token:', token); // Log generated token for debugging

        await User.savePasswordResetToken(user.id, token, expiration);


        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER, // Gmail email address
                pass: process.env.EMAIL_PASS, // Gmail password or app-specific password
            },
        });


        // Email options
        const recipientEmail = req.body.recipientEmail; // Modify this line according to your application's structure

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender email address
            to: recipientEmail, // Dynamic recipient email address
            subject: 'Test Email', // Email subject
            text: 'This is a test email sent using nodemailer and Gmail.', // Email text
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent successfully');
            }
        });

    } catch (error) {
        console.error('Error requesting password reset:', error); // Log any other errors
        res.status(500).json({ message: error.message });
    }
};


const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        console.log('Received token for password reset:', token); // Log received token for debugging
        const { newPassword } = req.body;
        console.log('New password:', newPassword); // Log new password for debugging

        const user = await User.findByPasswordResetToken(token);
        if (!user) {
            console.log('Invalid or expired token:', token); // Log if token is invalid or expired
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log('Hashed password:', hashedPassword); // Log hashed password for debugging

        await User.updatePassword(user.id, hashedPassword);

        console.log('Password reset successful'); // Log if password reset is successful
        res.json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error resetting password:', error); // Log any errors
        res.status(500).json({ message: error.message });
    }
};


module.exports = { register, login, getProfile, updateProfile, deleteAccount, uploadProfileImage, requestPasswordReset, resetPassword };
