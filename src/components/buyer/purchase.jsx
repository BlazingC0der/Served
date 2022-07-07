import React, { useState, useEffect } from "react"
import axios from "axios"
import "./purchase.css"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"

const Purchase = () => {
	const [ServiceData, setServiceData] = useState([])

	useEffect(() => {
		axios.get("https://jsonplaceholder.typicode.com/users").then(res => {
			setServiceData(res.data)
			console.log(ServiceData)
		})
	}, [])

	return (
		<div className="ServiceWrapper">
			{ServiceData.map(service => (
				<Card className="ServiceCard">
					<h2 className="BizName">{service.username}</h2>
					<p className="BizIntro">
						Lorem ipsum dolor sit amet, consectetur adipisicing.
					</p>
					<h4 className="rate">${service.id}<br />Hourly Rate</h4>
				</Card>
			))}
		</div>
	)
}

export default Purchase