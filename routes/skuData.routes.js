const router = require("express").Router();
const dataController = require("../controllers/skuData.controller");
const { asyncHandler } = require("../middlewares/asyncHandler");
const { validateBasicAuth } = require("../middlewares/validators");
const {
  validateUserAuthentication,
  restrictTo,
} = require("../middlewares/userAuth");

router
  .route("/data")
  .get(
    asyncHandler(validateBasicAuth()),
    asyncHandler(validateUserAuthentication),
    asyncHandler(dataController.getAllData)
  )
  .post(
    asyncHandler(validateBasicAuth()),
    asyncHandler(validateUserAuthentication),
    asyncHandler(restrictTo("admin", "super admin")),
    asyncHandler(dataController.addData)
  );

router
  .route("/data/:id")
  .get(
    asyncHandler(validateBasicAuth()),
    asyncHandler(validateUserAuthentication),
    asyncHandler(dataController.getDataById)
  )
  .patch(
    asyncHandler(validateBasicAuth()),
    asyncHandler(validateUserAuthentication),
    asyncHandler(restrictTo("admin", "super admin")),
    asyncHandler(dataController.updateData)
  )
  .delete(
    asyncHandler(validateBasicAuth()),
    asyncHandler(validateUserAuthentication),
    asyncHandler(restrictTo("admin", "super admin")),
    asyncHandler(dataController.deleteDataById)
  );

module.exports = router;
