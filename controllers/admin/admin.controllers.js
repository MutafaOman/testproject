const User = require('../../models/user');

exports.login = async (req, res) => {
    User.findOne({ username: req.body.username, role: "admin" }, async (err, user) => {
        if (err) {
            return res.status(401).json({
                'status': '401',
                'message': err
            })
        }
        if (!user) {
            return res.status(401).json({
                'status': '401',
                'message': 'User is not found'
            });
        }
        if (!user.validPassword(req.body.password)) {
            return res.status(401).json({
                'status': '401',
                'message': 'password is invalid.'
            });
        }
        if (user.status === 'unactive') {
            return res.status(401).json({
                'status': '401',
                'message': 'user is locked!'
            });
        }
        res.status(200).json({
            'status': '200',
            'data': user
        });
    });
};