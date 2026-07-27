import { ImageResponse } from "next/og";

export const alt = "Karivo — Websites, die Kunden gewinnen.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: 32,
            fontWeight: 600,
            color: "#111111",
          }}
        >
          Karivo
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "36px",
            fontSize: 72,
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#111111",
          }}
        >
          <span>Websites,</span>
          <span>die Kunden gewinnen.</span>
        </div>
        <div style={{ display: "flex", marginTop: "32px", fontSize: 28, color: "#6b7280" }}>
          Premium Websites für Unternehmen, die online überzeugen wollen.
        </div>
      </div>
    ),
    { ...size }
  );
}
