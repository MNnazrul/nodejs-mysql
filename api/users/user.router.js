const {
    createUser,
    getUserById,
    getAllUsers,
    updateUsers,
    deleteUsers,
    login,
} = require("./user.controller");
const router = require("express").Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.patch("/", updateUsers);
router.delete("/", deleteUsers);
router.post("/login", login);

module.exports = router;
