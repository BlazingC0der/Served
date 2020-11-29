import React, { Component } from "react"
import Display from "./navbarUI"
class Navbar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			logout: false,
			redirect: false,
			extend: false,
		}
	}
	componentDidMount() {
		if (window.location.href.length === 13) {
			console.log(window.location.href.length)
			document.getElementById("LoginBtn").style.display = "none"
		} else {
			if (window.location.href.slice(20) === "/purchase") {
				this.setState({ extend: 1 })
			}
		}
	}
	render() {
		return <Display />
	}
}

export default Navbar
