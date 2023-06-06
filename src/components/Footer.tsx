import React from "react";
import "../styles/Footer.css";

const Footer = () => {
	return (
		<div className="Footer">
			<p>
				Built by Lumi&nbsp;&nbsp;&nbsp;
				<a
					href="https://github.com/Lumi-sg/MemoryCard"
					style={{ textDecoration: "none" }}
					target="_blank"
					rel="noopener noreferrer"
				>
					<i style={{ fontSize: 24 }} className="fa">
						&#xf09b;
					</i>
				</a>
			</p>
		</div>
	);
};

export default Footer;
