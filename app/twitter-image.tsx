import { ImageResponse } from "next/og"

export const alt = "Uncle Sam Junk Removal"
export const size = {
	width: 1200,
	height: 630,
}
export const contentType = "image/png"

export default function Image() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					background:
						"linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0ea5e9 100%)",
					color: "white",
					padding: "64px",
					boxSizing: "border-box",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						textAlign: "center",
					}}
				>
					<div style={{ fontSize: 64, fontWeight: 800, marginBottom: 8 }}>
						Uncle Sam Junk Removal
						
					</div>
					<div style={{ fontSize: 32, opacity: 0.9 }}>
						Professional Junk Removal & Dumpster Rental in Evansville, IN
					</div>
					<div style={{ fontSize: 28, marginTop: 28, opacity: 0.95 }}>
						unclesamjunkremoval.com
					</div>
				</div>
			</div>
		),
		{ ...size }
	)
}

