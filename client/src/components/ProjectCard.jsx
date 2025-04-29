import { Link } from 'react-router-dom';
import { useState } from 'react';

const ProjectCard = ({ project, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            setIsDeleting(true);
            try {
                await onDelete(project._id);
            } catch (error) {
                console.error('Error deleting project:', error);
                setIsDeleting(false);
            }
        }
    };

    return (
        <div className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <div className="flex space-x-2">
                    <Link
                        to={`/projects/${project._id}`}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        View
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="text-red-600 hover:text-red-800"
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="text-sm text-gray-500">
                Created: {new Date(project.createdAt).toLocaleDateString()}
            </div>
        </div>
    );
};

export default ProjectCard;