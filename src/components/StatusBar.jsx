import React from "react";

function StatusBar({ label, icon, value, color }) {
    const barStyle = {
        background: color,
        width: `${value}%`,
        height: "100%",
        transition: "width 0.3s",
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
            }}
        >
            <img
                src={icon}
                alt={label}
                style={{ width: "32px", height: "32px", marginRight: "10px" }}
            />
            <div
                style={{
                    flex: 1,
                    background: "#ccc",
                    height: "20px",
                    borderRadius: "5px",
                }}
            >
                <div style={{ ...barStyle, borderRadius: "5px" }}></div>
            </div>
            <span style={{ marginLeft: "10px" }}>{value}%</span>
        </div>
    );
}

export default StatusBar;

