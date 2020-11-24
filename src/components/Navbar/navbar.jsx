import React, { Component } from "react"
import Display from "./navbarUI"

class Navbar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			logout: false,
			redirect: false,
		}
	}
	render() {
		return <Display />
	}
}

export default Navbar
