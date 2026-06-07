import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Phone, Mail, Globe, MapPin, ArrowLeft, Building2, Users2, ShieldCheck, MailCheck, HelpCircle } from 'lucide-react';
import { builders, agents, getPropertiesByAssociation } from '../data/realestateData';

export default function DirectoryDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'builder'; // default to builder

  const [partner, setPartner] = useState(null);
  const [partnerProperties, setPartnerProperties] = useState([]);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let found = null;
    if (type === 'builder') {
      found = builders.find(b => b.id === id);
    } else {
      found = agents.find(a => a.id === id);
    }
    setPartner(found || null);

    if (found) {
      const associated = getPropertiesByAssociation(id, type);
      setPartnerProperties(associated);
    }
  }, [id, type]);

  if (!partner) {
    return (
      <div className="bg-slate-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-md mx-auto space-y-4 bg-white p-8 rounded-xl border border-slate-200 shadow-xs">
          <HelpCircle className="h-12 w-12 text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold text-slate-800">Partner Not Found</h2>
          <p className="text-slate-600 text-sm">We couldn't locate any developer or agent profile matching ID "{id}" under type "{type}".</p>
          <Link to="/directory" className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 text-sm">
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setInquiryName('');
      setInquiryPhone('');
      setInquiryEmail('');
      setInquiryMsg('');
    }, 4000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation back bar */}
        <Link to="/directory" className="inline-flex items-center gap-1 text-slate-600 hover:text-emerald-600 font-semibold text-sm group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Partner Directory</span>
        </Link>

        {/* Profile Card Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center shadow-xs">
          
          <div className="h-28 w-28 md:h-36 md:w-36 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border border-slate-150">
            <img 
              src={partner.imageUrl} 
              alt={partner.name} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4 flex-grow">
            <div className="space-y-1">
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded uppercase border inline-block ${
                type === 'builder' 
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                  : 'bg-sky-100 text-sky-800 border-sky-200'
              }`}>
                {type === 'builder' ? 'Developer / Builder' : 'RERA Registered Broker'}
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">{partner.name}</h1>
              <p className="text-slate-500 text-xs md:text-sm flex items-center gap-1">
                <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                <span>{partner.address}</span>
              </p>
            </div>
            
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed max-w-3xl">
              {partner.description}
            </p>

            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
              {partner.phone && partner.phone !== '-' && (
                <span className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg font-mono">
                  Phone: {partner.phone}
                </span>
              )}
              {partner.email && partner.email !== '-' && (
                <span className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg font-mono">
                  Email: {partner.email}
                </span>
              )}
              {partner.website && partner.website !== '-' && (
                <a href={partner.website} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 text-emerald-800 rounded-lg flex items-center gap-1">
                  <span>Visit Website</span>
                  <Globe className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Listings Portfolio vs Contact Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Portfolio list (Grid spans 2) */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-extrabold text-slate-800 border-b border-slate-200 pb-3">
              Listings Portfolio ({partnerProperties.length})
            </h2>

            {partnerProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {partnerProperties.map((p) => (
                  <div key={p.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col group text-left justify-between">
                    
                    <div className="h-40 overflow-hidden relative shrink-0">
                      <img 
                        src={p.imageUrl} 
                        alt={p.name} 
                        className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-md uppercase">
                        {p.type}
                      </div>
                    </div>

                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div className="space-y-1 mb-4">
                        <h3 className="font-bold text-slate-800 text-sm group-hover:text-emerald-600 transition-colors line-clamp-1">{p.name}</h3>
                        <p className="text-slate-400 text-[10px] font-medium flex items-center gap-0.5">
                          <MapPin className="h-3 w-3 shrink-0" />
                          <span>{p.location}</span>
                        </p>
                      </div>

                      <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-xs">
                        <div>
                          <span className="text-slate-400 text-[9px] uppercase font-bold tracking-wide block">Size</span>
                          <span className="text-slate-700 font-bold font-mono">{p.size}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-emerald-600 text-[9px] uppercase font-bold tracking-wide block">Price</span>
                          <span className="text-slate-800 font-extrabold font-mono">{p.priceStr}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 border-t border-slate-100 shrink-0">
                      <Link 
                        to={`/properties/${p.id}`}
                        className="w-full py-1.5 bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-bold rounded-lg text-xs text-center block"
                      >
                        View Details
                      </Link>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-3">
                {type === 'builder' ? <Building2 className="h-10 w-10 text-slate-300 mx-auto" /> : <Users2 className="h-10 w-10 text-slate-300 mx-auto" />}
                <h3 className="font-bold text-slate-800 text-sm">No active listings listed</h3>
                <p className="text-slate-500 text-xs">This partner currently does not have any properties listed directly in our online catalogue. Reach out below to request general layout brochures.</p>
              </div>
            )}
          </div>

          {/* Contact Form Sidebar */}
          <div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-150 pb-3">
                <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-1">
                  <MailCheck className="h-4.5 w-4.5 text-emerald-600" />
                  Inquire Directly
                </h3>
                <p className="text-slate-500 text-xs mt-1">Get custom quotes or reserve brochure bundles directly from the firm.</p>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl text-center space-y-2 animate-fadeIn">
                  <ShieldCheck className="h-10 w-10 text-emerald-600 mx-auto" />
                  <h4 className="font-extrabold text-emerald-800 text-sm">Inquiry Sent Successfully</h4>
                  <p className="text-slate-600 text-xs">
                    Your request has been forwarded directly to {partner.name}. A representative will contact you via phone or email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="e.g., Manjunath K"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      placeholder="e.g., +91 99450 00000"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Email Address</label>
                    <input
                      type="email"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="e.g., customer@gmail.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Message details</label>
                    <textarea
                      rows={3}
                      value={inquiryMsg}
                      onChange={(e) => setInquiryMsg(e.target.value)}
                      placeholder="I'm interested in layout plots or farmland..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-emerald-600 text-white font-bold rounded-lg text-xs hover:bg-emerald-700 transition-colors cursor-pointer shadow-xs active:scale-95"
                  >
                    Submit Callback Request
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
