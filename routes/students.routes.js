const router = require("express").Router();
const studentController = require("../controllers/students.controller");
const { asyncHandler } = require("../middlewares/asyncHandler");
const {
    validateRequestBody,
} = require("../middlewares/validators");

router
    .route("/students")
    .get(
        asyncHandler(studentController.getAllData)
    )
    .post(
        asyncHandler(
            validateRequestBody(studentController.StudentJoiSchema.AddData)
        ),
        asyncHandler(studentController.addData)
    );

router
    .route("/student/:id")
    .get(

        asyncHandler(studentController.getDataById)
    )
    .patch(
        asyncHandler(
            validateRequestBody(
                studentController.StudentJoiSchema.UpdateData
            )
        ),
        asyncHandler(studentController.updateData)
    )
    .delete(
        asyncHandler(studentController.deleteDataById)
    );

module.exports = router;
