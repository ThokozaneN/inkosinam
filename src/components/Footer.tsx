import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="text-3xl font-bold tracking-tighter">INkosinami Community Center</Link>
            <p className="text-gray-400 leading-relaxed">
              Restoring hope and dignity to vulnerable children through care, education, and community support.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-hope-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-hope-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-hope-blue transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['About Us', 'Our Programs', 'Impact Stories', 'Get Involved', 'Donate'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Programs</h4>
            <ul className="space-y-4">
              {['Cooked Meals', 'Homework Assistance', 'Life Skills', 'Holiday Programs'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={20} className="shrink-0 mt-1 text-hope-blue" />
                <span>123 Community Lane,<br />Soweto, South Africa</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={20} className="shrink-0 text-hope-blue" />
                <span>+27 12 345 6789</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={20} className="shrink-0 text-hope-blue" />
                <span>hello@inkosinam.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} INkosinami Community Center. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              NPO Registered: 123-456 NPO
            </span>
            <Link to="#" className="hover:text-white">Privacy Policy</Link>
            <Link to="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
