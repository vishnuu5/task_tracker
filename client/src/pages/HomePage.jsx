import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/Authcontext';

const HomePage = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Track Your Projects with Ease
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        A simple and intuitive task tracker to help you manage your projects and stay organized.
                    </p>
                    {isAuthenticated ? (
                        <Link
                            to="/dashboard"
                            className="btn btn-primary text-lg px-8 py-3"
                        >
                            Go to Dashboard
                        </Link>
                    ) : (
                        <div className="space-x-4">
                            <Link
                                to="/login"
                                className="btn btn-primary text-lg px-8 py-3"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="btn btn-secondary text-lg px-8 py-3"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                <div className="mt-20 grid md:grid-cols-3 gap-8">
                    <div className="card text-center">
                        <div className="text-blue-600 text-4xl mb-4">
                            <i className="fas fa-tasks"></i>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Track Tasks</h3>
                        <p className="text-gray-600">
                            Create and manage tasks for your projects. Keep track of progress and deadlines.
                        </p>
                    </div>

                    <div className="card text-center">
                        <div className="text-blue-600 text-4xl mb-4">
                            <i className="fas fa-project-diagram"></i>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Manage Projects</h3>
                        <p className="text-gray-600">
                            Organize your work into projects. Create up to 4 projects to categorize your tasks.
                        </p>
                    </div>

                    <div className="card text-center">
                        <div className="text-blue-600 text-4xl mb-4">
                            <i className="fas fa-chart-line"></i>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                        <p className="text-gray-600">
                            Monitor the status of your tasks and projects. See what's done and what's pending.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;