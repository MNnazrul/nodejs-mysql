const {
    create,
    getUsers,
    getUserByUserId,
    updateUser,
    deleteUser,
} = require("./user.service");
const { genSaltSync, hashSync } = require("bcrypt");

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

module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    updateUsers,
    deleteUsers,
};
