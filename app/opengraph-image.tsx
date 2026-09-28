import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name}, Data Analyst`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const portrait = await readFile(join(process.cwd(), "assets/og-portrait.jpg"));
  const src = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f6f4ef", padding: 64, gap: 56 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 22, color: "#5f6674", fontFamily: "monospace" }}>
            SELECT * FROM portfolio;
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, color: "#0e5a52", fontWeight: 600 }}>Data Analyst · Lagos, Nigeria</div>
            <div style={{ fontSize: 76, fontWeight: 700, color: "#15171c", lineHeight: 1.02, marginTop: 18, letterSpacing: -2 }}>
              Jayeola Olasunkanmi Idyat
            </div>
            <div style={{ fontSize: 30, color: "#383d48", marginTop: 24 }}>Excel · Power BI · SQL · R · Python</div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
            {[30, 52, 40, 70, 58, 92].map((h, i) => (
              <div key={i} style={{ width: 22, height: h, borderRadius: 4, background: i === 5 ? "#b0491a" : "#0e5a52" }} />
            ))}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires <img> */}
        <img src={src} width={400} height={500} alt="" style={{ borderRadius: 20, objectFit: "cover" }} />
      </div>
    ),
    size,
  );
}
