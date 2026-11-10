import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

// Image metadata
export const alt = siteConfig.name;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "linear-gradient(to bottom right, #0f172a, #1e293b)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          padding: "40px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "40px" }}>
          <div style={{ fontSize: 140, fontWeight: "900", color: "#38bdf8" }}>HABIB</div>
          <div style={{ fontSize: 140, fontWeight: "300" }}>ENGINEERING</div>
        </div>
        <div style={{ fontSize: 36, color: "#94a3b8", textAlign: "center", maxWidth: "800px" }}>
          Powering Pakistan's Industry Since 1985
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}