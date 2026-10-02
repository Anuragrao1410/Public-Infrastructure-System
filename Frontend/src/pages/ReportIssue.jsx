import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function ReportIssue() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const [loading, setLoading] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);

    const getLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        setLocationLoading(true);

        window.dispatchEvent(
            new Event("app-loading-start")
        );

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);

                setLocationLoading(false);

                window.dispatchEvent(
                    new Event("app-loading-stop")
                );

                alert("Location fetched successfully!");
            },
            (error) => {
                setLocationLoading(false);

                window.dispatchEvent(
                    new Event("app-loading-stop")
                );

                alert(
                    "Unable to get location: " +
                    error.message
                );
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = JSON.parse(
            localStorage.getItem("user")
        );

        if (!user) {
            alert("Please login first.");
            return;
        }

        if (
            !title ||
            !category ||
            !description ||
            !latitude ||
            !longitude
        ) {
            alert(
                "Please fill all fields and get your current location."
            );
            return;
        }

        const formData = new FormData();

        formData.append("title", title);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("reportedBy", user.id);

        if (image) {
            formData.append("image", image);
        }

        setLoading(true);

        window.dispatchEvent(
            new Event("app-loading-start")
        );

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/issues`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert(response.data.message);

            setTitle("");
            setCategory("");
            setDescription("");
            setImage(null);
            setLatitude("");
            setLongitude("");

        } catch (error) {
            console.log("ISSUE ERROR:", error);
            console.log("RESPONSE:", error.response);
            console.log("DATA:", error.response?.data);

            alert(
                error.response?.data?.message ||
                error.message ||
                "Issue submission failed"
            );

        } finally {
            setLoading(false);

            window.dispatchEvent(
                new Event("app-loading-stop")
            );
        }
    };

    return (
        <>
            <Navbar />

            <div className="auth-container">
                <div className="auth-box">

                    <h2>Report Infrastructure Issue</h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            placeholder="Issue Title"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            disabled={loading}
                            required
                        />

                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            disabled={loading}
                            required
                        >
                            <option value="">
                                Select Category
                            </option>

                            <option value="Pothole">
                                Pothole
                            </option>

                            <option value="Streetlight">
                                Streetlight
                            </option>

                            <option value="Water Leakage">
                                Water Leakage
                            </option>

                            <option value="Damaged Footpath">
                                Damaged Footpath
                            </option>

                            <option value="Open Drain">
                                Open Drain
                            </option>

                            <option value="Other">
                                Other
                            </option>
                        </select>

                        <textarea
                            placeholder="Describe the problem"
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            disabled={loading}
                            required
                        />

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setImage(
                                    e.target.files[0]
                                )
                            }
                            disabled={loading}
                        />

                        <button
                            type="button"
                            onClick={getLocation}
                            disabled={
                                loading ||
                                locationLoading
                            }
                        >
                            {locationLoading
                                ? "Getting Location..."
                                : "Get Current Location"}
                        </button>

                        {latitude && longitude && (
                            <p>
                                Latitude: {latitude}
                                <br />
                                Longitude: {longitude}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Submitting Issue..."
                                : "Submit Issue"}
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
                            Uploading issue and image...
                        </p>
                    )}

                    {locationLoading && (
                        <p
                            style={{
                                textAlign: "center",
                                marginTop: "12px",
                                color: "#555"
                            }}
                        >
                            Fetching your current location...
                        </p>
                    )}

                </div>
            </div>
        </>
    );
}

export default ReportIssue;