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

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const fetchProfile = async () => {
        setLoading(true);

        window.dispatchEvent(
            new Event("app-loading-start")
        );

        try {
            const user = JSON.parse(
                localStorage.getItem("user")
            );

            if (!user) {
                navigate("/login");
                return;
            }

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/entrepreneurs/${user.id}`
            );

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

            if (error.response?.status === 404) {
                alert("Entrepreneur profile not found.");
            } else {
                alert(
                    error.response?.data?.message ||
                    "Unable to load profile"
                );
            }

        } finally {
            setLoading(false);

            window.dispatchEvent(
                new Event("app-loading-stop")
            );
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();

        setUpdating(true);

        window.dispatchEvent(
            new Event("app-loading-start")
        );

        try {
            const user = JSON.parse(
                localStorage.getItem("user")
            );

            if (!user) {
                navigate("/login");
                return;
            }

            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/entrepreneurs/${user.id}`,
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

            await fetchProfile();

        } catch (error) {
            console.log("PROFILE UPDATE ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Profile update failed"
            );

        } finally {
            setUpdating(false);

            window.dispatchEvent(
                new Event("app-loading-stop")
            );
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (loading) {
        return (
            <div className="auth-container">
                <div className="auth-box">
                    <p style={{
                        textAlign: "center",
                        color: "#555"
                    }}>
                        Loading profile...
                    </p>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="auth-container">
                <div className="auth-box">
                    <p style={{
                        textAlign: "center",
                        color: "#555"
                    }}>
                        Profile could not be loaded.
                    </p>

                    <button onClick={fetchProfile}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-box">

                <h2>Entrepreneur Profile</h2>

                <button
                    type="button"
                    onClick={handleLogout}
                    disabled={updating}
                >
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
                        disabled={updating}
                    />

                    <input
                        type="text"
                        placeholder="Business Name"
                        value={businessName}
                        onChange={(e) =>
                            setBusinessName(e.target.value)
                        }
                        disabled={updating}
                    />

                    <input
                        type="text"
                        placeholder="Business Category"
                        value={businessCategory}
                        onChange={(e) =>
                            setBusinessCategory(e.target.value)
                        }
                        disabled={updating}
                    />

                    <textarea
                        placeholder="Business Description"
                        value={businessDescription}
                        onChange={(e) =>
                            setBusinessDescription(
                                e.target.value
                            )
                        }
                        disabled={updating}
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
                        disabled={updating}
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
                        disabled={updating}
                    />

                    <button
                        type="submit"
                        disabled={updating}
                    >
                        {updating
                            ? "Updating Profile..."
                            : "Update Profile"}
                    </button>

                </form>

                {updating && (
                    <p style={{
                        textAlign: "center",
                        marginTop: "12px",
                        color: "#555"
                    }}>
                        Saving your business details...
                    </p>
                )}

            </div>
        </div>
    );
}

export default EntrepreneurProfile;