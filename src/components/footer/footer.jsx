import React, { useEffect } from "react"
import Logo from "../../images/served-white.png"
import "./footer.css"

const Footer = () => {

	useEffect(() => {
		if (window.location.href.length === 22) {
			document.getElementById("FootWrapper").style.height = "8vh"
			// document.getElementById("FootWrapper").style.clipPath =
			// 	"polygon(0 0, 100% 61%, 100% 100%, 0% 100%)"
			document.getElementById("LogoSm").style.marginTop = "0.5%"
		}
	}, [])

	return (
		<>
			<div className="FootWrapper" id="FootWrapper">
				<img src={Logo} alt="Logo" id="LogoSm" className="LogoSm" />
			</div>
		</>
	)
}

export default Footer
