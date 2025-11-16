// import React from "react";
// import { Navbar, Nav, Button, Container, Row, Col, Card } from 'react-bootstrap';

// export default function NavBar(){
//     return (
//         <div >
// {/* 1. Header & Navbar */}
//       <Navbar bg="dark" variant="dark" expand="md" className="py-3">
//         <Container>
//           <Navbar.Brand href="/" className="fw-bold fs-4">LegalHelp</Navbar.Brand>
//           <Navbar.Toggle aria-controls="main-navbar-nav" />
//           <Navbar.Collapse id="main-navbar-nav">
//             <Nav className="ms-auto"> {/* ms-auto pushes items to the right */}
//               <Nav.Link href="#services" className="mx-2">Services</Nav.Link>
//               <Nav.Link href="#how-it-works" className="mx-2">How It Works</Nav.Link>
//               <Nav.Link href="#about" className="mx-2">About Us</Nav.Link>
//               <Nav.Link href="#contact" className="mx-2">Contact</Nav.Link>
//               <Button variant="outline-light" className="ms-3">Book a Free Consultation</Button>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//       </div>
//     );
// }

import React from 'react';
// Note: This component assumes the 'navbar' styles are defined in 'styles.css'

const Navbar = () => {
    // You would use React Router's Link component here in a real application
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Login', path: '/login' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header className="navbar">
            <div className="logo">LegalHelp</div>
            <nav>
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a href={link.path}>{link.name}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;