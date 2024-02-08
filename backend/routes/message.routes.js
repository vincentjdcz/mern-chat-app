import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages); //get messages between the current user and the user with the id in the route param
router.post("/send/:id", protectRoute, sendMessage);

export default router;