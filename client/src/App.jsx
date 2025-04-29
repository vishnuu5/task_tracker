import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/Authcontext';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/projects/:id"
                element={
                  <PrivateRoute>
                    <ProjectDetailPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
            <div className="container mx-auto">
              &copy; {new Date().getFullYear()} Task Tracker App. All rights reserved.
            </div>
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;