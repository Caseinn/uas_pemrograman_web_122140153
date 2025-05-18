import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Phone,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-12 px-6 relative overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12 pb-12 border-b border-white/20">
        {/* Brand Info */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4">Nel's Kitchen</h3>
          <p className="text-sm text-white/80 max-w-xs">
            A digital platform to save, organize, and share delicious recipes
            with ease.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex-1">
          <h4 className="text-md font-semibold mb-4 text-white/90">
            Contact Us
          </h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              Jambi, Indonesia
            </li>
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-0.5 shrink-0" />
              ditorifki.irawan@gmail.com
            </li>
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 mt-0.5 shrink-0" />
              +62 822 XXXX XXXX
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex-1">
          <h4 className="text-md font-semibold mb-4 text-white/90">
            Follow Us
          </h4>
          <div className="flex space-x-4 text-white/80 text-lg">
            <a
              href="https://github.com/caseinn "
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-white transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/ditorifkii "
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white transition-colors duration-200"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/ditorifkiirawan "
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors duration-200"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="relative z-10 py-6 text-center text-sm text-white/60">
        © {currentYear} Nel's Kitchen. Made with Love.
      </div>
    </footer>
  );
}