import React, { Component } from "react"
import Display from "./Navbar/navbarUI"

class NavbarBuyer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			logout: false
		}
	}
	componentDidMount() {
		if (window.location.href.length === 22) {
			document.getElementById("LoginBtn").style.display = "block"
		} else {
			if (window.location.href.slice(22) !== "/register") {
				document.getElementById("BtnWrapper").style.display = "flex"
			}
			if (window.location.href.slice(27) === "/purchase") {
				document.getElementById("ExtensionWrapper").style.display="block"
			}
		}
	}
	ServiceBtnHandle = e => {
		document.getElementById(e.target.id).style.color = "#fe0000"
	}
	render() {
		return <Display ServiceBtnHandle={this.ServiceBtnHandle}/>
	}
}

export default NavbarBuyer
