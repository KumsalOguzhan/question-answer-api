const path = require("path");
const root = path.dirname(require.main.filename);

const Answer = require(root +"/models/Answer");
const Question = require(root + "/models/Question");
const User = require(root + "/models/User");

const asyncErrorWrapper = require("express-async-handler")
const CustomError = require(root + "/helpers/error/customError");

const checkQuestionExist = asyncErrorWrapper(async (req, res, next) => {
    const question_id = req.params.id || req.params.question_id

    const question = await Question.findById(question_id)

    if (!question) {
        return next(new CustomError(`Question Not Found with Id : ${id}`, 404))
    }
    next()

})

const checkQuestionAndAnswerExist = asyncErrorWrapper(async (req, res, next) => {
    const { answer_id, question_id } = req.params;

    const answer = await Answer.findOne({ _id: answer_id, question: question_id });

    if (!answer) {
        return next(new CustomError(`Answer Not Found with Answer Id : ${answer_id} Associated With This Question`, 404));
    }
    next();
});

const checkUserExist = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params

    const user = await User.findById(id)

    if (!user) {
        return next(new CustomError(`User Not Found with Id : ${id}`, 404))
    }
    next()

})

module.exports = {
    checkQuestionAndAnswerExist,
    checkQuestionExist,
    checkUserExist
};