### Task Tracker Application

I'll create a full-stack Task Tracker application with Express.js, Node.js, MongoDB for the backend, and Vite React.js for the frontend. Let's build this step by step.

## Demo

Click => [click]()

## Installation and Setup

Let's start by setting up the project:

## Running the Application

To run the application, follow these steps:

1. Clone the repository
   git clone

```bash
 https://github.com/vishnuu5/task_tracker.git
cd task-tracker
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

1. Create a `.env` file in the server directory with the following variables:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Run the application for frontend & Backend

```bash
npm run dev
```

## Features Implemented

1. **User Authentication**

1. Register with name, email, password, and country
1. Login with email and password
1. JWT-based authentication
1. Protected routes

1. **Project Management**

1. Create up to 4 projects per user
1. View all projects
1. View project details
1. Delete projects

1. **Task Management**

1. Create tasks within projects
1. Update task details
1. Change task status (To Do, In Progress, Completed)
1. Delete tasks
1. Track task creation and completion dates

1. **UI/UX**

1. Responsive design with Tailwind CSS
1. Form validation
1. Loading states
1. Toast notifications for feedback
1. Dashboard with project summary
1. Task status visualization
