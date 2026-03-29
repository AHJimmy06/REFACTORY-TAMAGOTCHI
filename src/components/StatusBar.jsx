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
                marginBottom: "5px",
            }}
        >
            <img
                src={icon}
                alt={label}
                style={{ width: "24px", height: "24px", marginRight: "10px", imageRendering: "pixelated" }}
            />
            <div
                style={{
                    flex: 1,
                    background: "#2D1B18", /* Nogal Profundo */
                    height: "16px",
                    border: "2px solid #F5F5DC", /* Borde Crema */
                    padding: "2px",
                    boxSizing: "content-box"
                }}
            >
                <div style={barStyle}></div>
            </div>
            <span style={{ marginLeft: "10px", fontSize: "10px", minWidth: "40px" }}>{value}%</span>
        </div>
    );
}

export default StatusBar;

