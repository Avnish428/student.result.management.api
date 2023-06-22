const router = require("express").Router();
const resultController = require("../controllers/results.controller");
const { asyncHandler } = require("../middlewares/asyncHandler");
const {
    validateRequestBody,
} = require("../middlewares/validators");

router
    .route("/results")
    .get(
        asyncHandler(resultController.getAllData)
    )
    .post(
        asyncHandler(
            validateRequestBody(resultController.ResultJoiSchema.AddData)
        ),
        asyncHandler(resultController.addData)
    );

router
    .route("/result/:id")
    .get(

        asyncHandler(resultController.getDataById)
    )
    .patch(
        asyncHandler(
            validateRequestBody(
                resultController.ResultJoiSchema.UpdateData
            )
        ),
        asyncHandler(resultController.updateData)
    )
    .delete(
        asyncHandler(resultController.deleteDataById)
    );

module.exports = router;
