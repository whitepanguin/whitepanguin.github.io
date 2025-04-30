import express from "express";
import * as sqlController from "../controller/sql.mjs";

const router = express.Router();

router.get("/", sqlController.getData);

export default router;
