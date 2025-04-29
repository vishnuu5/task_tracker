import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/Authcontext';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const { email, password } = formData;

    const { login, isAuthenticated, error, clearError } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // If already authenticated, redirect to dashboard
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear field-specific error when user types
        if (formErrors[e.target.name]) {
            setFormErrors({ ...formErrors, [e.target.name]: '' });
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!email) {
            errors.email = 'Email is required';
        }

        if (!password) {
            errors.password = 'Password is required';
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        clearError();

        // Validate form
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        // Login user
        login(email, password);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto card">
                <h1 className="text-2xl font-bold text-center mb-6">Login to Your Account</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className={`form-input ${formErrors.email ? 'border-red-500' : ''}`}
                        />
                        {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className={`form-input ${formErrors.password ? 'border-red-500' : ''}`}
                        />
                        {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary w-full mb-4">
                        Login
                    </button>
                </form>

                <p className="text-center text-gray-600">
                    Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;