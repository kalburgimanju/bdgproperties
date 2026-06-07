import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, ExternalLink, ShieldCheck, FileText, ArrowLeft, ArrowUpRight, Share2, HelpCircle } from 'lucide-react';
import { properties } from '../data/realestateData';
import PurchaseCheckout from './PurchaseCheckout';

export default function PropertyDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const found = properties.find(p => p.id === id);
    setProperty(found || null);
    
    // Auto open checkout if book=true param exists in URL
    if (searchParams.get('book') === 'true') {
      setCheckoutOpen(true);
    }
  }, [id, searchParams]);

  if (!property) {
    return (
      <div className="bg-slate-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-md mx-auto space-y-4 bg-white p-8 rounded-xl border border-slate-200 shadow-xs">
          <HelpCircle className="h-12 w-12 text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold text-slate-800">Property Not Found</h2>
          <p className="text-slate-600 text-sm">We couldn't locate any property matching the ID "{id}". It may have been removed or sold.</p>
          <Link to="/properties" className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 text-sm">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Back Link */}
        <Link to="/properties" className="inline-flex items-center gap-1 text-slate-600 hover:text-emerald-600 font-semibold text-sm group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Listings</span>
        </Link>

        {/* Title, Badge & Sharing toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded">
                {property.type}
              </span>
              <span className="text-[10px] uppercase font-extrabold bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-600" /> Verified Listing
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">{property.name}</h1>
            <p className="flex items-center gap-1 text-slate-500 text-sm">
              <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
              <span>{property.location}</span>
            </p>
          </div>

          <div className="flex gap-2 w-full md:w-auto shrink-0">
            <button 
              onClick={handleShare}
              className="flex-1 md:flex-initial flex items-center justify-center gap-1 px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span>{copied ? 'Copied Link!' : 'Share Page'}</span>
            </button>
            <button 
              onClick={() => setCheckoutOpen(true)}
              className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-md hover:shadow-emerald-600/10 transition-all cursor-pointer active:scale-95"
            >
              Secure / Buy Now
            </button>
          </div>
        </div>

        {/* Grid: Image, Key info, Description & Partner detail card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main info (left col spans 2) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Main Visual Image container */}
            <div className="h-96 md:h-[450px] bg-slate-200 rounded-2xl overflow-hidden relative shadow-xs border border-slate-200">
              <img 
                src={property.imageUrl} 
                alt={property.name} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quick Metrics grid */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 grid grid-cols-2 md:grid-cols-3 gap-6 divide-x-0 md:divide-x divide-slate-100">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Asking Price</p>
                <p className="text-2xl font-extrabold text-slate-800 font-mono mt-1">{property.priceStr}</p>
              </div>
              <div className="md:pl-6">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Dimension / Size</p>
                <p className="text-xl font-extrabold text-slate-800 font-mono mt-1">{property.size}</p>
              </div>
              <div className="col-span-2 md:col-span-1 md:pl-6">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Verification Status</p>
                <p className="text-sm font-bold text-emerald-600 flex items-center gap-1 mt-2.5">
                  <ShieldCheck className="h-4.5 w-4.5" /> Title Clear (RERA)
                </p>
              </div>
            </div>

            {/* In-depth Description */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h2 className="font-extrabold text-slate-800 text-lg">Property Overview</h2>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{property.description}</p>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-500 leading-relaxed">
                <p className="font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" /> Buyer Security Guarantee
                </p>
                As a client on HubliEstate, your initial booking fee (₹50,000) is held securely in escrow until original document verification is completed by your legal council. Full refund is guaranteed in case of any title-clear issues.
              </div>
            </div>

          </div>

          {/* Sidebar right col (Associated Partner card & actions) */}
          <div className="space-y-6">
            
            {/* 1. Associated Broker/Developer Info */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">Listing Managed By</span>
                <h3 className="font-extrabold text-slate-800 text-lg mt-0.5">{property.associatedWith || "Independent Broker"}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase inline-block mt-1 ${
                  property.associationType === 'builder' 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-sky-100 text-sky-800 border border-sky-200'
                }`}>
                  {property.associationType === 'builder' ? 'Developer / Builder' : 'RERA Agent'}
                </span>
              </div>

              {/* Direct Contacts */}
              <div className="space-y-4 text-xs">
                {property.phone && property.phone !== '-' && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-slate-400 font-semibold">Phone Contact</p>
                      <a href={`tel:${property.phone}`} className="text-slate-800 font-bold hover:text-emerald-600 font-mono">{property.phone}</a>
                    </div>
                  </div>
                )}

                {property.email && property.email !== '-' && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-slate-400 font-semibold">Email Inquiry</p>
                      <a href={`mailto:${property.email}`} className="text-slate-800 font-bold hover:text-emerald-600 font-mono break-all">{property.email}</a>
                    </div>
                  </div>
                )}

                {property.website && property.website !== '-' && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                      <Globe className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-slate-400 font-semibold">Official Website</p>
                      <a href={property.website} target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold hover:underline flex items-center gap-1 break-all">
                        <span>Visit Site</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Document Link / Visual verification */}
              {property.documentUrl && property.documentUrl !== '-' && (
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Original Documents & Videos</p>
                  <a 
                    href={property.documentUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full py-2 px-3 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/50 text-emerald-800 rounded-lg flex items-center justify-between font-semibold text-xs transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <FileText className="h-4 w-4" />
                      <span>Verify Catalog / Walkthrough</span>
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                  </a>
                </div>
              )}

              {/* View profile button */}
              <Link 
                to={`/directory/${property.associationId}?type=${property.associationType}`}
                className="w-full py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold text-xs rounded-lg transition-colors text-center block"
              >
                View Partner Portfolio
              </Link>

            </div>

            {/* 2. Escrow Booking panel */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4 text-center">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-emerald-400">Escrow Secure Option</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Secure your slot in this high-demand Hubli property. Lock this rate and reserve immediate physical layout site visit with the managing representative.
              </p>
              
              <div className="p-3 bg-slate-800 rounded-xl font-mono text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Reservation Fee</span>
                <p className="text-xl font-extrabold text-white">₹50,000</p>
              </div>

              <button 
                onClick={() => setCheckoutOpen(true)}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg text-xs transition-colors active:scale-95 shadow-md cursor-pointer"
              >
                Book Escrow Reservation
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Online Booking Simulation modal */}
      <PurchaseCheckout 
        isOpen={checkoutOpen} 
        onClose={() => {
          setCheckoutOpen(false);
          // clear book state from URL if it was there
          if (searchParams.get('book') === 'true') {
            navigate(`/properties/${id}`);
          }
        }} 
        property={property} 
      />

    </div>
  );
}
