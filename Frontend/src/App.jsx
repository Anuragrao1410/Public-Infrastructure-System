import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/Register";
import CitizenDashboard from "./pages/CitizenDashboard";
import ReportIssue from "./pages/ReportIssue";
import MyIssues from "./pages/MyIssues";
import AdminDashboard from "./pages/AdminDashboard";
import EntrepreneurRegister from "./pages/EntrepreneurRegister";
import EntrepreneurProfile from "./pages/EntrepreneurProfile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/entrepreneur-register"
                    element={<EntrepreneurRegister />}
                />

                {/* Citizen Routes */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute allowedRole="citizen">
                            <CitizenDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/report-issue"
                    element={
                        <ProtectedRoute allowedRole="citizen">
                            <ReportIssue />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-issues"
                    element={
                        <ProtectedRoute allowedRole="citizen">
                            <MyIssues />
                        </ProtectedRoute>
                    }
                />

                {/* Admin Route */}

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Entrepreneur Route */}

                <Route
                    path="/entrepreneur-profile"
                    element={
                        <ProtectedRoute allowedRole="entrepreneur">
                            <EntrepreneurProfile />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;