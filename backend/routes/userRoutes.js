// const express = require('express');
// const multer = require('multer');
// const { register, login, getProfile, updateProfile, deleteAccount, uploadProfileImage } = require('../controllers/userController');
// const { validateRegistration } = require('../middleware/validateRequest');
// const authenticateToken = require('../middleware/auth');

// const router = express.Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     },
// });

// const upload = multer({ storage: storage });

// router.post('/register', validateRegistration, register);
// router.post('/login', login);
// router.get('/profile', authenticateToken, getProfile);
// router.put('/profile', authenticateToken, updateProfile);
// router.delete('/profile', authenticateToken, deleteAccount);
// router.post('/profile/image', authenticateToken, upload.single('profileImage'), uploadProfileImage);

// module.exports = router;

const express = require('express');
const multer = require('multer');
const { register, login, getProfile, updateProfile, deleteAccount, uploadProfileImage, requestPasswordReset, resetPassword } = require('../controllers/userController');
const { validateRegistration } = require('../middleware/validateRequest');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post('/register', validateRegistration, register);
router.post('/login', login);
router.post('/password-reset', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.delete('/profile', authenticateToken, deleteAccount);
router.post('/profile/image', authenticateToken, upload.single('profileImage'), uploadProfileImage);

module.exports = router;
