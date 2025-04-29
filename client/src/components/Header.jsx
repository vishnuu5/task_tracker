import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/Authcontext';

const Header = () => {
    const { isAuthenticated, logout, user } = useContext(AuthContext);

    return (
        <header className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">Task Tracker</Link>
                <nav>
                    <ul className="flex space-x-4">
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
                                </li>
                                <li>
                                    <button
                                        onClick={logout}
                                        className="hover:text-blue-200"
                                    >
                                        Logout
                                    </button>
                                </li>
                                <li className="text-blue-200">
                                    Welcome, {user?.name}
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login" className="hover:text-blue-200">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register" className="hover:text-blue-200">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;