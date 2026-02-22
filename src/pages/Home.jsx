import "./Home.css";
import { Link, useNavigate } from "react-router-dom";

// Helper component for service sections
const ServiceBlock = ({
  title,
  description,
  link,
  ctaText,
  imagePath,
  reverse,
  onCtaClick,
}) => (
  <div className={`service-block ${reverse ? "reverse" : ""}`}>
    <div className="text-content">
      <h3>{title}</h3>
      <p>{description}</p>

      {/* CTA BUTTON */}
      {ctaText && (
        <button type="button" className="block-cta-btn" onClick={onCtaClick}>
          {ctaText}
        </button>
      )}
    </div>
    <div className="image-content">
      <img src={imagePath} alt={title} />
    </div>
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      {/* --- Navbar --- */}
      <nav className="navbar">
        <div className="logo">LegalHelp</div>

        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/service">Services</Link>
          </li>
          <li>
            <Link to="/user/dashboard/caList">Hire CA</Link>
          </li>
          <li>
            <Link to="/user/dashboard/tax-prediction">AI Tools</Link>
          </li>
          <li>
            <Link to="/user/dashboard">Dashboard</Link>
          </li>

          {/* 👇 Show LOGIN only if NOT logged in */}
          {!localStorage.getItem("token") && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}

          {/* 👇 Show LOGOUT only if logged in */}
          {localStorage.getItem("token") && (
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("role");
                  localStorage.removeItem("userId");
                  window.location.href = "/login"; // redirect
                }}
                className="logout-btn"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
      {/* --- Hero Section --- */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Simplify Tax Filing with <span>AI & Expert Help</span>
          </h1>
          <p>
            LegalHelp connects you with verified CAs or lets you use AI tools to
            predict taxes, optimize savings, and file returns seamlessly.
          </p>
          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => {
                navigate("login");
              }}
            >
              Get Started
            </button>
            <a href="#core_feature" className="btn-outline">
              Learn More
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img src="./taxLaw.jpg" alt="AI Finance" />
        </div>
      </section>

      {/* --- Service Selection Section  --- */}
      <section className="service-selection">
        <div className="service-container">
          <h2 className="service-title">
            Choose the Service That’s Right for You
          </h2>
          <p className="service-subtitle">
            Whether you need expert guidance or advanced tools, we’ve got you
            covered.
          </p>

          <div className="service-options">
            {/* Hire a Professional */}
            <div className="option-card">
              <div className="icon-wrapper primary">
                <span className="material-symbols-outlined">CA</span>
              </div>
              <h3>Hire a Professional</h3>
              <p>
                Connect with our network of Chartered Accountants for
                personalized support.
              </p>
              <button
                className="option-btn primary-btn"
                onClick={() => {
                  navigate("/user/dashboard/caList");
                }}
              >
                Find Your Expert
              </button>
            </div>

            {/* Use AI Tools */}
            <div className="option-card">
              <div className="icon-wrapper secondary">
                <span className="material-symbols-outlined">AI</span>
              </div>
              <h3>Use AI Tools</h3>
              <p>
                Utilize our AI-powered systems for fast, accurate, and
                cost-effective filing.
              </p>
              <button
                className="option-btn secondary-btn"
                onClick={() => {
                  navigate("/user/dashboard/tax-prediction");
                }}
              >
                Explore AI Tools
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- Transition Heading for Detailed Features --- */}
      <h2 className="section-transition-heading" id="core_feature">
        Explore Our Core Features
      </h2>
      <p className="section-transition-subheading">Select Your Goal</p>

      {/* --- Service Sections --- */}
      <section className="service-blocks-section">
        <ServiceBlock
          title="Maximize Tax Reduction & Savings"
          description="Don't just file taxes—optimize them. Our proprietary tools and expert guidance help you uncover every legal deduction and implement smart tax-saving strategies tailored for individuals and businesses."
          link="/tax-reduction"
          ctaText="Explore Tax Solutions"
          imagePath="./cover.jpg"
          reverse={false}
        />

        <ServiceBlock
          title="Hire Verified Chartered Accountants (CA)"
          description="From ITR filing and GST compliance to auditing and complex advisory, find the right expert for your needs. Every CA on our platform is thoroughly vetted for credentials and experience."
          link="/hire-ca"
          ctaText="Find Your Expert CA"
          imagePath="./tax4.jpg"
          reverse={true}
          onCtaClick={() => navigate("/user/dashboard/caList")}
        />

        <ServiceBlock
          title="Future-Proof Financial Planning"
          description="Move beyond just tax filing. Get personalized financial blueprints covering investments, retirement planning, insurance, and wealth management from certified finance professionals."
          link="/finance-planning"
          ctaText="Start Planning Your Future"
          imagePath="./financePlanning.jpg"
          reverse={false}
          onCtaClick={() => navigate("/user/dashboard/consultantList")}
        />

        <ServiceBlock
          title="Support for Law Related Issues"
          description="Need legal clarity on business formation, contracts, or financial disputes? Our network includes specialized legal advisors who can resolve your law-related issues efficiently."
          ctaText="Get Legal Consultation"
          imagePath="law.jpg"
          reverse={true}
          onCtaClick={() => navigate("/user/dashboard/lawyerList")}
        />

        {/* NOTE: The duplicated 'Maximize Tax Reduction & Savings' block previously here has been removed for page cleanliness. */}
      </section>

      {/* --- Trust Section --- */}
      <section className="trust-section">
        <h3>Trusted Guidance. Transparent Process. Total Savings.</h3>
        <div className="feature-cards">
          <div className="card">
            <span className="icon">💰</span>
            <h4>Guaranteed Savings</h4>
            <p>Proven strategies to reduce your tax liability legally.</p>
          </div>
          <div className="card">
            <span className="icon">✅</span>
            <h4>100% Compliance</h4>
            <p>Never miss a deadline or face penalties again.</p>
          </div>
          <div className="card">
            <span className="icon">🌟</span>
            <h4>5-Star Experts</h4>
            <p>Connect only with top-rated CAs and legal advisors.</p>
          </div>
        </div>
        <a href="/about" className="learn-more-btn">
          Learn More About LegalHelp
        </a>
      </section>

      {/* --- Footer --- */}
      <footer className="site-footer">
        <div className="footer-container">
          {/* 1. Brand and Mission */}
          <div className="footer-column brand-column">
            <h3 className="footer-logo">LegalHelp</h3>
            <p className="mission-statement">
              Simplifying legal and financial services. Combining expert **CA
              consultation** with powerful **AI tools** for tax saving and
              compliance.
            </p>
            <p className="copyright">
              &copy; 2026 LegalHelp. All rights reserved.
            </p>
          </div>

          {/* 2. Core Services Links */}
          <div className="footer-column">
            <h4>Our Services</h4>
            <ul>
              <li>
                <a href="/predict-tax">Tax Prediction Tool</a>
              </li>
              <li>
                <a href="/hire-ca">Hire Verified CA</a>
              </li>
              <li>
                <a href="/tax-reduction">Tax Saving & Reduction</a>
              </li>
              <li>
                <a href="/finance-planning">Financial Planning</a>
              </li>
              <li>
                <a href="/legal-support">Law Related Issues</a>
              </li>
            </ul>
          </div>

          {/* 3. Company & Legal Links */}
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/careers">Careers (We're Hiring!)</a>
              </li>
              <li>
                <a href="/blog">Resource Blog</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* 4. Contact & Tech Stack (Trust Building) */}
          <div className="footer-column contact-column">
            <h4>Contact & Support</h4>
            <p>
              Email:{" "}
              <a href="mailto:support@legalhelp.in">support@legalhelp.dev</a>
            </p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </div>

        {/* Bottom Bar for Technology Info */}
        <div className="footer-bottom-bar">
          <p>
            Security powered by **Spring Security + JWT**. Financial
            intelligence driven by Python Machine Learning models.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
