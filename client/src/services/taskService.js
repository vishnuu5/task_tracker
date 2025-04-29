// Task API service

// Get all tasks for a project
export const getTasks = async (projectId, token) => {
  const response = await fetch(`https://task-tracker-api-qve0.onrender.com/api/projects/${projectId}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return await response.json();
};

// Get task by ID
export const getTaskById = async (projectId, taskId, token) => {
  const response = await fetch(`https://task-tracker-api-qve0.onrender.com/api/projects/${projectId}/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch task");
  }

  return await response.json();
};

// Create task
export const createTask = async (projectId, taskData, token) => {
  const response = await fetch(`https://task-tracker-api-qve0.onrender.com/api/projects/${projectId}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create task");
  }

  return await response.json();
};

// Update task
export const updateTask = async (projectId, taskId, taskData, token) => {
  const response = await fetch(`https://task-tracker-api-qve0.onrender.com/api/projects/${projectId}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return await response.json();
};

// Delete task
export const deleteTask = async (projectId, taskId, token) => {
  const response = await fetch(`https://task-tracker-api-qve0.onrender.com/api/projects/${projectId}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return await response.json();
};
