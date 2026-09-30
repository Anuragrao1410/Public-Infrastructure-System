import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function CitizenDashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            <div className="dashboard">
                <h1>Citizen Dashboard</h1>

                <h2>Welcome, {user?.name}</h2>

                <p>
                    Report public infrastructure problems
                    and track your complaints.
                </p>

                <button onClick={() => navigate("/report-issue")}>
                    Report New Issue
                </button>

                <button onClick={() => navigate("/my-issues")}>
                    My Reported Issues
                </button>
            </div>
        </>
    );
}

export default CitizenDashboard;