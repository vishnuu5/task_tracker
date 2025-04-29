import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/Authcontext';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const { name, email, password, confirmPassword, country } = formData;

    const { register, isAuthenticated, error, clearError } = useContext(AuthContext);
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

        if (!name.trim()) {
            errors.name = 'Name is required';
        }

        if (!email) {
            errors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            errors.email = 'Email is invalid';
        }

        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        if (!country.trim()) {
            errors.country = 'Country is required';
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

        // Register user
        register({
            name,
            email,
            password,
            country
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto card">
                <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            className={`form-input ${formErrors.name ? 'border-red-500' : ''}`}
                        />
                        {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                    </div>

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

                    <div className="mb-4">
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

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            className={`form-input ${formErrors.confirmPassword ? 'border-red-500' : ''}`}
                        />
                        {formErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="country" className="form-label">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={country}
                            onChange={handleChange}
                            className={`form-input ${formErrors.country ? 'border-red-500' : ''}`}
                        />
                        {formErrors.country && <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary w-full mb-4">
                        Register
                    </button>
                </form>

                <p className="text-center text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;