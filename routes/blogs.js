import express from "express";
import { addPost, getPostById, getPost } from "./../controllers/blogs.js";

const router = express.Router();

router.post("/add", addPost);
router.get("/get", getPost);
router.get("/find/:id", getPostById);

export default router;