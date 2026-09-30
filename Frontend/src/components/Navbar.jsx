import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    const goHome = () => {
        if (user?.role === "admin") {
            navigate("/admin");
        } else if (user?.role === "entrepreneur") {
            navigate("/entrepreneur-profile");
        } else {
            navigate("/dashboard");
        }
    };

    return (
        <div className="navbar">

            <h2
                onClick={goHome}
                style={{ cursor: "pointer" }}
            >
                Public Infrastructure System
            </h2>

            <div className="nav-buttons">

                {user?.role === "citizen" && (
                    <>
                        <button
                            onClick={() =>
                                navigate("/dashboard")
                            }
                        >
                            Dashboard
                        </button>

                        <button
                            onClick={() =>
                                navigate("/report-issue")
                            }
                        >
                            Report Issue
                        </button>

                        <button
                            onClick={() =>
                                navigate("/my-issues")
                            }
                        >
                            My Issues
                        </button>
                    </>
                )}

                {user?.role === "admin" && (
                    <button
                        onClick={() =>
                            navigate("/admin")
                        }
                    >
                        Admin Dashboard
                    </button>
                )}

                {user?.role === "entrepreneur" && (
                    <button
                        onClick={() =>
                            navigate(
                                "/entrepreneur-profile"
                            )
                        }
                    >
                        My Profile
                    </button>
                )}

                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>
        </div>
    );
}

export default Navbar;