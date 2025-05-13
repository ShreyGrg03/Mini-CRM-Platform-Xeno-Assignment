// /**
//  * Middleware to check if user is authenticated
//  */
// exports.ensureAuth = function (req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }

//     // If not authenticated, return 401 Unauthorized
//     res.status(401).json({
//         success: false,
//         error: 'Not authorized'
//     });
// };

// /**
//  * Middleware to redirect authenticated users away from login
//  */
// exports.ensureGuest = function (req, res, next) {
//     if (req.isAuthenticated()) {
//         return res.status(200).json({
//             success: true,
//             message: 'Already logged in',
//             user: req.user
//         });
//     }

//     next();
// };

/**
 * Middleware to simulate an authenticated user (bypass mode)
 */
exports.ensureAuth = function (req, res, next) {
    // Simulate a logged-in user
    req.user = {
        _id: 'dev123',
        name: 'Developer User',
        email: 'dev@example.com',
    };

    return next(); // Always allow
};

/**
 * Middleware to always allow guest (bypass mode)
 */
exports.ensureGuest = function (req, res, next) {
    return next(); // No check
};
