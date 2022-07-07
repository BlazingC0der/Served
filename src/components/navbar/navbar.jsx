import React, { useState, useEffect } from 'react'
import "./navbar.css"
import { NavLink } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"
import Modal from "@material-ui/core/Modal"
import Fade from "@material-ui/core/Fade"
import Backdrop from "@material-ui/core/Backdrop"
import axios from "axios"
import Map from "./map"

const Navbar = (props) => {
	const [DisplayMap, setDisplayMap] = useState(false)
	const [CurrLoc, setCurrLoc] = useState({})
	const [CurrAddress, setCurrAddress] = useState("")
	const [addresses, setAddresses] = useState([])
	const [locations, setLocations] = useState([]) //once conected to backend this'll be an object of the form {address:coords}
	const [OpenModal, setOpenModal] = useState(false)

	useEffect(() => {
		if (window.location.href.length === 22) {
			document.getElementById("LoginBtn").style.display = "block"
		} else {
			if (window.location.href.slice(22) !== "/register") {
				document.getElementById("BtnWrapper").style.display = "flex"
			}
			if (window.location.href.slice(27) === "/purchase") {
				document.getElementById("ExtensionWrapper").style.display = "block"
			}
		}
		axios.get("https://jsonplaceholder.typicode.com/users").then(res => {
			let temp = []
			for (let i = 0; i < 3; i++) {
				temp.push(res.data[i].address)
			}
			setLocations(temp)
			console.log(locations)
			/* res.coords.map(coord => {
				let latlng = toString(coord.lat) + "," + toString(coord.lng)
				axios
					.get(
						"https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
							latlng +
							"&key=AIzaSyCqcsAR-DOZvYs2_aSCVpe2tJ3lBG3KKLE"
					)
					.then(res => {
						let LongAddress = res.results.formatted_address.split(",")
						let ShortAddress = LongAddress[0]+","+LongAddress[1]
						let TempLocs = {...locations, ShortAddress:coord}
						setState({locations:TempLocs},()=>setState({addresses:Object.keys(locations)})
					})
			}) */
			if ("geolocation" in navigator) {
				navigator.geolocation.getCurrentPosition(position => {
					setCurrLoc({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					})
					setCurrAddress("Current Location")
				})
			}
		})
	}, [])
	const ServiceBtnHandle = e => {
		let btns = document.querySelectorAll(".ServiceBtn")
		btns.forEach(btn => (btn.style.color = "#b4b4b4"))
		document.getElementById(e.target.id).style.color = "#fe0000"
	}
	const LogoutHandle = e => {
		sessionStorage.setItem("SignedIn", false)
		props.history.push({ pathName: "/" })
	}
	const ModalOpener = () => {
		setOpenModal(true)
	}
	const ModalCloser = () => {
		setDisplayMap(false)
		setOpenModal(false)
	}
	const LocSelector = e => {
		console.log(e.target.key)
		if (e.target.key === -1) {
			navigator.geolocation.getCurrentPosition(position => {
				setCurrLoc({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				})
				setCurrAddress("Current Location")
			})
		} else {
			setCurrAddress(locations[e.target.key].city)
			setOpenModal(false)
		}
		let btns = document.querySelectorAll(".address > button")
		btns.map(btn => (btn.disable = false))
		document.querySelector(
			"li[key=" + e.target.key + "]>button"
		).disable = true
	}
	const MapHandle = () => {
		setDisplayMap(true)
	}
	const NewLocHandle = (loc, address = "abyssus") => {
		setCurrAddress(address)
		setCurrLoc(loc)
		ModalCloser()
		/* let TempLocs = { ...locations, address: loc }
		setState({addresses:Object.keys(locations)})
		axios call */
	}
	return (
		<>
			<div className="NavWrapper">
				<div className="MainWrapper">
					<div className="LogoWrapper">
						<Router>
							<NavLink to="#">
								<button className="logo">$erved.</button>
							</NavLink>
						</Router>
					</div>
					<button
						id="LoginBtn"
						className="LoginBtn"
						onClick={() => {
							window.scrollBy({
								top: 500,
								left: 0,
								behavior: "smooth",
							})
						}}
					>
						Login
					</button>
					<div id="BtnWrapper" className="BtnWrapper">
						<NavLink to="#">
							<div className="ProfileBtnWrapper">
								<i className="material-icons UserIcon">
									account_circle
								</i>
								<button id="ProfileBtn" className="ProfileBtn">
									User
								</button>
							</div>
						</NavLink>
						<div className="LogoutBtnWrapper">
							<i className="material-icons PowerIcon">
								power_settings_new
							</i>
							<button
								id="LogoutBtn"
								className="LogoutBtn"
								onClick={LogoutHandle}
							></button>
						</div>
					</div>
				</div>
				<div className="ExtensionWrapper" id="ExtensionWrapper">
					<div className="SelectionBar">
						<hr />
						<button
							className="ServiceBtn"
							id="ServiceBtn1"
							onClick={ServiceBtnHandle}
						>
							Barber
						</button>
						<hr />
						<button
							className="ServiceBtn"
							id="ServiceBtn2"
							onClick={ServiceBtnHandle}
						>
							Plumber
						</button>
						<hr />
						<button
							className="ServiceBtn"
							id="ServiceBtn3"
							onClick={ServiceBtnHandle}
						>
							Electrician
						</button>
						<hr />
						<button
							className="ServiceBtn"
							id="ServiceBtn4"
							onClick={ServiceBtnHandle}
						>
							Mechanic
						</button>
						<hr />
					</div>
					<div className="SearchBar">
						<button className="LocBtn" onClick={ModalOpener}>
							<i class="material-icons CompassIcon">explore</i>
							{CurrAddress}
						</button>
						<div className="SearchWrapper">
							<form>
								<input
									type="text"
									name="search"
									id="search"
									placeholder="&#e8b6; Search..."
								/>
							</form>
							<button className="FilterBtn">
								<i class="material-icons FilterIcon">filter_alt</i>
							</button>
						</div>
					</div>
				</div>
			</div>
			<Modal
				open={OpenModal}
				onClose={ModalCloser}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={OpenModal}>
					{!DisplayMap ? (
						<div className="LocModal">
							<ul>
								<li
									className="address"
									key={-1}
									onClick={LocSelector}
								>
									<button>
										<span className="material-icons pin">
											room
										</span>
										Current Location
									</button>
								</li>
								{locations.map(
									//once connected to backend addresses.map()
									(address, index) => (
										<li
											className="address"
											key={index}
											onClick={LocSelector}
										>
											<button>
												<span className="material-icons pin">
													room
												</span>
												{address.city}
											</button>
										</li>
									)
								)}
							</ul>
							<button className="AddBtn" onClick={MapHandle}>
								<span className="material-icons add">
									add_circle
								</span>
								Add another address
							</button>
						</div>
					) : (
						<div className="MapParent">
							<div className="MapWrapper">
								<Map LocHandle={NewLocHandle} />
							</div>
						</div>
					)}
				</Fade>
			</Modal>
		</>
	)
}

export default Navbar
