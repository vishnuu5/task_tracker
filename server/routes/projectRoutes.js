import express from "express";
import { check } from "express-validator";
import {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All routes are protected
router.use(protect);

// @route   GET /api/projects
// @route   POST /api/projects
router
  .route("/")
  .get(getProjects)
  .post(
    [
      check("name", "Name is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
    ],
    createProject
  );

// @route   GET /api/projects/:id
// @route   PUT /api/projects/:id
// @route   DELETE /api/projects/:id
router
  .route("/:id")
  .get(getProjectById)
  .put(
    [
      check("name", "Name is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
    ],
    updateProject
  )
  .delete(deleteProject);

export default router;
