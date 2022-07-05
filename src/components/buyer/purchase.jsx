import React, { Component } from "react"
import axios from "axios"
import "./purchase.scss"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"

class ServiceSelect extends Component {
	constructor(props) {
		super(props)
		this.state = { ServiceData: [] }
	}
	componentDidMount() {
		axios.get("https://jsonplaceholder.typicode.com/users").then(res => {
			this.setState({ ServiceData: res.data })
			console.log(this.state.ServiceData)
		})
	}
	render() {
		return (
			<div className="ServiceWrapper">
				{this.state.ServiceData.map(service => (
					<Card className="ServiceCard">
						<h2 className="BizName">{service.username}</h2>
						<p className="BizIntro">
							Lorem ipsum dolor sit amet, consectetur adipisicing.
						</p>
						<h4 className="rate">${service.id}<br/>Hourly Rate</h4>
					</Card>
				))}
			</div>
		)
	}
}

export default ServiceSelect