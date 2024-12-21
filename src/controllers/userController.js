const UserModel = require('../models/userModel');

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.getAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users', details: err });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.getById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user', details: err });
    }
};

const createUser = async (req, res) => {
    const { UserId, Name, Password, Email, Phone, Role, CreateAt, Status } = req.body;
    try {
        const result = await UserModel.create({ UserId, Name, Password, Email, Phone, Role, CreateAt, Status });
        res.status(201).json({ message: 'User created successfully', user: result });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user', details: err });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { Name, Password, Email, Phone, Role, CreateAt, Status } = req.body;
    try {
        const result = await UserModel.update(id, { Name, Password, Email, Phone, Role, CreateAt, Status });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user', details: err });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await UserModel.delete(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user', details: err });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
