const router = require("express").Router();
const usersController = require("../controllers/users.controller");
// const authController = require("../controllers/authController");
const { asyncHandler } = require("../middlewares/asyncHandler");
const { validateBasicAuth } = require("../middlewares/validators");
const {
  validateUserAuthentication,
  restrictTo,
} = require("../middlewares/userAuth");

router
  .route("/users")
  .get(
    asyncHandler(validateBasicAuth()),
    asyncHandler(validateUserAuthentication),
    asyncHandler(restrictTo("admin", "super admin")),
    asyncHandler(usersController.getAllUsers)
  );

// router.route("/updateme").patch(usersController.updateMe);
// router.route("/deleteme").delete(usersController.deleteMe);

router
  .route("/users/:id")
  .get(
    asyncHandler(validateBasicAuth()),
    asyncHandler(validateUserAuthentication),
    asyncHandler(restrictTo("admin", "super admin", "user")),
    asyncHandler(usersController.getUserById)
  )
  .patch(
    asyncHandler(validateBasicAuth()),
    asyncHandler(validateUserAuthentication),
    asyncHandler(restrictTo("admin", "super admin", "user")),
    asyncHandler(usersController.updateUser)
  )
  .delete(
    asyncHandler(validateBasicAuth()),
    asyncHandler(validateUserAuthentication),
    asyncHandler(restrictTo("admin", "super admin", "user")),
    asyncHandler(usersController.deleteUserById)
  );

module.exports = router;
