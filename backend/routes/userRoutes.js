const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer();

// Define the register route with the post method and callback function
router.post('/register', upload.single('profile_image'), userController.register);

// Define other routes...
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, upload.single('profile_image'), userController.updateProfile);
router.delete('/profile', authMiddleware, userController.deleteAccount);

module.exports = router;
