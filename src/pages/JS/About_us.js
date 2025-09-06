
import React from 'react';
import Navbar from './components/navbar';
import '../CSS/About_us.css';

const teamMembers = [
  {
    name: 'Ali Raza',
    role: 'Lead Developer',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Passionate about building tech for good. Leads the development and architecture.'
  },
  {
    name: 'Sara Khan',
    role: 'Health Advocate',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Connects with hospitals and donors, ensuring safe and ethical blood donation.'
  },
  {
    name: 'Usman Tariq',
    role: 'Volunteer Coordinator',
    img: 'https://randomuser.me/api/portraits/men/65.jpg',
    bio: 'Manages our volunteer network and community outreach.'
  },
];

const AboutUs = () => {
  return (
    <div className="about-wrapper">
      <Navbar />
      <div className="about-hero">
        <h1>About BloodBridge</h1>
        <p className="about-hero-desc">
          BloodBridge is a platform dedicated to connecting blood donors and recipients across Pakistan. Our mission is to save lives by making blood donation fast, safe, and accessible for everyone.
        </p>
      </div>
      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            To create a reliable, voluntary blood donor network that ensures safe and quick blood access whenever it's needed.
          </p>
        </section>
        <section className="about-section">
          <h2>Our Vision</h2>
          <p>
            A connected Pakistan where every person gets blood in time, with the help of a caring donor community.
          </p>
        </section>
        <section className="about-section">
          <h2>Why BloodBridge?</h2>
          <ul className="about-features">
            <li>Verified Donors</li>
            <li>Search by City & Blood Group</li>
            <li>Safe, Private Communication</li>
            <li>Fast Blood Requests</li>
            <li>Simple & Friendly App</li>
          </ul>
        </section>
        <section className="about-section">
          <h2>Meet Our Team</h2>
          <div className="about-team">
            {teamMembers.map((member, idx) => (
              <div className="team-card" key={idx}>
                <img src={member.img} alt={member.name} className="team-img" />
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <footer className="about-footer">
        © {new Date().getFullYear()} BloodBridge. All rights reserved.
      </footer>
    </div>
  );
};

export default AboutUs;
