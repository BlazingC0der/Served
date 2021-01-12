import "./navbar.scss"
import { NavLink } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"

const Display = props => (
	<div className="ParentWrapper">
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
				<Router>
					<NavLink to="#">
						<div className="ProfileBtnWrapper">
							<i className="material-icons UserIcon">account_circle</i>
							<button id="ProfileBtn" className="ProfileBtn">
								User
							</button>
						</div>
					</NavLink>
				</Router>
				<div className="LogoutBtnWrapper">
					<i className="material-icons PowerIcon">power_settings_new</i>
					<button id="LogoutBtn" className="LogoutBtn"></button>
				</div>
			</div>
		</div>
		<div className="ExtensionWrapper" id="ExtensionWrapper">
			<div className="SelectionBar">
				<hr />
				<button
					className="ServiceBtn"
					id="ServiceBtn1"
					/* onClick={() => props.ServiceBtnHandle()} */
				>
					Barber
				</button>
				<hr />
				<button
					className="ServiceBtn"
					id="ServiceBtn2"
					/* onClick={() => props.ServiceBtnHandle()} */
				>
					Plumber
				</button>
				<hr />
				<button
					className="ServiceBtn"
					id="ServiceBtn3"
					/* onClick={() => props.ServiceBtnHandle()} */
				>
					Electrician
				</button>
				<hr />
				<button
					className="ServiceBtn"
					id="ServiceBtn4"
					/* onClick={() => props.ServiceBtnHandle()} */
				>
					Mechanic
				</button>
				<hr />
			</div>
			<div className="SearchBar">
				<button className="LocBtn">
					<i class="material-icons CompassIcon">explore</i>Current Location
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
)

export default Display
