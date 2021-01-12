import Navbar from "./components/navbar/navbar"
import { Route, Switch } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"
import Logo from "./images/served.png"
import "./App.scss"
import Footer from "./components/footer/footer"
import Landing from './components/landing pg/landing'

function App() {
	return (
		<>
			<div className="App">
				<Navbar />
				<img src={Logo} alt="logo" className="BgLogo" />
				<Router>
					<Switch>
						<Route path="/" exact component={Landing} />
						<Route path="/register" component="" />
						<Route path="/buyer" component="" />
						<Route path="/seller" component="" />
					</Switch>
				</Router>
			</div>
			<Footer />
		</>
	)
}

export default App
