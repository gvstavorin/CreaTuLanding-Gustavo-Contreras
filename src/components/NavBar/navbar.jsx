import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import {CartWidget} from '../CartWidget/CartWidget'
import '../NavBar/navbar.css'

function Navbar() {
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
				<a href="/#">HOME</a>
				<a href="/#">OP 1</a>
				<a href="/#">OP 2</a>
				<a href="/#">OP 3</a>
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

export default Navbar;