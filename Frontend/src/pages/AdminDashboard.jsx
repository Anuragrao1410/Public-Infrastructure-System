import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AdminDashboard() {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    const fetchIssues = async () => {
        setLoading(true);

        window.dispatchEvent(
            new Event("app-loading-start")
        );

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/issues`
            );

            setIssues(response.data);

        } catch (error) {
            console.log("ADMIN ISSUES ERROR:", error);

        } finally {
            setLoading(false);

            window.dispatchEvent(
                new Event("app-loading-stop")
            );
        }
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    const updateStatus = async (id, status) => {
        setUpdatingId(id);

        window.dispatchEvent(
            new Event("app-loading-start")
        );

        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/issues/${id}/status`,
                { status }
            );

            alert("Status updated successfully");

            await fetchIssues();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Status update failed"
            );

        } finally {
            setUpdatingId(null);

            window.dispatchEvent(
                new Event("app-loading-stop")
            );
        }
    };

    return (
        <>
            <Navbar />

            <div className="dashboard">

                <h1>Admin Dashboard</h1>

                <h2>Reported Issues</h2>

                {loading ? (
                    <p style={{
                        textAlign: "center",
                        marginTop: "30px",
                        color: "#555"
                    }}>
                        Loading reported issues...
                    </p>
                ) : issues.length === 0 ? (
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
                                disabled={updatingId === issue._id}
                            >
                                {updatingId === issue._id
                                    ? "Updating..."
                                    : "In Progress"}
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus(
                                        issue._id,
                                        "Resolved"
                                    )
                                }
                                disabled={updatingId === issue._id}
                            >
                                {updatingId === issue._id
                                    ? "Updating..."
                                    : "Resolved"}
                            </button>

                        </div>
                    ))
                )}

            </div>
        </>
    );
}

export default AdminDashboard;