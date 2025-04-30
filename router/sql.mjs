import express from "express";
import * as sqlController from "../controller/sql.mjs";
import { body } from "express-validator";
import { validate } from "../middleware/validator.mjs";
import { isAuth } from "../middleware/auth.mjs";

const router = express.Router();

const validateTodo = [
  body("task_list")
    .trim()
    .isLength({ min: 2 })
    .withMessage("최소 2자 이상 입력"),
  validate,
];

router.get("/auth", isAuth, sqlController.getAuth);

router.get("/", isAuth, sqlController.getTodo);
router.get("/:id", isAuth, sqlController.getTodoId);
router.post("/", validateTodo, isAuth, sqlController.createTodo);
router.put("/:id", validateTodo, isAuth, sqlController.updateTodo);
router.delete("/:id", isAuth, sqlController.deleteTodo);

export default router;
