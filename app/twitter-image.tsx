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
					background: "rgb(204,39,39)",
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
						textTransform: "uppercase",
						textAlign: "center",
						lineHeight: 1.05,
						letterSpacing: 1,
					}}
				>
					<div style={{ fontSize: 180, fontWeight: 900 }}>Uncle Sam</div>
					<div style={{ fontSize: 160, fontWeight: 900 }}>Junk Removal</div>
				</div>
			</div>
		),
		{ ...size }
	)
}
