import React, { useState, useEffect } from "react"
import GoogleMapReact from "google-map-react"
import "./map.css"
import axios from "axios"
import { useForkRef } from "@material-ui/core"

const Map = (props) => {
	const [zoom, setZoom] = useState(10)
	const [marker, setMarker] = useState(null)
	const [maps, setMaps] = useState(null)
	const [map, setMap] = useState(null)
	const [coords, setCoords] = useState({})
	const [address, setAddress] = useState("")

	const MarkerSetter = (Marker) => {
		setMarker(Marker)
		return new Promise((resolve) => {
			resolve()
		})
	}

	const CoordsSetter = (coords) => {
		setCoords(coords)
		return new Promise((resolve) => {
			resolve()
		})
	}

	const MarkerSetter2 = (marker) => {
		setMarker(marker)
		return new Promise((resolve) => {
			resolve()
		})
	}

	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(position => {
				setCoords({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				}
				)
				console.log(position.coords.latitude, position.coords.longitude)
			})
		}
	}, [])

	useEffect(() => {
		axios
			.get(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat}, ${coords.lng}&key=AIzaSyCqcsAR-DOZvYs2_aSCVpe2tJ3lBG3KKLE`
			)
			.then(res => {
				/* let LongAddress = res.results.formatted_address.split(",")
		let ShortAddress = LongAddress[0]+","+LongAddress[1] 
		set state for address*/
				console.log(res)
			})
	}, [coords])

	const InitMap = (Map, Maps) => {
		setMap(Map)
		setMaps(Maps)
		let Marker = new Maps.Marker({
			position: coords,
			Map,
			animation: Maps.Animation.DROP,
			draggable: true,
		})
		MarkerSetter2(Marker).then(() => {
			const input = document.getElementById("pac-input")
			const SearchBox = new Maps.places.Autocomplete(input)
			Map.controls[Maps.ControlPosition.TOP_LEFT].push(
				input
			)
			// Bias the SearchBox results towards current map's viewport.
			Map.addListener("bounds_changed", () => {
				SearchBox.setBounds(Map.getBounds())
			})
			// Listen for the event fired when the user selects a prediction and retrieve
			// more details for that place.
			SearchBox.addListener("places_changed", () => {
				const places = SearchBox.getPlaces()
				if (places.length === 0) {
					return
				}
				// Clear out the old markers.
				marker.setMap(null)
				// For each place, get the icon, name and location.
				const bounds = new Maps.LatLngBounds()
				places.forEach(place => {
					if (!place.geometry || !place.geometry.location) {
						console.log("Returned place contains no geometry")
						return
					}
					const icon = {
						url: place.icon,
						size: new Maps.Size(71, 71),
						origin: new Maps.Point(0, 0),
						anchor: new Maps.Point(17, 34),
						scaledSize: new Maps.Size(25, 25),
					}
					// Create a marker for each place.
					let Marker = new Maps.Marker({
						Map,
						icon,
						title: place.name,
						animation: Maps.Animation.DROP,
						position: place.geometry.location,
					})
					if (place.geometry.viewport) {
						// Only geocodes have viewport.
						bounds.union(place.geometry.viewport)
					} else {
						bounds.extend(place.geometry.location)
					}
					MarkerSetter(Marker).then(() => setCoords(marker.getPosition()))
				})
				Map.fitBounds(bounds)
			})
		})
	}
	const ClickHandle = ({ x, y, lat, lng, event }) => {
		console.log(lat, lng)
		CoordsSetter({ lat: lat, lng: lng }).then(() => {
			console.log("state", coords)
			marker.setMap(null)
			let Marker = new maps.Marker({
				position: coords,
				map,
				animation: maps.Animation.DROP,
				draggable: true,
			})
			setMarker(Marker)
			axios
				.get(
					`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat}, ${coords.lng}&key=AIzaSyCqcsAR-DOZvYs2_aSCVpe2tJ3lBG3KKLE`
				)
				.then(res => {
					/* let LongAddress = res.results.formatted_address.split(",")
						let ShortAddress = LongAddress[0]+","+LongAddress[1] 
						set state for address*/
					console.log(res)
				})
		})
	}

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
				center={coords}
				zoom={zoom}
				yesIWantToUseGoogleMapApiInternals
				onGoogleApiLoaded={({ map, maps }) => InitMap(map, maps)}
				onClick={ClickHandle}
			></GoogleMapReact>
			<div className="AddressWrapper">
				<h2>{`${coords.lat} ${coords.lng}`}</h2>
				<button className="MapBtn" onClick={() => props.LocHandle(coords)}>Confirm Address</button>
			</div>
		</>
	)
}

export default Map
