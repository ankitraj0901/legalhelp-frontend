import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap'; // Keep 'Navbar' for Bootstrap component

export default function Header(){ // Renamed from Navbar to Header

   const navigate = useNavigate();

    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
    };

    return (
        <div>
            {/* Use the imported Bootstrap component with its original name */}
            <Navbar bg="dark" variant="dark" expand="md" className="py-3">
                <Container>
                    <Navbar.Brand href="/" className="fw-bold fs-4">LegalHelp</Navbar.Brand>
                    <Navbar.Toggle aria-controls="main-navbar-nav" />
                    <Navbar.Collapse id="main-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/" className="mx-2">Home</Nav.Link>
                            <Nav.Link href="#contact" className="mx-2">Contact</Nav.Link>
                            {/* <Nav.Link href="#dashboard" className="mx-2">Dashboard</Nav.Link> */}
                            <Nav.Link as={Link} to="/dashboard/user" className="mx-2">Dashboard</Nav.Link>
                            {/* <Nav.Link href="#logout" className="mx-2">Logout</Nav.Link> */}
                            <Button className="mx-2" onClick={logout}>Logout</Button>
                            <Button variant="outline-light" className="ms-3">Book a Free Consultation</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
// You will need to update where you import this component (e.g., in App.js) to import 'Header' instead of 'Navbar'.

// You will need to update where you import this component (e.g., in App.js) to import 'Header' instead of 'Navbar'.

// import React from 'react';
// // Note: This component assumes the 'navbar' styles are defined in 'styles.css'

// const Navbar = () => {
//     // You would use React Router's Link component here in a real application
//     const navLinks = [
//         { name: 'Home', path: '/' },
//         { name: 'About', path: '/about' },
//         { name: 'Services', path: '/services' },
//         { name: 'Login', path: '/login' },
//         { name: 'Contact', path: '/contact' },
//     ];

//     return (
//         <header className="navbar">
//             <div className="logo">LegalHelp</div>
//             <nav>
//                 <ul>
//                     {navLinks.map((link) => (
//                         <li key={link.name}>
//                             <a href={link.path}>{link.name}</a>
//                         </li>
//                     ))}
//                 </ul>
//             </nav>
//         </header>
//     );
// };

// export default Navbar;