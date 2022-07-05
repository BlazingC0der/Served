import React, { Component } from "react"
import GoogleMapReact from "google-map-react"
import "./map.scss"
import axios from "axios"

class Map extends Component {
	constructor(props) {
		super(props)
		this.state = {
			zoom: 10,
			address: "",
			coords: {},
			map: null,
			maps: null,
			marker: null,
		}
	}
	componentDidMount() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(position => {
				this.setState(
					{
						coords: {
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						},
					},
					() => {
						axios
							.get(
								`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.coords.lat}, ${this.state.coords.lng}&key=AIzaSyCqcsAR-DOZvYs2_aSCVpe2tJ3lBG3KKLE`
							)
							.then(res => {
								/* let LongAddress = res.results.formatted_address.split(",")
						let ShortAddress = LongAddress[0]+","+LongAddress[1] 
						set state for address*/
								console.log(res)
							})
					}
				)
				console.log(position.coords.latitude, position.coords.longitude)
			})
		}
	}
	InitMap = (Map, Maps) => {
		this.setState({ map: Map, maps: Maps })
		let Marker = new Maps.Marker({
			position: this.state.coords,
			Map,
			animation: this.state.maps.Animation.DROP,
			draggable: true,
		})
		this.setState({ marker: Marker }, () => {
			// Create the search box and link it to the UI element.
			const input = document.getElementById("pac-input")
			const searchBox = new Maps.places.Autocomplete(input)
			this.state.map.controls[this.state.maps.ControlPosition.TOP_LEFT].push(
				input
			)
			// Bias the SearchBox results towards current map's viewport.
			this.state.map.addListener("bounds_changed", () => {
				searchBox.setBounds(this.state.map.getBounds())
			})
			// Listen for the event fired when the user selects a prediction and retrieve
			// more details for that place.
			searchBox.addListener("places_changed", () => {
				const places = searchBox.getPlaces()
				if (places.length === 0) {
					return
				}
				// Clear out the old markers.
				this.state.marker.setMap(null)
				// For each place, get the icon, name and location.
				const bounds = new this.state.maps.LatLngBounds()
				places.forEach(place => {
					if (!place.geometry || !place.geometry.location) {
						console.log("Returned place contains no geometry")
						return
					}
					const icon = {
						url: place.icon,
						size: new this.state.maps.Size(71, 71),
						origin: new this.state.maps.Point(0, 0),
						anchor: new this.state.maps.Point(17, 34),
						scaledSize: new this.state.maps.Size(25, 25),
					}
					// Create a marker for each place.
					let Map = this.state.map
					let Marker = new this.state.maps.Marker({
						Map,
						icon,
						title: place.name,
						animation: this.state.maps.Animation.DROP,
						position: place.geometry.location,
					})
					if (place.geometry.viewport) {
						// Only geocodes have viewport.
						bounds.union(place.geometry.viewport)
					} else {
						bounds.extend(place.geometry.location)
					}
					this.setState({ marker: Marker }, () =>
						this.setState({ coords: this.state.marker.getPosition() })
					)
				})
				this.state.map.fitBounds(bounds)
			})
		})
	}
	ClickHandle = ({ x, y, lat, lng, event }) => {
		console.log(lat, lng)
		this.setState({ coords: { lat: lat, lng: lng } }, () => {
			console.log("state", this.state.coords)
			this.state.marker.setMap(null)
			let Map = this.state.map
			let Marker = new this.state.maps.Marker({
				position: this.state.coords,
				Map,
				animation: this.state.maps.Animation.DROP,
				draggable: true,
			})
			this.setState({ marker: Marker })
			axios
				.get(
					`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.coords.lat}, ${this.state.coords.lng}&key=AIzaSyCqcsAR-DOZvYs2_aSCVpe2tJ3lBG3KKLE`
				)
				.then(res => {
					/* let LongAddress = res.results.formatted_address.split(",")
						let ShortAddress = LongAddress[0]+","+LongAddress[1] 
						set state for address*/
					console.log(res)
				})
		})
	}
	render() {
		return (
			<>
				<input
					id="pac-input"
					className="controls"
					type="text"
					placeholder="Search..."
				/>
				<GoogleMapReact
					bootstrapURLKeys={{
						key: "AIzaSyCqcsAR-DOZvYs2_aSCVpe2tJ3lBG3KKLE",
						libraries: ["places"],
					}}
					center={this.state.coords}
					zoom={this.state.zoom}
					yesIWantToUseGoogleMapApiInternals
					onGoogleApiLoaded={({ map, maps }) => this.InitMap(map, maps)}
					onClick={this.ClickHandle}
				></GoogleMapReact>
				<div className="AddressWrapper">
					<h2>{`${this.state.coords.lat} ${this.state.coords.lng}`}</h2>
					<button className="MapBtn" onClick={()=>this.props.LocHandle(this.state.coords)}>Confirm Address</button>
				</div>
			</>
		)
	}
}

export default Map
