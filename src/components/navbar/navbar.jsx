import React, { Component } from "react"
import "./navbar.scss"
import { NavLink } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"
import Modal from "@material-ui/core/Modal"
import Fade from "@material-ui/core/Fade"
import Backdrop from "@material-ui/core/Backdrop"
import axios from "axios"
import Map from "./map.jsx"

class Navbar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			OpenModal: false,
			locations: [], //once conected to backend this'll be an object of the form {address:coords}
			addresses: [],
			CurrAddress: "",
			CurrLoc: {},
			DisplayMap: false,
		}
	}
	componentDidMount() {
		if (window.location.href.length === 22) {
			document.getElementById("LoginBtn").style.display = "none"
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
			this.setState({ locations: temp })
			console.log(this.state.locations)
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
						let TempLocs = {...this.state.locations, ShortAddress:coord}
						this.setState({locations:TempLocs},()=>this.setState({addresses:Object.keys(locations)})
					})
			}) */
			if ("geolocation" in navigator) {
				navigator.geolocation.getCurrentPosition(position => {
					this.setState({
						CurrLoc: {
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						},
						CurrAddress: "Current Location",
					})
				})
			}
		})
	}
	ServiceBtnHandle = e => {
		let btns = document.querySelectorAll(".ServiceBtn")
		btns.forEach(btn => (btn.style.color = "#b4b4b4"))
		document.getElementById(e.target.id).style.color = "#fe0000"
	}
	LogoutHandle = e => {
		sessionStorage.setItem("SignedIn", false)
		this.props.history.push({ pathName: "/" })
	}
	ModalOpener = () => {
		this.setState({ OpenModal: true })
	}
	ModalCloser = () => {
		this.setState({ OpenModal: false, DisplayMap: false })
	}
	LocSelector = e => {
		console.log(e.target.key)
		e.target.key === -1
			? navigator.geolocation.getCurrentPosition(position => {
					this.setState({
						CurrLoc: {
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						},
						CurrAddress: "Current Location",
					})
			  })
			: this.setState({
					CurrAddress: this.state.locations[e.target.key].city, // CurrAddress: this.state.addresses[e.target.key]
					//CurrLoc: this.state.locations[CurrAddress]
					OpenModal: false,
			  })
		let btns = document.querySelectorAll(".address > button")
		btns.map(btn => (btn.disable = false))
		document.querySelector(
			"li[key=" + e.target.key + "]>button"
		).disable = true
	}
	MapHandle = () => {
		this.setState({ DisplayMap: true })
	}
	NewLocHandle = (loc, address = "abyssus") => {
		this.setState({ CurrLoc: loc, CurrAddress: address })
		this.ModalCloser()
		/* let TempLocs = { ...this.state.locations, address: loc }
		this.setState({addresses:Object.keys(this.state.locations)})
		axios call */
	}
	render() {
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
									onClick={this.LogoutHandle}
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
								onClick={this.ServiceBtnHandle}
							>
								Barber
							</button>
							<hr />
							<button
								className="ServiceBtn"
								id="ServiceBtn2"
								onClick={this.ServiceBtnHandle}
							>
								Plumber
							</button>
							<hr />
							<button
								className="ServiceBtn"
								id="ServiceBtn3"
								onClick={this.ServiceBtnHandle}
							>
								Electrician
							</button>
							<hr />
							<button
								className="ServiceBtn"
								id="ServiceBtn4"
								onClick={this.ServiceBtnHandle}
							>
								Mechanic
							</button>
							<hr />
						</div>
						<div className="SearchBar">
							<button className="LocBtn" onClick={this.ModalOpener}>
								<i class="material-icons CompassIcon">explore</i>
								{this.state.CurrAddress}
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
					open={this.state.OpenModal}
					onClose={this.ModalCloser}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
					}}
				>
					<Fade in={this.state.OpenModal}>
						{!this.state.DisplayMap ? (
							<div className="LocModal">
								<ul>
									<li
										className="address"
										key={-1}
										onClick={this.LocSelector}
									>
										<button>
											<span className="material-icons pin">
												room
											</span>
											Current Location
										</button>
									</li>
									{this.state.locations.map(
										//once connected to backend this.state.addresses.map()
										(address, index) => (
											<li
												className="address"
												key={index}
												onClick={this.LocSelector}
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
								<button className="AddBtn" onClick={this.MapHandle}>
									<span className="material-icons add">
										add_circle
									</span>
									Add another address
								</button>
							</div>
						) : (
							<div className="MapParent">
								<div className="MapWrapper">
									<Map LocHandle={this.NewLocHandle} />
								</div>
							</div>
						)}
					</Fade>
				</Modal>
			</>
		)
	}
}

export default Navbar
