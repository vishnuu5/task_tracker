import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/Authcontext';
import ProjectCard from '../components/ProjectCard';
import { getProjects, createProject, deleteProject } from '../services/projectService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const { token } = useContext(AuthContext);

    useEffect(() => {
        fetchProjects();
    }, [token]);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const data = await getProjects(token);
            setProjects(data);
        } catch (error) {
            toast.error('Failed to fetch projects');
            console.error('Error fetching projects:', error);
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

        if (!formData.name.trim()) {
            errors.name = 'Project name is required';
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
            const newProject = await createProject(formData, token);
            setProjects([...projects, newProject]);
            setFormData({ name: '', description: '' });
            setShowForm(false);
            toast.success('Project created successfully');
        } catch (error) {
            toast.error(error.message || 'Failed to create project');
            console.error('Error creating project:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProject(id, token);
            setProjects(projects.filter(project => project._id !== id));
            toast.success('Project deleted successfully');
        } catch (error) {
            toast.error('Failed to delete project');
            console.error('Error deleting project:', error);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                    <p className="mt-2">Loading projects...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Your Projects</h1>
                {projects.length < 4 && !showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="btn btn-primary"
                    >
                        Create New Project
                    </button>
                )}
            </div>

            {showForm && (
                <div className="card mb-6">
                    <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="form-label">Project Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`form-input ${formErrors.name ? 'border-red-500' : ''}`}
                            />
                            {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
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

                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setFormData({ name: '', description: '' });
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
                                Create Project
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {projects.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">You don't have any projects yet.</p>
                    {!showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="btn btn-primary"
                        >
                            Create Your First Project
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map(project => (
                        <ProjectCard
                            key={project._id}
                            project={project}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            {projects.length >= 4 && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-yellow-700">
                        You have reached the maximum limit of 4 projects. Please delete a project to create a new one.
                    </p>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;