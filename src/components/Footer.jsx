import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Mail, Phone, MapPin, ExternalLink, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <Landmark className="h-6 w-6 text-emerald-500" strokeWidth={2.5} />
              <span>Hubli<span className="text-emerald-500">Estate</span></span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              HubliEstate is the premier real estate marketplace consolidating Hubli-Dharwad's finest properties, builders, and agents onto a single transparent platform. Browse land, residential villas, apartments, or plots, and reserve your dream property securely online.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-emerald-400 transition-colors">Browse Properties</Link>
              </li>
              <li>
                <Link to="/directory" className="hover:text-emerald-400 transition-colors">Agents & Builders</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-emerald-400 transition-colors">Customer Dashboard</Link>
              </li>
              <li>
                <Link to="/dashboard?tab=add-listing" className="hover:text-emerald-400 transition-colors">List Your Property</Link>
              </li>
            </ul>
          </div>

          {/* Property Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Property Types</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/properties?type=Agricultural" className="hover:text-emerald-400 transition-colors">Agricultural Farmland</Link>
              </li>
              <li>
                <Link to="/properties?type=House" className="hover:text-emerald-400 transition-colors">Houses & Villas</Link>
              </li>
              <li>
                <Link to="/properties?type=Plot" className="hover:text-emerald-400 transition-colors">Residential Plots</Link>
              </li>
              <li>
                <Link to="/properties?type=Flat" className="hover:text-emerald-400 transition-colors">Apartments & Flats</Link>
              </li>
              <li>
                <Link to="/properties?type=Building" className="hover:text-emerald-400 transition-colors">Commercial Buildings</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Marketplace Office</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Gokul Road & Vidya Nagar, Hubballi, Karnataka, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>+91 99450 24417 / 80502 38777</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>support@hubliestate.com</span>
              </li>
              <li className="flex items-center gap-2 pt-2">
                <Globe className="h-4 w-4 text-emerald-500 shrink-0" />
                <a href="https://www.accio.com/work/doc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-emerald-400 text-xs">
                  <span>accio.com/work/doc</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} HubliEstate Marketplace. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Hubli-Dharwad RERA Info</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
