import { Router } from "express";
import {
  login,
  refreshToken,
  register,
  setUserAvatar,
} from "../controllers/userController";
import { verifyToken } from "../middlewears/token";
import { validate } from "../middlewears/validate";
import {
  validateLoginUser,
  validateRefreshToken,
  validateRegisterUser,
  validateSetUserAvatar,
} from "../validations/validation";

const router: Router = Router();

router.post("/register", validate(validateRegisterUser), register);
router.post("/login", validate(validateLoginUser), login);
router.post("/refreshToken", validate(validateRefreshToken), refreshToken);
router.post(
  "/setUserAvatar",
  verifyToken,
  validate(validateSetUserAvatar),
  setUserAvatar
);

export default router;
