import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/users/login",
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
        }
    };

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
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

                <p style={{ textAlign: "center", marginTop: "20px" }}>
                    New citizen?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        style={{
                            color: "#2563eb",
                            cursor: "pointer",
                            fontWeight: "600"
                        }}
                    >
                        Create Account
                    </span>
                </p>

                <p style={{ textAlign: "center" }}>
                    Women Entrepreneur?{" "}
                    <span
                        onClick={() =>
                            navigate("/entrepreneur-register")
                        }
                        style={{
                            color: "#2563eb",
                            cursor: "pointer",
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