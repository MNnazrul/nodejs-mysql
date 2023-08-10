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
        (error, resluts, fields) => {
            if (error) callBack(error);
            return callBack(null, results);
        }
    );
};

const getUserByUserId = (id, callBack) => {
    pool.query(
        `select fistName, lastName, gender, email, number from registration where id = ?`,
        [id],
        (error, results, fields) => {
            if (error) callBack(error);
            return callBack(null, results[0]);
        }
    );
};

module.exports = { create, getUsers };
