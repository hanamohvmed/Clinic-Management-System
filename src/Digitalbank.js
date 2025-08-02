import React, { useState, useEffect } from 'react';
import { Menu, X, Smartphone, Shield, Zap, Users, ChevronRight } from 'lucide-react';
import './Digitalbank.css';

const Digitalbank = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Smartphone className="feature-icon" />,
      title: "Mobile Banking",
      description: "Complete banking experience in your pocket with our intuitive mobile app"
    },
    {
      icon: <Shield className="feature-icon" />,
      title: "Secure Payments",
      description: "Bank-grade security with advanced encryption for all your transactions"
    },
    {
      icon: <Zap className="feature-icon" />,
      title: "Instant Transfers",
      description: "Send money instantly to anyone, anywhere with just a few taps"
    },
    {
      icon: <Users className="feature-icon" />,
      title: "24/7 Support",
      description: "Round-the-clock customer service to help you with all your banking needs"
    }
  ];

  const articles = [
    {
      image: "/api/placeholder/300/200",
      title: "Digital Banking Revolution",
      description: "How modern technology is transforming the banking industry"
    },
    {
      image: "/api/placeholder/300/200",
      title: "Secure Online Payments",
      description: "Best practices for safe and secure digital transactions"
    },
    {
      image: "/api/placeholder/300/200",
      title: "Mobile Banking Tips",
      description: "Maximize your mobile banking experience with these expert tips"
    },
    {
      image: "/api/placeholder/300/200",
      title: "Future of Finance",
      description: "Exploring the next generation of financial services and innovations"
    }
  ];

  return (
    <div className="digitalbank">
      {/* Navigation */}
      <nav className={`navbar ${scrollY > 50 ? 'navbar-scrolled' : ''}`}>
        <div className="container">
          <div className="nav-content">
            <div className="nav-brand">
              <div className="brand-logo">
                <span className="brand-letter">D</span>
              </div>
              <span className="brand-name">DigitalBank</span>
            </div>
            
            <div className="nav-menu">
              <a href="#home" className="nav-link">Home</a>
              <a href="#services" className="nav-link">Services</a>
              <a href="#features" className="nav-link">Features</a>
              <a href="#contact" className="nav-link">Contact</a>
              <button className="btn btn-primary">
                Get Started
              </button>
            </div>

            <button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              <a href="#home" className="mobile-nav-link">Home</a>
              <a href="#services" className="mobile-nav-link">Services</a>
              <a href="#features" className="mobile-nav-link">Features</a>
              <a href="#contact" className="mobile-nav-link">Contact</a>
              <button className="btn btn-primary btn-full">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-heading">
                <h1 className="hero-title">
                  Next generation
                  <span className="hero-title-highlight">digital banking</span>
                </h1>
                <p className="hero-description">
                  Experience the future of banking with our innovative digital platform. 
                  Secure, fast, and designed for your modern lifestyle.
                </p>
              </div>
              
              <div className="hero-buttons">
                <button className="btn btn-primary btn-large btn-hover-scale">
                  Open Account
                </button>
                <button className="btn btn-secondary btn-large">
                  Learn More
                </button>
              </div>
            </div>

            <div className="hero-visual">
              <div className="phone-mockups">
                <div className="phone phone-1">
                  <div className="phone-content phone-dark">
                    <div className="phone-header">
                      <div className="phone-notch"></div>
                      <div className="phone-indicators">
                        <div className="indicator"></div>
                        <div className="indicator indicator-wide"></div>
                        <div className="indicator"></div>
                      </div>
                    </div>
                    
                    <div className="phone-body">
                      <div className="balance-card">
                        <div className="balance-label">Balance</div>
                        <div className="balance-amount">$12,450.00</div>
                      </div>
                      
                      <div className="action-buttons">
                        <div className="action-btn">
                          <div className="action-label">Send</div>
                        </div>
                        <div className="action-btn">
                          <div className="action-label">Receive</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="phone phone-2">
                  <div className="phone-content phone-light">
                    <div className="phone-header">
                      <div className="phone-notch phone-notch-light"></div>
                      <div className="phone-indicators">
                        <div className="indicator indicator-light"></div>
                        <div className="indicator indicator-wide indicator-light"></div>
                        <div className="indicator indicator-light"></div>
                      </div>
                    </div>
                    
                    <div className="phone-body">
                      <div className="transactions-title">Recent Transactions</div>
                      
                      <div className="transactions-list">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="transaction-item">
                            <div className="transaction-info">
                              <div className="transaction-icon"></div>
                              <div className="transaction-details">
                                <div className="transaction-name">Transfer</div>
                                <div className="transaction-date">Today</div>
                              </div>
                            </div>
                            <div className="transaction-amount">-$25.00</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="hero-bg-decoration"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why choose DigitalBank?</h2>
            <p className="section-description">
              We're revolutionizing banking with cutting-edge technology, unmatched security, 
              and customer-centric design that puts you in control.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="articles">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Latest Articles</h2>
            <p className="section-description">Stay updated with the latest trends in digital banking</p>
          </div>

          <div className="articles-grid">
            {articles.map((article, index) => (
              <div key={index} className="article-card">
                <div className="article-image"></div>
                <div className="article-content">
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-description">{article.description}</p>
                  <div className="article-link">
                    Read More <ChevronRight className="chevron-icon" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="brand-logo">
                  <span className="brand-letter">D</span>
                </div>
                <span className="brand-name">DigitalBank</span>
              </div>
              <p className="footer-description">
                Next generation digital banking for the modern world.
              </p>
            </div>

            <div className="footer-section">
              <h4 className="footer-title">Services</h4>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Personal Banking</a></li>
                <li><a href="#" className="footer-link">Business Banking</a></li>
                <li><a href="#" className="footer-link">Investments</a></li>
                <li><a href="#" className="footer-link">Loans</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-title">Company</h4>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">About Us</a></li>
                <li><a href="#" className="footer-link">Careers</a></li>
                <li><a href="#" className="footer-link">Press</a></li>
                <li><a href="#" className="footer-link">Blog</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-title">Support</h4>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Help Center</a></li>
                <li><a href="#" className="footer-link">Contact Us</a></li>
                <li><a href="#" className="footer-link">Security</a></li>
                <li><a href="#" className="footer-link">Privacy</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">© 2025 DigitalBank. All rights reserved.</p>
            <div className="footer-cta">
              <button className="btn btn-primary">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Digitalbank;