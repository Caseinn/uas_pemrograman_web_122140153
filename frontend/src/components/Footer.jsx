import {
  Mail,
  MapPin,
  Phone,
  Instagram,
  Linkedin,
  Github,
  Heart,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-primary/95 via-primary to-primary/90 text-white">
      {/* Decorative accents */}
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10%] bottom-[-20%] h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 flex flex-col lg:flex-row gap-12">
        {/* Brand Info */}
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
            Nel's Kitchen
          </div>
          <h3 className="text-2xl font-bold">Cook, share, and savor</h3>
          <p className="text-sm text-white/80 max-w-sm leading-relaxed">
            A cozy corner of the internet to save, organize, and share the
            recipes that make your table feel like home.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex-1 space-y-4">
          <h4 className="text-md font-semibold text-white/90">Contact</h4>
          <ul className="space-y-3 text-sm text-white/85">
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
        <div className="flex-1 space-y-4">
          <h4 className="text-md font-semibold text-white/90">Follow</h4>
          <div className="flex space-x-4 text-white/85 text-lg">
            <a
              href="https://github.com/caseinn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-white transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/ditorifkii"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white transition-colors duration-200"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/ditorifkiirawan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors duration-200"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          <div className="rounded-xl bg-white/10 border border-white/15 p-4 space-y-2">
            <p className="text-sm text-white/80">
              Get occasional recipe drops and cooking notes.
            </p>
            <a
              href="mailto:ditorifki.irawan@gmail.com"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-white/90"
            >
              Say hello →
            </a>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="relative z-10 border-t border-white/15">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/70">
          <span>© {currentYear} Nel's Kitchen. All rights reserved.</span>
          <span className="inline-flex items-center gap-2">
            Crafted with <Heart className="h-4 w-4 text-white/90" /> and good food.
          </span>
        </div>
      </div>
    </footer>
  );
}
