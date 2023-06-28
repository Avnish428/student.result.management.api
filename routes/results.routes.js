const router = require("express").Router();
const resultController = require("../controllers/results.controller");
const { asyncHandler } = require("../middlewares/asyncHandler");
const {
  validateRequestBody,
  validateBasicAuth,
} = require("../middlewares/validators");

router
  .route("/results")
  .get(
    asyncHandler(validateBasicAuth()),
    asyncHandler(resultController.getAllData)
  )
  .post(
    asyncHandler(validateBasicAuth()),
    asyncHandler(validateRequestBody(resultController.ResultJoiSchema.AddData)),
    asyncHandler(resultController.addData)
  );

router
  .route("/result/:id")
  .delete(
    asyncHandler(validateBasicAuth()),
    asyncHandler(resultController.deleteDataById)
  );

module.exports = router;
