const router = require("express").Router();
const courseController = require("../controllers/course.controller");
const { asyncHandler } = require("../middlewares/asyncHandler");
const {
    validateRequestBody,
} = require("../middlewares/validators");

router
    .route("/course")
    .get(
        asyncHandler(courseController.getAllData)
    )
    .post(
        asyncHandler(
            validateRequestBody(courseController.CourseJoiSchema.AddData)
        ),
        asyncHandler(courseController.addData)
    );

router
    .route("/course/:id")
    .get(

        asyncHandler(courseController.getDataById)
    )
    .patch(
        asyncHandler(
            validateRequestBody(
                courseController.CourseJoiSchema.UpdateData
            )
        ),
        asyncHandler(courseController.updateData)
    )
    .delete(
        asyncHandler(courseController.deleteDataById)
    );

module.exports = router;
