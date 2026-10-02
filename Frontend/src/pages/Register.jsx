import { useState } from "react";
import axios from "axios";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        setLoading(true);

        window.dispatchEvent(
            new Event("app-loading-start")
        );

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/users/register`,
                {
                    name,
                    email,
                    password,
                    role: "citizen"
                }
            );

            alert(response.data.message);

            setName("");
            setEmail("");
            setPassword("");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Registration failed"
            );

        } finally {
            setLoading(false);

            window.dispatchEvent(
                new Event("app-loading-stop")
            );
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">

                <h2>Public Infrastructure System</h2>

                <h3>Create Account</h3>

                <form onSubmit={handleRegister}>

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        disabled={loading}
                        required
                    />

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
                        {loading
                            ? "Creating Account..."
                            : "Register"}
                    </button>

                </form>

                {loading && (
                    <p style={{
                        textAlign: "center",
                        marginTop: "12px",
                        color: "#555"
                    }}>
                        Creating your account...
                    </p>
                )}

            </div>
        </div>
    );
}

export default Register;