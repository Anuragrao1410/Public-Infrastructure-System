import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EntrepreneurProfile() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);

    const [phone, setPhone] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [businessCategory, setBusinessCategory] = useState("");
    const [businessDescription, setBusinessDescription] = useState("");
    const [businessLocation, setBusinessLocation] = useState("");
    const [yearsInBusiness, setYearsInBusiness] = useState("");

    const fetchProfile = async () => {
        try {
            const user = JSON.parse(
                localStorage.getItem("user")
            );

            console.log("CURRENT USER:", user);

            const response = await axios.get(
                `http://localhost:5000/api/entrepreneurs/${user.id}`
            );

            console.log("PROFILE RESPONSE:", response.data);

            const data = response.data;

            setProfile(data);
            setPhone(data.phone || "");
            setBusinessName(data.businessName || "");
            setBusinessCategory(data.businessCategory || "");
            setBusinessDescription(data.businessDescription || "");
            setBusinessLocation(data.businessLocation || "");
            setYearsInBusiness(data.yearsInBusiness || "");

        } catch (error) {
            console.log("PROFILE ERROR:", error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const user = JSON.parse(
                localStorage.getItem("user")
            );

            await axios.put(
                `http://localhost:5000/api/entrepreneurs/${user.id}`,
                {
                    phone,
                    businessName,
                    businessCategory,
                    businessDescription,
                    businessLocation,
                    yearsInBusiness
                }
            );

            alert("Profile updated successfully!");

            fetchProfile();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Profile update failed"
            );
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    if (!profile) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="auth-container">
            <div className="auth-box">

                <h2>Entrepreneur Profile</h2>

                <button onClick={handleLogout}>
                    Logout
                </button>

                <p>
                    <strong>Name:</strong> {profile.name}
                </p>

                <p>
                    <strong>Email:</strong> {profile.email}
                </p>

                <form onSubmit={handleUpdate}>

                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) =>
                            setPhone(e.target.value)
                        }
                    />

                    <input
                        type="text"
                        placeholder="Business Name"
                        value={businessName}
                        onChange={(e) =>
                            setBusinessName(e.target.value)
                        }
                    />

                    <input
                        type="text"
                        placeholder="Business Category"
                        value={businessCategory}
                        onChange={(e) =>
                            setBusinessCategory(e.target.value)
                        }
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
                        Update Profile
                    </button>

                </form>

            </div>
        </div>
    );
}

export default EntrepreneurProfile;