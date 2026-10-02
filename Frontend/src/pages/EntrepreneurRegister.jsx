import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EntrepreneurRegister() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [businessCategory, setBusinessCategory] = useState("");
    const [businessDescription, setBusinessDescription] = useState("");
    const [businessLocation, setBusinessLocation] = useState("");
    const [yearsInBusiness, setYearsInBusiness] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        window.dispatchEvent(
            new Event("app-loading-start")
        );

        try {
            // Create entrepreneur user account
            const userResponse = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/users/register`,
                {
                    name,
                    email,
                    password,
                    role: "entrepreneur"
                }
            );

            alert(userResponse.data.message);

            // Login automatically to get user ID
            const loginResponse = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/users/login`,
                {
                    email,
                    password
                }
            );

            const user = loginResponse.data.user;

            localStorage.setItem(
                "token",
                loginResponse.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            // Create business profile
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/entrepreneurs`,
                {
                    userId: user.id,
                    name,
                    email,
                    phone,
                    businessName,
                    businessCategory,
                    businessDescription,
                    businessLocation,
                    yearsInBusiness
                }
            );

            alert("Entrepreneur profile created successfully!");

            navigate("/entrepreneur-profile");

        } catch (error) {
            console.log("ENTREPRENEUR REGISTER ERROR:", error);
            console.log("RESPONSE:", error.response);

            alert(
                error.response?.data?.message ||
                error.message ||
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
                <h2>Women Entrepreneur Registration</h2>

                <form onSubmit={handleSubmit}>

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

                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) =>
                            setPhone(e.target.value)
                        }
                        disabled={loading}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Business Name"
                        value={businessName}
                        onChange={(e) =>
                            setBusinessName(e.target.value)
                        }
                        disabled={loading}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Business Category"
                        value={businessCategory}
                        onChange={(e) =>
                            setBusinessCategory(e.target.value)
                        }
                        disabled={loading}
                        required
                    />

                    <textarea
                        placeholder="Business Description"
                        value={businessDescription}
                        onChange={(e) =>
                            setBusinessDescription(
                                e.target.value
                            )
                        }
                        disabled={loading}
                    />

                    <input
                        type="text"
                        placeholder="Business Location"
                        value={businessLocation}
                        onChange={(e) =>
                            setBusinessLocation(
                                e.target.value
                            )
                        }
                        disabled={loading}
                        required
                    />

                    <input
                        type="number"
                        placeholder="Years in Business"
                        value={yearsInBusiness}
                        onChange={(e) =>
                            setYearsInBusiness(
                                e.target.value
                            )
                        }
                        disabled={loading}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Business Profile..."
                            : "Register Business"}
                    </button>
                </form>

                {loading && (
                    <p
                        style={{
                            textAlign: "center",
                            marginTop: "12px",
                            color: "#555"
                        }}
                    >
                        Creating your entrepreneur account...
                    </p>
                )}
            </div>
        </div>
    );
}

export default EntrepreneurRegister;