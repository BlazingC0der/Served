import React from 'react'
import "./services.css"

const Services = () => (
	<div className="services">
		<div className="service">
			<div className="trapezium"><span class="material-symbols-outlined">
				cut
			</span></div>
			<span className="txt">Barber</span>
		</div>
		<div className="service">
			<div className="trapezium"><span class="material-symbols-outlined">
				plumbing
			</span></div>
			<span className="txt">Plumber</span>
		</div>
		<div className="service">
			<div className="trapezium"><span class="material-symbols-outlined">
				directions_car
			</span></div>
			<span className="txt">Mechanic</span>
		</div>
		<div className="service">
			<div className="trapezium"><span class="material-symbols-outlined">
				bolt
			</span></div>
			<span className="txt">Electrician</span>
		</div>
	</div>
)

export default Services
