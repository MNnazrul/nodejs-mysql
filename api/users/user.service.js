const pool = require("../../config/database");

const create = (data, callback) => {
    pool.query(
        `insert into registration (firstName, lastName, gender, email, password, number)
            values(?,?,?,?,?,?)`,
        [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number,
        ],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

const getUsers = (callBack) => {
    pool.query(
        `select id,firstName,lastName,gender,email,number from registration`,
        [],
        (error, results, fields) => {
            if (error) callBack(error);
            return callBack(null, results);
        }
    );
};

const getUserByUserId = (id, callBack) => {
    pool.query(
        `select firstName, lastName, gender, email, number from registration where id = ?`,
        [id],
        (error, results, fields) => {
            if (error) callBack(error);
            return callBack(null, results[0]);
        }
    );
};

const updateUser = (data, callBack) => {
    pool.query(
        `update regisration set firstName=?, lastName=?, gender=?, email=?, password=? where id = ?`,
        [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.id,
        ],
        (error, results, fields) => {
            if (error) return callBack(error);
            return callBack(null, results[0]);
        }
    );
};

const deleteUser = (data, callBack) => {
    pool.query(
        `delete from registration where id = ?`,
        [data.id],
        (error, results, fields) => {
            if (error) callBack(error);
            return callBack(null, resluts[0]);
        }
    );
};

module.exports = {
    create,
    getUsers,
    getUserByUserId,
    updateUser,
    deleteUser,
};
