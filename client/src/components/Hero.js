import { Link } from "react-router-dom"
import Button from "./Button"
import "./styles/Hero.css"

const Header = () => {
    return (
        <div className="hero-container">
            <h1>Listen/Jive/Relax - Musical Sharing</h1>
            <p>
                Upload your musical creations and listen in on others musical
                works!
            </p>
            <div className="hero-button-wrapper">
                <Link to="/register">
                    <Button className="solid-btn hero-btn">Register</Button>
                </Link>
                <Link to="/login">
                    <Button className="outline-btn hero-btn">Login</Button>
                </Link>
            </div>
        </div>
    )
}

export default Header
