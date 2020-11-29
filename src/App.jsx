import Navbar from "./components/Navbar/navbar"
import { Route, Switch } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"
import Logo from './images/served.png'
import "./App.scss"

function App() {
	return (
		<div className="App">
			<Navbar />
			<img src={Logo} alt="logo" className="BgLogo" />
			<Router>
				<Switch>
					<Route path="/" exact component="" />
					<Route path="/register" exact component="" />
					<Route path="/buyer" exact component="" />
					<Route path="/seller" exact component="" />
				</Switch>
			</Router>
		</div>
	)
}

export default App
