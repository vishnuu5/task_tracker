// Project API service

// Get all projects
export const getProjects = async (token) => {
  const response = await fetch("https://task-tracker-api-qve0.onrender.com/api/projects", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return await response.json();
};

// Get project by ID
export const getProjectById = async (id, token) => {
  const response = await fetch(`https://task-tracker-api-qve0.onrender.com/api/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }

  return await response.json();
};

// Create project
export const createProject = async (projectData, token) => {
  const response = await fetch("https://task-tracker-api-qve0.onrender.com/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create project");
  }

  return await response.json();
};

// Update project
export const updateProject = async (id, projectData, token) => {
  const response = await fetch(`https://task-tracker-api-qve0.onrender.com/api/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    throw new Error("Failed to update project");
  }

  return await response.json();
};

// Delete project
export const deleteProject = async (id, token) => {
  const response = await fetch(`https://task-tracker-api-qve0.onrender.com/api/projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete project");
  }

  return await response.json();
};
