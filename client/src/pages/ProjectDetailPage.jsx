import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/Authcontext';
import TaskItem from '../components/TaskItem';
import { getProjectById } from '../services/projectService';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'To Do'
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        fetchProjectAndTasks();
    }, [id, token]);

    const fetchProjectAndTasks = async () => {
        try {
            setLoading(true);
            const projectData = await getProjectById(id, token);
            setProject(projectData);

            const tasksData = await getTasks(id, token);
            setTasks(tasksData);
        } catch (error) {
            toast.error('Failed to fetch project data');
            console.error('Error fetching project data:', error);
            navigate('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear field-specific error when user types
        if (formErrors[e.target.name]) {
            setFormErrors({ ...formErrors, [e.target.name]: '' });
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.title.trim()) {
            errors.title = 'Title is required';
        }

        if (!formData.description.trim()) {
            errors.description = 'Description is required';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            const newTask = await createTask(id, formData, token);
            setTasks([...tasks, newTask]);
            setFormData({ title: '', description: '', status: 'To Do' });
            setShowForm(false);
            toast.success('Task created successfully');
        } catch (error) {
            toast.error('Failed to create task');
            console.error('Error creating task:', error);
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            const updatedTask = await updateTask(id, taskId, { status: newStatus }, token);
            setTasks(tasks.map(task => task._id === taskId ? updatedTask : task));
            toast.success('Task status updated');
        } catch (error) {
            toast.error('Failed to update task status');
            console.error('Error updating task status:', error);
        }
    };

    const handleEditTask = async (taskId, updatedData) => {
        try {
            const updatedTask = await updateTask(id, taskId, updatedData, token);
            setTasks(tasks.map(task => task._id === taskId ? updatedTask : task));
            toast.success('Task updated successfully');
        } catch (error) {
            toast.error('Failed to update task');
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(id, taskId, token);
                setTasks(tasks.filter(task => task._id !== taskId));
                toast.success('Task deleted successfully');
            } catch (error) {
                toast.error('Failed to delete task');
                console.error('Error deleting task:', error);
            }
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                    <p className="mt-2">Loading project...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="mb-8">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-blue-600 hover:underline mb-4 flex items-center"
                >
                    ← Back to Dashboard
                </button>

                <div className="card">
                    <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="text-sm text-gray-500">
                        Created: {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Tasks</h2>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="btn btn-primary"
                    >
                        Add New Task
                    </button>
                )}
            </div>

            {showForm && (
                <div className="card mb-6">
                    <h3 className="text-lg font-semibold mb-4">Create New Task</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className={`form-input ${formErrors.title ? 'border-red-500' : ''}`}
                            />
                            {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className={`form-input ${formErrors.description ? 'border-red-500' : ''}`}
                                rows="3"
                            ></textarea>
                            {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="form-input"
                            >
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setFormData({ title: '', description: '', status: 'To Do' });
                                    setFormErrors({});
                                }}
                                className="btn btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Create Task
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {tasks.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">This project doesn't have any tasks yet.</p>
                    {!showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="btn btn-primary"
                        >
                            Create Your First Task
                        </button>
                    )}
                </div>
            ) : (
                <div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Task Summary</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-yellow-50 p-4 rounded-md">
                                <div className="font-medium text-yellow-800">To Do</div>
                                <div className="text-2xl font-bold">
                                    {tasks.filter(task => task.status === 'To Do').length}
                                </div>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-md">
                                <div className="font-medium text-blue-800">In Progress</div>
                                <div className="text-2xl font-bold">
                                    {tasks.filter(task => task.status === 'In Progress').length}
                                </div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-md">
                                <div className="font-medium text-green-800">Completed</div>
                                <div className="text-2xl font-bold">
                                    {tasks.filter(task => task.status === 'Completed').length}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">All Tasks</h3>
                        {tasks.map(task => (
                            <TaskItem
                                key={task._id}
                                task={task}
                                onStatusChange={handleStatusChange}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetailPage;