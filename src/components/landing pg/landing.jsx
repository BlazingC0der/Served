import React, { Component } from "react"
import bg from "../../images/tools.jpg"
import Logo from "../../images/served-white.png"
import "./landing.scss"
import SellerPic from "../../images/mechanic.jpg"
import BuyerPic from "../../images/phone.jpg"
import Modal from "@material-ui/core/Modal"
import Fade from "@material-ui/core/Fade"
import Backdrop from "@material-ui/core/Backdrop"

class Landing extends Component {
	constructor(props) {
		super(props)
		this.state = {
			OpenModal: true,
		}
	}
	ModalOpener = () => {
		this.setState({ OpenModal: true })
	}
	ModalCloser = () => {
		this.setState({ OpenModal: false })
	}
	onSignIn = googleUser => {
		var profile = googleUser.getBasicProfile()
		console.log(1)
		console.log("ID: " + profile.getId()) // Do not send to your backend! Use an ID token instead.
		console.log("Name: " + profile.getName())
		console.log("Image URL: " + profile.getImageUrl())
		console.log("Email: " + profile.getEmail()) // This is null if the 'email' scope is not present.
	}

	render() {
		return (
			<>
				<div className="header">
					<img src={Logo} alt="logo" className="Logo" />
					<p className="description">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
						natus alias.
					</p>
				</div>
				<img src={bg} alt="background" className="HeaderBg" />
				<div className="slope"></div>
				<div className="CardWrapper">
					<div className="card LoginCard">
						<img src={BuyerPic} alt="phone" className="CardImg" />
						<h1 className="CardTitle">Buyer</h1>
						<p className="CardTxt">
							Get your hair, plumbing, car repair and more done from the
							comfort of your home
						</p>
						<button className="LoginButton" onClick={this.ModalOpener}>
							Login
						</button>
					</div>
					<div className="card LoginCard seller">
						<img src={SellerPic} alt="mechanic" className="CardImg" />
						<h1 className="CardTitle">Seller</h1>
						<p className="CardTxt">Offer your services to earn money</p>
						<button
							className="LoginButton sell"
							onClick={this.ModalOpener}
						>
							Login
						</button>
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
						<div className="LoginModal">
							<h1 className="ModalTitle">Login</h1>
							<div className="g-signin2" data-onsuccess={this.onSignIn}></div>
						</div>
					</Fade>
				</Modal>
			</>
		)
	}
}

export default Landing
