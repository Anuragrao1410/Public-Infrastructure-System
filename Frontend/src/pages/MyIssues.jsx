import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function MyIssues() {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/issues"
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
                console.log(error);
            }
        };

        fetchIssues();
    }, []);

    return (
        <>
            <Navbar />

            <div className="dashboard">
                <h1>My Reported Issues</h1>

                {issues.length === 0 ? (
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