import React from "react";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import "../CSS/aa.css";

const Privacy = () => {
  // Function to scroll to a section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",

      });
    }
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <Navbar />
      </nav>

      <div className="background">
        <div className="top-content">
          <div className="text-section">
            <h2>Privacy Policy</h2>
            <p>
              Your privacy is important to us. We are committed to protecting
              your personal data and ensuring its confidentiality. By using our
              services, you agree to the collection and use of information as
              outlined in this policy.
            </p>

            <button
              type="button"
              className="content-button"
              onClick={() => scrollToSection("privacy-policy-container")}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="privacy-policy-container" id="privacy-policy-container">
        <h2 className="privacy-heading">
          <strong>Privacy Policy - WorldsOfEmanNasir.com</strong>
          <p className="privacy-date">Effective Date: March 2025</p>
        </h2>

        <p>
          <strong>
            WorldsOfEmanNasir.com is committed to protecting your privacy and
            ensuring the security of your data. This policy explains how we
            collect, use, and safeguard your information.
          </strong>
        </p>

        <h3>
          <strong>1. Information We Collect</strong>
        </h3>
        <p>
          <strong>Personal Information:</strong> When you sign up for an
          account, subscribe to our newsletter, or join the community, we may
          collect your name, email address, and other profile details.
        </p>
        <p>
          <strong>Usage Data:</strong> We may collect non-personal data such
          as your IP address, browser type, and usage behavior for analytics
          and website improvement.
        </p>
        <p>
          <strong>Content Submissions:</strong> Any fan art, fanfiction, or
          other materials you submit to the Creative Corner may be publicly
          displayed on the website.
        </p>

        <h3>
          <strong>2. How We Use Your Information</strong>
        </h3>
        <ul>
          <li>To provide and personalize your experience on the website.</li>
          <li>
            To send email updates about new chapters, community activities, or
            exclusive content.
          </li>
          <li>To analyze website performance and improve services.</li>
          <li>To showcase user-submitted content (with appropriate credit).</li>
        </ul>

        <h3>
          <strong>3. Sharing Your Information</strong>
        </h3>
        <p>
          <strong>We do NOT sell or share</strong> your personal data with third
          parties, except:
        </p>
        <ul>
          <li>When required by law or to comply with legal obligations.</li>
          <li>
            For website hosting and technical services, where third-party
            providers ensure data security.
          </li>
        </ul>

        <h3>
          <strong>4. Cookies and Tracking Technologies</strong>
        </h3>
        <p>
          <strong>We use cookies</strong> to enhance user experience, such as:
        </p>
        <ul>
          <li>Remembering login details</li>
          <li>Tracking chapter progress</li>
          <li>Improving overall usability</li>
        </ul>
        <p>
          **Note:** Users can disable cookies through their browser settings but
          may experience limited functionality.
        </p>

        <h3>
          <strong>5. Your Rights</strong>
        </h3>
        <ul>
          <li>You have the right to access, update, or delete your personal data.</li>
          <li>You can unsubscribe from newsletters or notifications at any time.</li>
          <li>Contact us at <strong>[Insert Contact Email]</strong> for privacy-related inquiries.</li>
        </ul>

        <h3>
          <strong>6. Data Security</strong>
        </h3>
        <p>
          <strong>We implement industry-standard encryption</strong> and security
          protocols to:
        </p>
        <ul>
          <li>Prevent unauthorized access</li>
          <li>Protect against data breaches</li>
        </ul>

        <p>
          For any privacy concerns, feel free to reach out to us at{" "}
          <strong>[Insert Contact Email]</strong>.
        </p>

        <h2 className="privacy-footer">
          <strong>Your Privacy Matters at WorldsOfEmanNasir.com</strong>
        </h2>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
