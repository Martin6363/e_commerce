import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function ImageModal({ images, onClose, initialImage }) {
  return (
    <div
      style={{
        position: "fixed",
        overflowY: "auto",
        padding: "15px",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "1.5rem",
          cursor: "pointer",
        }}
      >
        <FaTimes />
      </button>
      <div
        style={{
          position: "relative",
          width: "80%",
          height: "100%",
        }}
      >
        <div className="flex items-center justify-center flex-wrap gap-2">
          {images?.map((img, index) => (
            <div
              key={index}
              style={{
                maxWidth: "450px",
                height: "700px",
                display: "flex",
                borderRadius: "10px",
              }}
            >
              <img
                src={img.url}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 10,
                  objectFit: "contain",
                }}
                alt="Full size"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
