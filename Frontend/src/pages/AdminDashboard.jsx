import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AdminDashboard() {
    const [issues, setIssues] = useState([]);

    const fetchIssues = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/issues"
            );

            setIssues(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await axios.put(
                `http://localhost:5000/api/issues/${id}/status`,
                { status }
            );

            alert("Status updated successfully");

            fetchIssues();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Status update failed"
            );
        }
    };

    return (
        <>
            <Navbar />

            <div className="dashboard">

                <h1>Admin Dashboard</h1>

                <h2>Reported Issues</h2>

                {issues.length === 0 ? (
                    <p>No issues reported.</p>
                ) : (
                    issues.map((issue) => (
                        <div
                            key={issue._id}
                            className="issue-card"
                        >
                            <h3>{issue.title}</h3>

                            <p>
                                <strong>Category:</strong>{" "}
                                {issue.category}
                            </p>

                            <p>
                                <strong>Description:</strong>{" "}
                                {issue.description}
                            </p>

                            <p>
                                <strong>Reported By:</strong>{" "}
                                {issue.reportedBy?.name}
                            </p>

                            <p>
                                <strong>Status:</strong>{" "}
                                {issue.status}
                            </p>

                            <button
                                onClick={() =>
                                    updateStatus(
                                        issue._id,
                                        "In Progress"
                                    )
                                }
                            >
                                In Progress
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus(
                                        issue._id,
                                        "Resolved"
                                    )
                                }
                            >
                                Resolved
                            </button>
                        </div>
                    ))
                )}

            </div>
        </>
    );
}

export default AdminDashboard;