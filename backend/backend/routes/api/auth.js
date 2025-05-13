const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../../middleware/auth');
const { getCurrentUser, logout } = require('../../controllers/authController');

// @route   GET /api/auth/google
// @desc    Auth with Google
// @access  Public
router.get('/google', ensureGuest, passport.authenticate('google', { scope: ['profile', 'email'] }));

// @route   GET /api/auth/google/callback
// @desc    Google auth callback
// @access  Public
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard');
    }
);

// @route   GET /api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', ensureAuth, getCurrentUser);

// @route   GET /api/auth/logout
// @desc    Logout user
// @access  Private
router.get('/logout', ensureAuth, logout);

module.exports = router;