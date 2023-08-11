const {
    create,
    getUsers,
    getUserByUserId,
    updateUser,
    deleteUser,
    getUserByUserEmail,
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const createUser = (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    create(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error",
            });
        }
        return res.status(200).json({
            success: 1,
            data: results,
        });
    });
};

const getUserById = (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ Message: "something wrong happen" });
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Record Not found",
            });
        }
        return res.json({
            success: 1,
            data: results,
        });
    });
};

const getAllUsers = (req, res) => {
    getUsers((err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        return res.json({
            success: 1,
            data: results,
        });
    });
};

const updateUsers = (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        return res.json({
            success: 1,
            message: "updated successfully",
        });
    });
};

const deleteUsers = (req, res) => {
    const id = req.body.id;
    getUserByUserId(id, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ Message: "something wrong happen" });
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Record Not found",
            });
        }
        deleteUser(id, (err, results) => {
            if (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ Message: "something wrong happen" });
            }
            return res.json({
                success: 1,
                message: "Deleted Successfully",
            });
        });
    });
};

const login = (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "something wrong happen",
            });
        }
        if (!results) {
            res.json({
                success: 0,
                data: "Invalid email or password",
            });
        }
        const result = compareSync(body.password, results.password);
        if (result) {
            results.password = undefined;
            const jsontoken = sign(
                { result: results },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "1m",
                }
            );
            return res.json({
                success: 1,
                message: "login successfully",
                token: jsontoken,
            });
        } else {
            return res.json({
                success: 0,
                data: "Invalid email or password",
            });
        }
    });
};

module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    updateUsers,
    deleteUsers,
    login,
};
