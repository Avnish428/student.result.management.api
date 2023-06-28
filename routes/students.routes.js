const router = require("express").Router();
const studentController = require("../controllers/students.controller");
const { asyncHandler } = require("../middlewares/asyncHandler");
const {
  validateRequestBody,
  validateBasicAuth,
} = require("../middlewares/validators");

router
  .route("/students")
  .get(
    asyncHandler(validateBasicAuth()),
    asyncHandler(studentController.getAllData)
  )
  .post(
    asyncHandler(
      asyncHandler(validateBasicAuth()),
      validateRequestBody(studentController.StudentJoiSchema.AddData)
    ),
    asyncHandler(studentController.addData)
  );

router
  .route("/student/:id")
  .delete(
    asyncHandler(validateBasicAuth()),
    asyncHandler(studentController.deleteDataById)
  );

module.exports = router;
