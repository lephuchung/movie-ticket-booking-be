const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { blacklistedTokens } = require('../config/tokenBlacklist'); // Sử dụng danh sách token chung

// Đăng nhập
exports.login = async (req, res) => {
    const { identifier, password } = req.body;

    db.query('SELECT * FROM Users WHERE Email = ? OR Phone = ?', [identifier, identifier], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query error' });
        if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

        const user = results[0];

        if (user.Status !== 'active') return res.status(403).json({ error: 'User account is not active' });

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

        res.json({ accessToken, refreshToken });
    });
};

// Đăng xuất
exports.logout = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
        blacklistedTokens.push(token); // Thu hồi token
    }
    res.json({ message: 'Logged out successfully' });
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
