import express from "express";
import { check } from "express-validator";
import {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router({ mergeParams: true });

// All routes are protected
router.use(protect);

// @route   GET /api/projects/:projectId/tasks
// @route   POST /api/projects/:projectId/tasks
router
  .route("/")
  .get(getTasks)
  .post(
    [
      check("title", "Title is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("status", "Status must be one of: To Do, In Progress, Completed")
        .optional()
        .isIn(["To Do", "In Progress", "Completed"]),
    ],
    createTask
  );

// @route   GET /api/projects/:projectId/tasks/:taskId
// @route   PUT /api/projects/:projectId/tasks/:taskId
// @route   DELETE /api/projects/:projectId/tasks/:taskId
router
  .route("/:taskId")
  .get(getTaskById)
  .put(
    [
      check("title", "Title is required").optional().not().isEmpty(),
      check("description", "Description is required")
        .optional()
        .not()
        .isEmpty(),
      check("status", "Status must be one of: To Do, In Progress, Completed")
        .optional()
        .isIn(["To Do", "In Progress", "Completed"]),
    ],
    updateTask
  )
  .delete(deleteTask);

export default router;
