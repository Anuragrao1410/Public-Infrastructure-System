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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create entrepreneur user account
            const userResponse = await axios.post(
                "http://localhost:5000/api/users/register",
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
                "http://localhost:5000/api/users/login",
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
                "http://localhost:5000/api/entrepreneurs",
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
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Registration failed"
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
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Business Name"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Business Category"
                        value={businessCategory}
                        onChange={(e) =>
                            setBusinessCategory(e.target.value)
                        }
                        required
                    />

                    <textarea
                        placeholder="Business Description"
                        value={businessDescription}
                        onChange={(e) =>
                            setBusinessDescription(e.target.value)
                        }
                    />

                    <input
                        type="text"
                        placeholder="Business Location"
                        value={businessLocation}
                        onChange={(e) =>
                            setBusinessLocation(e.target.value)
                        }
                        required
                    />

                    <input
                        type="number"
                        placeholder="Years in Business"
                        value={yearsInBusiness}
                        onChange={(e) =>
                            setYearsInBusiness(e.target.value)
                        }
                    />

                    <button type="submit">
                        Register Business
                    </button>

                </form>

            </div>
        </div>
    );
}

export default EntrepreneurRegister;