const express = require("express")
const { askNewQuestion, getAllQuestions, getSingleQuestion, editQuestion, deleteQuestion, likeQuestion, undoLikeQuestion } = require("../controllers/question")
const { getAccessToRoute, getQuestionOwnerAccess } = require("../middlewares/authorization/auth")
const { checkQuestionExist } = require("../middlewares/database/databaseErrorHelpers")
const answer = require("./answer")

const router = express.Router()

router.post("/ask", getAccessToRoute, askNewQuestion)
router.get("/", getAllQuestions)
router.get("/:id", checkQuestionExist, getSingleQuestion)
router.put("/:id/edit", [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], editQuestion)
router.delete("/:id/delete", [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], deleteQuestion)
router.get("/:id/like", [getAccessToRoute, checkQuestionExist], likeQuestion)
router.get("/:id/undo-like", [getAccessToRoute, checkQuestionExist], undoLikeQuestion)
router.use("/:question_id/answers", checkQuestionExist, answer)

module.exports = router