import React from "react";
import "./Test.css";

// Helper component for service sections
const ServiceBlock = ({ title, description, link, ctaText, imagePath, reverse }) => (
 <div className={`service-block ${reverse ? "reverse" : ""}`}>
    <div className="text-content">
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link} className="block-cta-btn">
        {ctaText}
      </a>
    </div>
    <div className="image-content">
      <img src={imagePath} alt={title} />
    </div>
  </div>
);

const HomePage = () => {
  return (
    <div className="home-container">
      {/* --- Navbar --- */}
      <nav className="navbar">
        <div className="logo">LegalHelp</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Services</li>
          <li>Hire CA</li>
          <li>AI Tools</li>
          <li>About</li>
          <li>Contact</li>
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
            <button className="btn-primary">Get Started</button>
            <button className="btn-outline">Learn More</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="./taxLaw.jpg" alt="AI Finance" />
        </div>
      </section>

      {/* --- NEW: Service Selection Section (Pure CSS) --- */}
<section class="service-selection-section">
  <div class="container">
    <div class="text-center">
      <h2>Choose the Service That's Right for You</h2>
      <p>Whether you need expert guidance or powerful tools, we've got you covered.</p>
    </div>
    <div class="service-selection-grid">
      <div class="service-selection-card">
        <div class="icon-wrapper primary">
          <span class="material-symbols-outlined">groups</span>
        </div>
        <h3>Hire a Professional</h3>
        <p>Connect with our network of expert Chartered Accountants for personalized guidance and support.</p>
        <button class="primary-btn">Find Your Expert</button>
      </div>

      <div class="service-selection-card">
        <div class="icon-wrapper secondary">
          <span class="material-symbols-outlined">smart_toy</span>
        </div>
        <h3>Use AI Tools</h3>
        <p>Utilize our cutting-edge AI for fast, accurate, and cost-effective compliance and tax filing.</p>
        <button class="secondary-btn">Explore AI Tools</button>
      </div>
    </div>
  </div>
</section>


      {/* --- Transition Heading for Detailed Features --- */}
      <h2 className="section-transition-heading">
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
        />

        <ServiceBlock
          title="Future-Proof Financial Planning"
          description="Move beyond just tax filing. Get personalized financial blueprints covering investments, retirement planning, insurance, and wealth management from certified finance professionals."
          link="/finance-planning"
          ctaText="Start Planning Your Future"
          imagePath="./financePlanning.jpg"
          reverse={false}
        />

        <ServiceBlock
          title="Support for Law Related Issues"
          description="Need legal clarity on business formation, contracts, or financial disputes? Our network includes specialized legal advisors who can resolve your law-related issues efficiently."
          ctaText="Get Legal Consultation"
          imagePath="law.jpg"
          reverse={true}
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
                        Simplifying legal and financial services. Combining expert **CA consultation** with powerful **AI tools** for tax saving and compliance.
                    </p>
                    <p className="copyright">&copy; 2025 LegalHelp. All rights reserved.</p>
                </div>

                {/* 2. Core Services Links */}
                <div className="footer-column">
                    <h4>Our Services</h4>
                    <ul>
                        <li><a href="/predict-tax">Tax Prediction Tool</a></li>
                        <li><a href="/hire-ca">Hire Verified CA</a></li>
                        <li><a href="/tax-reduction">Tax Saving & Reduction</a></li>
                        <li><a href="/finance-planning">Financial Planning</a></li>
                        <li><a href="/legal-support">Law Related Issues</a></li>
                    </ul>
                </div>

                {/* 3. Company & Legal Links */}
                <div className="footer-column">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/careers">Careers (We're Hiring!)</a></li>
                        <li><a href="/blog">Resource Blog</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                        <li><a href="/terms">Terms of Service</a></li>
                    </ul>
                </div>

                {/* 4. Contact & Tech Stack (Trust Building) */}
                <div className="footer-column contact-column">
                    <h4>Contact & Support</h4>
                    <p>Email: <a href="mailto:support@legalhelp.in">support@legalhelp.in</a></p>
                    <p>Phone: +91 98765 43210</p>
                </div>

            </div>
            
            {/* Bottom Bar for Technology Info */}
            <div className="footer-bottom-bar">
                <p>Security powered by **Spring Security + JWT**. Financial intelligence driven by Python Machine Learning models.</p>
            </div>
        </footer>
    </div>
  );
};

export default HomePage;