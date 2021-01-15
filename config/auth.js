module.exports = {
    endureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_message', 'Please log in to view the resources');
        res.redirect('/');
    }
}