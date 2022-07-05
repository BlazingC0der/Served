import Navbar from "./components/navbar/navbar"
import { Route, Switch } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"
import Logo from "./images/served.png"
import "./App.scss"
import Footer from "./components/footer/footer"
import Landing from "./components/landing pg/landing"
import BuyerMain from './components/buyer/buyerMain'
import Services from "./components/buyer/services"

function App() {
	return (
		<>
			<div className="App">
				<Router>
					<Navbar />
					<img src={Logo} alt="logo" className="BgLogo" />
					{/* <Services /> */}
					<Switch>
						<Route path="/" exact component={Landing} />
						<Route path="/register" component="" />
						<Route path="/buyer" component={BuyerMain} />
						<Route path="/seller" component="" />
					</Switch>
				</Router>
				<Footer />
			</div>
		</>
	)
}

export default App
