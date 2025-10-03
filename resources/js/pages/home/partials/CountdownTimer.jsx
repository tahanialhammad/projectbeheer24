import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialTime }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime > 0) return prevTime - 1;
                clearInterval(timer); // Stop at 0
                return 0;
            });
        }, 1000);

        // Cleanup on component unmount
        return () => clearInterval(timer);
    }, []);

    // Format the time to DD:HH:MM:SS
    const formatTime = (time) => {
        const days = Math.floor(time / (24 * 3600)); // Calculate the number of days
        const hours = Math.floor((time % (24 * 3600)) / 3600); // Remaining hours
        const minutes = Math.floor((time % 3600) / 60); // Remaining minutes
        const seconds = time % 60; // Remaining seconds

        return `${String(days).padStart(2, "0")} : ${String(hours).padStart(
            2,
            "0"
        )} : ${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(
            2,
            "0"
        )}`;
    };
    return (
        <div>
            <h1 className="text-5xl text-indigo-700 font-black my-4">
                {formatTime(timeLeft)}
            </h1>
            <h2 className="text-xl font-bold space-x-8 text-center">
                <span>Days</span>
                <span>Hours</span>
                <span>Mintues</span>
                <span>Seconds</span>
            </h2>
        </div>
    );
};

export default CountdownTimer;
