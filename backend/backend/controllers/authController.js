/**
 * @desc    Get current logged in user
 * @route   GET /api/auth/user
 * @access  Private
 */
exports.getCurrentUser = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
};

/**
 * @desc    Logout user
 * @route   GET /api/auth/logout
 * @access  Private
 */
exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return res.status(500).json({
                success: false,
                error: 'Error during logout'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Successfully logged out'
        });
    });
};