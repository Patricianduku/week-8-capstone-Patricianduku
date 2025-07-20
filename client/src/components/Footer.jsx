import React, { useState } from "react";
import { Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";
import tulizaLogo from "../assets/tuliza-logo.png";

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterStatus("");
    if (!newsletterEmail) {
      setNewsletterStatus("Please enter your email.");
      return;
    }
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      if (!res.ok) {
        setNewsletterStatus(data.message || "Signup failed. Please try again.");
      } else {
        setNewsletterStatus("Thank you for signing up!");
        setNewsletterEmail("");
      }
    } catch (err) {
      setNewsletterStatus("Signup failed. Please try again.");
    }
  };

  return (
    <footer className="w-full bg-primary-800 dark:bg-gray-950 text-white pt-6 pb-4 mt-8 md:pt-12 md:pb-8 md:mt-16 px-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        {/* Logo and Mission */}
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0 w-full md:w-auto">
          <img src={tulizaLogo} alt="Tuliza Logo" className="h-14 w-auto sm:h-28 max-h-12 sm:max-h-28 flex-shrink-0" />
          <span className="text-2xl font-bold tracking-wide">Tuliza</span>
          <span className="text-sm mt-2 text-gray-200">Find Your Calm</span>
          {/* Mini Mission Statement */}
          <span className="mt-2 text-xs text-gray-300 text-center md:text-left max-w-xs">Empowering Kenyan youth and communities with safe, stigma-free mental health support.</span>
        </div>
        {/* Quick Links, Contact, Newsletter, Language, Legal */}
        <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto justify-center md:justify-end items-center md:items-start">
          {/* Quick Links */}
          <div className="mb-4 md:mb-0">
            <h3 className="font-semibold mb-2 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary-400">Home</a></li>
              <li><a href="/journal" className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary-400">Journal</a></li>
              <li><a href="/support" className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary-400">Support Rooms</a></li>
              <li><a href="/resources" className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary-400">Resources</a></li>
            </ul>
          </div>
          {/* Contact */}
          <div className="mb-4 md:mb-0">
            <h3 className="font-semibold mb-2 text-lg">Contact</h3>
            <ul className="space-y-2">
              <li><a href="mailto:support@tuliza.co.ke" className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary-400">support@tuliza.co.ke</a></li>
              <li><a href="tel:1199" className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary-400">Emergency: 1199</a></li>
            </ul>
          </div>
          {/* Newsletter Signup */}
          <form className="mb-4 md:mb-0 flex flex-col items-center md:items-start w-full max-w-xs" onSubmit={handleNewsletterSubmit} aria-label="Newsletter Signup">
            <label htmlFor="newsletter" className="font-semibold mb-2 text-lg">Newsletter</label>
            <div className="flex w-full">
              <input id="newsletter" type="email" placeholder="Your email" className="w-full px-3 py-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-400" aria-label="Email address" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} />
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-400">Sign Up</button>
            </div>
            <span className="text-xs text-gray-300 mt-1">Get mental wellness tips and updates.</span>
            {newsletterStatus && (
              <span className="text-xs mt-1" style={{ color: newsletterStatus.startsWith("Thank") ? "lightgreen" : "salmon" }}>
                {newsletterStatus}
              </span>
            )}
          </form>
          {/* Legal Links */}
          <div className="mb-4 md:mb-0 flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-2 text-lg">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/privacy-policy" className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary-400">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary-400">Terms of Service</a></li>
              <li><a href="/cookie-policy" className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary-400">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
      {/* Accessibility Statement */}
      <div className="text-center text-xs mt-4 text-gray-300">
        <span>Accessibility: We are committed to making Tuliza usable for everyone. <a href="#" className="underline focus:outline-none focus:ring-2 focus:ring-primary-400">Learn more</a></span>
      </div>
      <div className="text-center text-xs mt-10 text-gray-300">
        &copy; {new Date().getFullYear()} Tuliza. All rights reserved.
      </div>
      {/* Social Media Icons - Bottom Right */}
      <div className="fixed bottom-4 right-4 flex space-x-4 z-50">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="bg-primary-700 hover:bg-primary-600 p-2 rounded-full shadow-lg transition-colors">
          <Facebook className="h-5 w-5 text-white" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="bg-primary-700 hover:bg-primary-600 p-2 rounded-full shadow-lg transition-colors">
          <Twitter className="h-5 w-5 text-white" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-primary-700 hover:bg-primary-600 p-2 rounded-full shadow-lg transition-colors">
          <Instagram className="h-5 w-5 text-white" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
