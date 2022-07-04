const express = require("express")
const User = require("../models/User")
const { getAccessToRoute, getAdminAccess } = require("../middlewares/authorization/auth")
const { blockUser, deleteUser } = require("../controllers/admin")
const { checkUserExist } = require("../middlewares/database/databaseErrorHelpers")

const router = express.Router()

router.use([getAccessToRoute, getAdminAccess])

router.get("/block/:id", checkUserExist, blockUser)
router.delete("/delete-user/:id", checkUserExist, deleteUser)

module.exports = router