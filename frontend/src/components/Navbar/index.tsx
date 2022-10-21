import React from 'react'
import logo from '../../logo.svg'
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

export default function Navbar() {
    return (
        <div>
        <nav className="navbar navbar-expand-lg bg-light shadow">
            <div className="container">
                <ul className="nav">
                    <li className='nav-item d-flex justify-content-center align-items-center'>
                        <img src={logo} alt='' style={{ height: "30px" }} />
                    </li>
                    <li>
                        <Link to="/" className='nav-link'>Beranda</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    )
}