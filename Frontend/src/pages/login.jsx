import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);

        window.dispatchEvent(
        new Event("app-loading-start")
     );

    try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/users/login`,
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert("Login successful!");

            const role = response.data.user.role;

            if (role === "admin") {
                navigate("/admin");
            } else if (role === "entrepreneur") {
                navigate("/entrepreneur-profile");
            } else {
                navigate("/dashboard");
            }

        } catch (error) {
            console.log("LOGIN ERROR:", error);
            console.log("RESPONSE:", error.response);

            alert(
                error.response?.data?.message ||
                error.message ||
                "Login failed"
            );

         } finally {
    setLoading(false);

    window.dispatchEvent(
        new Event("app-loading-stop")
    );
}
    }
    
    return (
        <div className="auth-container">
            <div className="auth-box">

                <h2>Public Infrastructure System</h2>

                <h3>Login</h3>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        disabled={loading}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        disabled={loading}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                {loading && (
                    <p style={{
                        textAlign: "center",
                        marginTop: "12px",
                        color: "#555"
                    }}>
                        Connecting to server...
                    </p>
                )}

                <p style={{
                    textAlign: "center",
                    marginTop: "20px"
                }}>
                    New citizen?{" "}

                    <span
                        onClick={() => !loading && navigate("/register")}
                        style={{
                            color: "#2563eb",
                            cursor: loading ? "default" : "pointer",
                            fontWeight: "600"
                        }}
                    >
                        Create Account
                    </span>
                </p>

                <p style={{
                    textAlign: "center"
                }}>
                    Women Entrepreneur?{" "}

                    <span
                        onClick={() =>
                            !loading &&
                            navigate("/entrepreneur-register")
                        }
                        style={{
                            color: "#2563eb",
                            cursor: loading ? "default" : "pointer",
                            fontWeight: "600"
                        }}
                    >
                        Register Business
                    </span>
                </p>

            </div>
        </div>
    );
}

export default Login;