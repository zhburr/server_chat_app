import { Router } from "express";
import { login, register } from "../controllers/userController";
import { validate } from "../middlewears/validate";
import {
  validateLoginUser,
  validateRegisterUser,
} from "../validations/validation";

const router: Router = Router();

router.post("/register", validate(validateRegisterUser), register);
router.post("/login", validate(validateLoginUser), login);

export default router;
