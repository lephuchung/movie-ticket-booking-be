const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { blacklistedTokens } = require('../config/tokenBlackList');


// Đăng kí
exports.signup = async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }
        if (password.length < 8) {
            return res.status(400).json({ error: 'Mật khẩu phải có ít nhất 8 ký tự' });
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await User.create({ name, email, phoneNumber, password: hashedPassword });

        const token = jwt.sign(
            { userId: user.user_id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 }
        );

        res.status(200).json({
            success: true,
            message: 'Registration successful',
            token,
            user: {
                id: user.user_id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error during sign-up:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            const field = error.errors[0].path.charAt(0).toUpperCase() + error.errors[0].path.slice(1);
            const message = `${field} này đã được sử dụng`;
            return res.status(400).json({ error: message });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
}
// Đăng nhập
exports.signin = async (req, res) => {
    const { email, password } = req.body;
    console.log("server check req.body: ", req.body);

    db.query('SELECT * FROM Users WHERE Email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query error' });
        if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

        const user = results[0];

        if (user.Status !== 'active') return res.status(403).json({ error: 'User account is not active' });
        console.log("server check req.body: ", req.body);

        const validPassword = await bcrypt.compare(password, user.Password);
        if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

        const accessToken = jwt.sign(
            { userId: user.UserId, role: user.Role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );
        const refreshToken = jwt.sign(
            { userId: user.UserId },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_REFRESH_EXPIRATION }
        );
        const userEmail = user.Email
        res.json({ accessToken, refreshToken, userEmail });
    });
};

// Đăng xuất
exports.signout = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(400).json({ error: 'Token is required for logout' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
        blacklistedTokens.push(token);
        res.status(200).json({ message: 'Logged out successfully' });
    });
};

// Làm mới AccessToken
exports.refreshAccessToken = (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token is required' });
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired refresh token' });

        const accessToken = jwt.sign(
            { userId: decoded.userId, role: decoded.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        res.json({ accessToken });
    });
};