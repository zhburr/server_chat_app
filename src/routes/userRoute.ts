import { Router } from "express";
import { register } from "../controllers/userController";
import { validate } from "../middlewears/validate";
import { validateRegisterUser } from "../validations/validation";

const router: Router = Router();

router.post("/register", validate(validateRegisterUser), register);

export default router;
