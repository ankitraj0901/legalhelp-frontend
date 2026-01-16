import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap"; // Keep 'Navbar' for Bootstrap component

export default function Header() {
  // Renamed from Navbar to Header

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div>
      {/* Use the imported Bootstrap component with its original name */}
      <Navbar bg="dark" variant="dark" expand="md" className="py-3">
        <Container>
          <Navbar.Brand href="/" className="fw-bold fs-4">
            LegalHelp
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/" className="mx-2">
                Home
              </Nav.Link>
              <Nav.Link href="#contact" className="mx-2">
                Contact
              </Nav.Link>
              {/* <Nav.Link href="#dashboard" className="mx-2">Dashboard</Nav.Link> */}
              <Nav.Link as={Link} to="/user/dashboard" className="mx-2">
                Dashboard
              </Nav.Link>
              {/* <Nav.Link href="#logout" className="mx-2">Logout</Nav.Link> */}
              <Button className="mx-2" onClick={logout}>
                Logout
              </Button>
              <Button variant="outline-light" className="ms-3">
                Book a Free Consultation
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
