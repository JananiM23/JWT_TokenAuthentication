const User = require('../models/userManagement');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret_key = '4xxXKNSH7hp3PKA0WtcU3TZDZNMcAnaD6FoXG39GLGM=';

exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(200).send({ message: "User registered successfuly "});

    } catch (err) {
        console.log(err);
        res.status(500).send({ err: 'Registration failed '});
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if(!user) {
            return res.status(401).send({ message: 'Authentication failed' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch) {
            return res.status(401).send({ message: 'Authentication failed' });
        }

        // here jwt involved when username and password authentication fine after pass with jwt token
        const token = jwt.sign({ userId: user._id }, secret_key, { expiresIn: '1h' });

        res.status(200).send({ message: 'user logged successfully', token });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Login failed'})
    }
}

// password change 
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, _id } = req.body;
        const user = await User.findById(_id);

        if (!user) {
            return res.status(401).send({ message: "User not found! Please enter valid user credentials." });
        }

        // Compare oldPassword with user's current hashed password
        const oldPasswordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!oldPasswordMatch) {
            return res.status(401).send({ message: "Incorrect old password. Please enter valid password." });
        }

        // Generate salt and hash newPassword
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Update user's password
        user.password = hashedNewPassword;
        await user.save();

        return res.status(200).send({ message: "User password updated successfully." });

    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Something went wrong." });
    }
}
