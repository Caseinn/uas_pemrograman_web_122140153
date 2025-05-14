import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Phone,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-12 px-6 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary to-secondary opacity-90 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/20">
        {/* Brand Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Nel's Kitchen</h3>
          <p className="text-sm text-white/80">
            A digital platform to save, organize, and share delicious recipes
            with ease.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-md font-semibold mb-4 text-white/90">
            Navigation
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-white transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/recipes"
                className="hover:text-white transition-colors duration-200"
              >
                Recipes
              </Link>
            </li>
            <li>
              <Link
                to="#contact"
                className="hover:text-white transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div id="contact">
          <h4 className="text-md font-semibold mb-4 text-white/90">
            Contact Us
          </h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              Jakarta, Indonesia
            </li>
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-0.5 shrink-0" />
              support@nelskitchen.com
            </li>
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 mt-0.5 shrink-0" />
              +62 812 3456 7890
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-md font-semibold mb-4 text-white/90">
            Follow Us
          </h4>
          <div className="flex space-x-4 text-white/80 text-lg">
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-white transition-colors duration-200"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-white transition-colors duration-200"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-white transition-colors duration-200"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Email"
              className="hover:text-white transition-colors duration-200"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 py-6 text-center text-sm text-white/60">
        © {currentYear} Nel's Kitchen. All rights reserved.
      </div>
    </footer>
  );
}
