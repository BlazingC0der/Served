import React, { Component } from "react"
import Display from "./navbarUI"
class Navbar extends Component {
	componentDidMount() {
		if (window.location.href.length === 22) {
			document.getElementById("LoginBtn").style.display = "block"
		}
	}
	render() {
		return <Display ServiceBtnHandle={this.ServiceBtnHandle} />
	}
}

export default Navbar
