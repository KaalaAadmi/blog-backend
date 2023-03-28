import Blog from "../models/Blog.js";
import { createError } from "./../error.js";

export const addPost = async (req, res, next) => {
  const newPost = new Blog(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const posts = await Blog.find();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const post = await Blog.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {}
};
