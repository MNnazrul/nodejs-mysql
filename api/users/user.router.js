const {
    createUser,
    getUserById,
    getAllUsers,
    updateUsers,
    deleteUsers,
} = require("./user.controller");
const router = require("express").Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.patch("/", updateUsers);
router.delete("/", deleteUsers);

module.exports = router;
