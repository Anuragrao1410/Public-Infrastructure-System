import { useEffect, useState } from "react";

function LoadingBar() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const startLoading = () => setLoading(true);
        const stopLoading = () => setLoading(false);

        window.addEventListener("app-loading-start", startLoading);
        window.addEventListener("app-loading-stop", stopLoading);

        return () => {
            window.removeEventListener(
                "app-loading-start",
                startLoading
            );

            window.removeEventListener(
                "app-loading-stop",
                stopLoading
            );
        };
    }, []);

    if (!loading) {
        return null;
    }

    return (
        <div className="global-loading-bar">
            <div className="global-loading-progress"></div>
        </div>
    );
}

export default LoadingBar;