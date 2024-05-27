import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import {CartWidget} from '../../CartWidget/CartWidget'
import {Link, NavLink} from 'react-router-dom'
import './navbar.css'

function NavBar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
			<h3>LOGO</h3>
			<nav ref={navRef}>
				<Link to="/">HOME</Link>
				<Link to="/categoria/electronica">Electronica</Link>
				<Link to="/categoria/mens">Ropa Hombre</Link>
				<Link to="/categoria/womens">Ropa Mujer</Link>
				<Link to="/categoria/joyeria">Joyas</Link>
				<Link to="/carrito">Carrito</Link>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			
				<CartWidget/>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
			
		</header>
	);
}

export default NavBar;