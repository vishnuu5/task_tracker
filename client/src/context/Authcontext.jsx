import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Changed to use named import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Load user from token
    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    // Check if token is expired
                    const decoded = jwtDecode(token); // Using the named import
                    const currentTime = Date.now() / 1000;

                    if (decoded.exp < currentTime) {
                        // Token expired
                        logout();
                        return;
                    }

                    // Set auth token header
                    const response = await fetch('/api/auth/profile', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Failed to load user');
                    }

                    const userData = await response.json();
                    setUser(userData);
                    setIsAuthenticated(true);
                } catch (err) {
                    console.error('Error loading user:', err);
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                    setIsAuthenticated(false);
                    setError('Authentication error. Please login again.');
                }
            }
            setLoading(false);
        };

        loadUser();
    }, [token]);

    // Register user
    const register = async (userData) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Save token to local storage
            localStorage.setItem('token', data.token);
            setToken(data.token);
            setUser(data);
            setIsAuthenticated(true);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Login user
    const login = async (email, password) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Save token to local storage
            localStorage.setItem('token', data.token);
            setToken(data.token);
            setUser(data);
            setIsAuthenticated(true);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Logout user
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login');
    };

    // Clear error
    const clearError = () => {
        setError(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                loading,
                error,
                register,
                login,
                logout,
                clearError
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;