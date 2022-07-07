import React, { useState, useEffect } from "react"
import bg from "../../images/tools.jpg"
import Logo from "../../images/served-white.png"
import "./landing.css"
import SellerPic from "../../images/mechanic.jpg"
import BuyerPic from "../../images/phone.jpg"
import Modal from "@material-ui/core/Modal"
import Fade from "@material-ui/core/Fade"
import Backdrop from "@material-ui/core/Backdrop"
import { GoogleLogin } from "react-google-login"
import FacebookLogin from "react-facebook-login"

const Landing = (props) => {
	const [OpenModal, setOpenModal] = useState(false)

	useEffect(() => {
		if (localStorage.getItem("SignedIn")) {
			props.history.goBack()
		}
	}, [])

	const ModalOpener = () => {
		setOpenModal(true)
	}

	const ModalCloser = () => {
		setOpenModal(false)
	}

	const GoogleSignInHandle = googleUser => {
		console.log(googleUser)
		let profile = googleUser.getBasicProfile()
		if (localStorage.getItem("user") === null) {
			localStorage.setItem("user", profile.getId())
			props.history.push({
				pathName: "/register",
				state: { Name: profile.getName(), Email: profile.getEmail() },
			})
		} else {
			sessionStorage.setItem("SignedIn", true)
			props.history.replace({
				pathName: "/buyer",
				state: { Name: profile.getName(), Email: profile.getEmail() },
			})
		}
	}

	const FbSignInHandle = FbUser => {
		console.log(FbUser)
	}


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
					<button className="LoginButton" onClick={ModalOpener}>
						Login
					</button>
				</div>
				<div className="card LoginCard seller">
					<img src={SellerPic} alt="mechanic" className="CardImg" />
					<h1 className="CardTitle">Seller</h1>
					<p className="CardTxt">Offer your services to earn money</p>
					<button
						className="LoginButton sell"
						onClick={ModalOpener}
					>
						Login
					</button>
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
					<div className="LoginModal">
						<h1 className="ModalTitle">Login</h1>
						<GoogleLogin
							clientId="138218954242-q8dualdjvvdfbesve58tdco3en2c6cm9.apps.googleusercontent.com"
							buttonText="Login"
							onSuccess={GoogleSignInHandle}
							onFailure={GoogleSignInHandle}
							cookiePolicy={"single_host_origin"}
						/>
						<span>Or</span>
						<FacebookLogin
							appId="1088597931155576"
							autoLoad={true}
							fields="name,email,picture"
							//onClick={componentClicked}
							callback={FbSignInHandle}
						/>
					</div>
				</Fade>
			</Modal>
		</>
	)
}

export default Landing