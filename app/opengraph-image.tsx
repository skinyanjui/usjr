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
					flexDirection: "column",
					justifyContent: "space-between",
					background:
						"linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0ea5e9 100%)",
					color: "white",
					padding: "64px",
					boxSizing: "border-box",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
					<div
						style={{
							width: 72,
							height: 72,
							borderRadius: 16,
							background: "rgba(255,255,255,0.15)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							backdropFilter: "blur(2px)",
						}}
					>
						<span style={{ fontSize: 40, fontWeight: 700 }}>US</span>
					</div>

					<div style={{ display: "flex", flexDirection: "column" }}>
						<span style={{ fontSize: 40, fontWeight: 700 }}>
							Uncle Sam Junk Removal
						</span>
						<span style={{ fontSize: 24, opacity: 0.9 }}>
							Professional Junk Removal & Dumpster Rental in Evansville, IN
						</span>
					</div>
				</div>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<div style={{ fontSize: 30, opacity: 0.95 }}>unclesamjunkremoval.com</div>
					<div style={{ display: "flex", gap: 16 }}>
						<div
							style={{
								padding: "12px 20px",
								borderRadius: 9999,
								background: "rgba(255,255,255,0.12)",
								fontSize: 24,
							}}
						>
							Junk Removal
						</div>
						<div
							style={{
								padding: "12px 20px",
								borderRadius: 9999,
								background: "rgba(255,255,255,0.12)",
								fontSize: 24,
							}}
						>
							Dumpster Rental
						</div>
					</div>
				</div>
			</div>
		),
		{ ...size }
	)
}

