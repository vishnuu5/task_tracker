import { useState } from 'react';

const TaskItem = ({ task, onStatusChange, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({
        title: task.title,
        description: task.description,
        status: task.status
    });

    const statusColors = {
        'To Do': 'bg-yellow-100 text-yellow-800',
        'In Progress': 'bg-blue-100 text-blue-800',
        'Completed': 'bg-green-100 text-green-800'
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit(task._id, editedTask);
        setIsEditing(false);
    };

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        onStatusChange(task._id, newStatus);
    };

    return (
        <div className="card mb-4">
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={editedTask.title}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={editedTask.description}
                            onChange={handleChange}
                            className="form-input"
                            rows="3"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={editedTask.status}
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
                            onClick={() => setIsEditing(false)}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Save
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                            {task.status}
                        </span>
                    </div>
                    <p className="text-gray-600 mb-4">{task.description}</p>
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            Created: {new Date(task.createdAt).toLocaleDateString()}
                            {task.completedAt && (
                                <span className="ml-4">
                                    Completed: {new Date(task.completedAt).toLocaleDateString()}
                                </span>
                            )}
                        </div>
                        <div className="flex space-x-2">
                            <select
                                value={task.status}
                                onChange={handleStatusChange}
                                className="text-sm border border-gray-300 rounded-md p-1"
                            >
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(task._id)}
                                className="text-red-600 hover:text-red-800 text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskItem;