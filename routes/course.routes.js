const router = require("express").Router();
const courseController = require("../controllers/course.controller");
const { asyncHandler } = require("../middlewares/asyncHandler");
const {
  validateRequestBody,
  validateBasicAuth,
} = require("../middlewares/validators");


router
  .route("/course")
  .get(
    asyncHandler(validateBasicAuth()),
    asyncHandler(courseController.getAllData)
  )
  .post(
    asyncHandler(validateBasicAuth()),
    asyncHandler(validateRequestBody(courseController.CourseJoiSchema.AddData)),
    asyncHandler(courseController.addData)
  );

router
  .route("/course/:id")
  .get(
    asyncHandler(validateBasicAuth()),
    asyncHandler(courseController.getDataById)
  )
  .patch(
    asyncHandler(
      asyncHandler(validateBasicAuth()),
      validateRequestBody(courseController.CourseJoiSchema.UpdateData)
    ),
    asyncHandler(courseController.updateData)
  )
  .delete(
    asyncHandler(validateBasicAuth()),
    asyncHandler(courseController.deleteDataById)
  );

module.exports = router;
