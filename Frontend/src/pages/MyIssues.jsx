import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function MyIssues() {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIssues = async () => {
            setLoading(true);

            window.dispatchEvent(
                new Event("app-loading-start")
            );

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/issues`
                );

                const user = JSON.parse(
                    localStorage.getItem("user")
                );

                const myIssues = response.data.filter(
                    (issue) =>
                        issue.reportedBy?._id === user?.id
                );

                setIssues(myIssues);

            } catch (error) {
                console.log("MY ISSUES ERROR:", error);

            } finally {
                setLoading(false);

                window.dispatchEvent(
                    new Event("app-loading-stop")
                );
            }
        };

        fetchIssues();
    }, []);

    return (
        <>
            <Navbar />

            <div className="dashboard">

                <h1>My Reported Issues</h1>

                {loading ? (
                    <p style={{
                        textAlign: "center",
                        marginTop: "30px",
                        color: "#555"
                    }}>
                        Loading your reported issues...
                    </p>
                ) : issues.length === 0 ? (
                    <p>No issues reported yet.</p>
                ) : (
                    issues.map((issue) => (
                        <div key={issue._id}>

                            <h3>{issue.title}</h3>

                            <p>
                                Category: {issue.category}
                            </p>

                            <p>
                                Status: {issue.status}
                            </p>

                            <p>
                                {issue.description}
                            </p>

                            <hr />

                        </div>
                    ))
                )}

            </div>
        </>
    );
}

export default MyIssues;