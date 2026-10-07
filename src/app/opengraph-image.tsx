import { ImageResponse } from "next/og";
import { business } from "@/lib/content/business";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = business.name;

export default async function OpengraphImage() {
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
          background: "linear-gradient(135deg, #12120f 0%, #1d2b20 55%, #263b2b 100%)",
          color: "#fdfbf6",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#8fae8d",
          }}
        >
          Fotostudio · {business.address.city} & NRW
        </div>
        <div style={{ display: "flex", fontSize: 76, marginTop: 24, lineHeight: 1.1 }}>
          {business.name}
        </div>
        <div style={{ display: "flex", fontSize: 32, marginTop: 20, color: "#ece1c8" }}>
          {business.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
