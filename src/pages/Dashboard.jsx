import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Landmark, ShieldCheck, FileText, ClipboardList, PlusCircle, Trash2, Printer, MapPin, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { builders, agents } from '../data/realestateData';

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'purchases';
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [bookings, setBookings] = useState([]);
  const [customListings, setCustomListings] = useState([]);
  
  // Custom Listing Form States
  const [pName, setPName] = useState('');
  const [pType, setPType] = useState('Flat');
  const [pSize, setPSize] = useState('');
  const [pPrice, setPPrice] = useState('');
  const [pPhone, setPPhone] = useState('');
  const [pEmail, setPEmail] = useState('');
  const [pWeb, setPWeb] = useState('');
  const [pLoc, setPLoc] = useState('');
  const [pDoc, setPDoc] = useState('');
  const [pDesc, setPDesc] = useState('');
  const [pPartnerType, setPPartnerType] = useState('builder');
  const [pPartnerId, setPPartnerId] = useState('b1');
  const [listingSubmitted, setListingSubmitted] = useState(false);

  // Active view receipt modal state
  const [activeReceipt, setActiveReceipt] = useState(null);

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('hubli_estate_bookings') || '[]');
    setBookings(savedBookings);

    // Load custom listings from localStorage
    const savedListings = JSON.parse(localStorage.getItem('hubli_estate_listings') || '[]');
    setCustomListings(savedListings);
  }, []);

  // Sync state if url tab changes
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSearchParams({ tab: tabName });
  };

  const handleAddListingSubmit = (e) => {
    e.preventDefault();
    if (!pName || !pSize || !pPrice || !pLoc) {
      alert('Please fill in mandatory fields: Name, Size, Price, and Location.');
      return;
    }

    const partnerName = pPartnerType === 'builder' 
      ? builders.find(b => b.id === pPartnerId)?.name 
      : agents.find(a => a.id === pPartnerId)?.name;

    const newListing = {
      id: 'custom-' + Date.now(),
      name: pName,
      type: pType,
      size: pSize,
      price: Number(pPrice) || 0,
      priceStr: isNaN(Number(pPrice)) ? pPrice : '₹' + (Number(pPrice)/100000).toFixed(0) + ' Lakhs',
      phone: pPhone || '-',
      email: pEmail || '-',
      website: pWeb || '-',
      location: pLoc,
      documentUrl: pDoc || '-',
      imageUrl: pType === 'Agricultural' 
        ? "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
        : pType === 'House' 
        ? "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80"
        : pType === 'Plot'
        ? "https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=800&q=80"
        : "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      associatedWith: partnerName || "Independent Listing",
      associationType: pPartnerType,
      associationId: pPartnerId,
      description: pDesc || `A premium listing of type ${pType} situated in the heart of ${pLoc}. Clear titles and verified broker connectivity.`
    };

    const currentListings = JSON.parse(localStorage.getItem('hubli_estate_listings') || '[]');
    currentListings.push(newListing);
    localStorage.setItem('hubli_estate_listings', JSON.stringify(currentListings));
    
    // update state
    setCustomListings(currentListings);
    setListingSubmitted(true);

    // reset form fields
    setPName('');
    setPSize('');
    setPPrice('');
    setPPhone('');
    setPEmail('');
    setPWeb('');
    setPLoc('');
    setPDoc('');
    setPDesc('');

    setTimeout(() => {
      setListingSubmitted(false);
      handleTabChange('listings');
    }, 3000);
  };

  const handleClearBooking = (bookingNumber) => {
    if (confirm('Are you sure you want to cancel this reservation and release the property lock?')) {
      const updated = bookings.filter(b => b.bookingNumber !== bookingNumber);
      localStorage.setItem('hubli_estate_bookings', JSON.stringify(updated));
      setBookings(updated);
    }
  };

  const handleClearListing = (id) => {
    if (confirm('Are you sure you want to delete this listing from the portal?')) {
      const updated = customListings.filter(l => l.id !== id);
      localStorage.setItem('hubli_estate_listings', JSON.stringify(updated));
      setCustomListings(updated);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Banner Block */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-2xs">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-slate-800">Marketplace Management</h1>
            <p className="text-slate-600 text-sm">Review your online purchase receipts, escrow reservations, and manage broker inventory listings.</p>
          </div>
          <button
            onClick={() => handleTabChange('add-listing')}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95"
          >
            <PlusCircle className="h-4.5 w-4.5" />
            Add New Property
          </button>
        </div>

        {/* Inner Dashboard Tabs */}
        <div className="flex border-b border-slate-200 shrink-0">
          <button
            onClick={() => handleTabChange('purchases')}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm tracking-wide border-b-2 transition-all cursor-pointer ${
              activeTab === 'purchases' 
                ? 'border-emerald-600 text-emerald-600 bg-emerald-50/10' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <ShieldCheck className="h-4.5 w-4.5" />
            <span>My Bookings / Purchases ({bookings.length})</span>
          </button>
          
          <button
            onClick={() => handleTabChange('listings')}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm tracking-wide border-b-2 transition-all cursor-pointer ${
              activeTab === 'listings' 
                ? 'border-emerald-600 text-emerald-600 bg-emerald-50/10' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <ClipboardList className="h-4.5 w-4.5" />
            <span>Agent Inventory ({customListings.length})</span>
          </button>
          
          <button
            onClick={() => handleTabChange('add-listing')}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm tracking-wide border-b-2 transition-all cursor-pointer ${
              activeTab === 'add-listing' 
                ? 'border-emerald-600 text-emerald-600 bg-emerald-50/10' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <PlusCircle className="h-4.5 w-4.5" />
            <span>List Property Form</span>
          </button>
        </div>

        {/* Core display panels */}
        {activeTab === 'purchases' && (
          bookings.length > 0 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {bookings.map((b) => (
                  <div key={b.bookingNumber} className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xs hover:shadow-xs transition-shadow">
                    
                    <div className="space-y-2 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                          {b.propertyType}
                        </span>
                        <span className="text-[9px] font-bold font-mono text-slate-400">Booking: {b.bookingNumber}</span>
                      </div>
                      <h3 className="font-extrabold text-slate-800 text-sm md:text-base leading-tight">{b.propertyName}</h3>
                      <p className="text-xs text-slate-400 flex items-center gap-0.5">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span>{b.propertyLocation}</span>
                      </p>
                      <p className="text-[10px] text-slate-500">Buyer: <span className="font-bold">{b.buyerName}</span> | PAN: <span className="font-mono">{b.buyerPan}</span></p>
                    </div>

                    <div className="flex flex-row md:flex-col justify-between md:items-end w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 gap-2">
                      <div className="text-left md:text-right font-mono">
                        <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wide">Paid Secured</span>
                        <p className="text-emerald-700 font-extrabold text-sm">{b.amountPaidStr}</p>
                        <p className="text-[9px] text-slate-400">{b.date}</p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setActiveReceipt(b)}
                          className="px-3 py-1.5 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 hover:bg-slate-50 cursor-pointer"
                        >
                          <FileText className="h-4 w-4" />
                          <span>Receipt</span>
                        </button>
                        <button
                          onClick={() => handleClearBooking(b.bookingNumber)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors border border-rose-100 cursor-pointer"
                          title="Release Booking"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white p-16 rounded-2xl border border-slate-200 text-center space-y-4 max-w-lg mx-auto">
              <HelpCircle className="h-12 w-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800 text-lg">No active purchases found</h3>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                You haven't made any property reservations or full payments on the portal yet. Browse our active properties, inspect documents, and reserve slots with a refundable booking escrow deposit.
              </p>
              <Link to="/properties" className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold text-xs hover:bg-emerald-700 transition-colors">
                Browse Properties
              </Link>
            </div>
          )
        )}

        {activeTab === 'listings' && (
          customListings.length > 0 ? (
            <div className="space-y-6">
              <p className="text-slate-500 text-xs">These properties were registered locally in this browser. To list them publicly, contact administration support.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {customListings.map((l) => (
                  <div key={l.id} className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 shadow-2xs items-start hover:shadow-xs transition-shadow">
                    
                    <div className="h-24 w-24 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                      <img src={l.imageUrl} alt={l.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="space-y-2 flex-grow min-w-0">
                      <div className="flex justify-between items-start">
                        <span className="text-[8px] uppercase font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-800 rounded border border-emerald-100">
                          {l.type}
                        </span>
                        <button
                          onClick={() => handleClearListing(l.id)}
                          className="text-rose-500 hover:text-rose-700 cursor-pointer p-0.5 hover:bg-rose-50 rounded"
                          title="Remove Listing"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <h3 className="font-extrabold text-slate-800 text-sm truncate">{l.name}</h3>
                      <p className="text-slate-400 text-[10px] truncate flex items-center gap-0.5">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span>{l.location}</span>
                      </p>
                      <div className="flex justify-between items-center text-[10px] pt-2 border-t border-slate-50">
                        <span className="text-slate-500 font-semibold font-mono truncate max-w-[120px]">{l.associatedWith}</span>
                        <span className="text-emerald-700 font-extrabold font-mono">{l.priceStr}</span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white p-16 rounded-2xl border border-slate-200 text-center space-y-4 max-w-lg mx-auto">
              <ClipboardList className="h-12 w-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800 text-lg">No custom listings</h3>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                As a developer or independent broker partner, you haven't listed any inventory on this local browser platform yet. Fill out the submission form to instantly register layout plots.
              </p>
              <button
                onClick={() => handleTabChange('add-listing')}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold text-xs hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                Register Your First Listing
              </button>
            </div>
          )
        )}

        {activeTab === 'add-listing' && (
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-2xs max-w-3xl">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-1.5">
                <PlusCircle className="h-5 w-5 text-emerald-600" />
                Submit Agent / Builder Listing
              </h2>
              <p className="text-slate-500 text-xs mt-1">Populate layout dimensions and associate the plot to an established local real estate partner.</p>
            </div>

            {listingSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-xl text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-extrabold text-emerald-800">Inventory Listed Successfully!</h3>
                <p className="text-slate-600 text-xs md:text-sm max-w-sm mx-auto leading-relaxed">
                  Your new real estate listing has been processed and saved into local storage. Redirecting you to your active inventory dashboard...
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddListingSubmit} className="space-y-6">
                
                {/* Partner and Property Type */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Partner Type *</label>
                    <select
                      value={pPartnerType}
                      onChange={(e) => {
                        setPPartnerType(e.target.value);
                        setPPartnerId(e.target.value === 'builder' ? builders[0].id : agents[0].id);
                      }}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      <option value="builder">Builder / Developer</option>
                      <option value="agent">Broker / Agent</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Managing Partner *</label>
                    <select
                      value={pPartnerId}
                      onChange={(e) => setPPartnerId(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      {pPartnerType === 'builder'
                        ? builders.map(b => <option key={b.id} value={b.id}>{b.name}</option>)
                        : agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)
                      }
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Property Category *</label>
                    <select
                      value={pType}
                      onChange={(e) => setPType(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      <option value="Flat">Flat / Apartment</option>
                      <option value="Plot">Residential Plot (Layout)</option>
                      <option value="House">Independent House / Villa</option>
                      <option value="Agricultural">Agricultural Farmland</option>
                      <option value="Building">Commercial Building</option>
                    </select>
                  </div>
                </div>

                {/* Name and Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Project Name / Title *</label>
                    <input
                      type="text"
                      required
                      value={pName}
                      onChange={(e) => setPName(e.target.value)}
                      placeholder="e.g., Bhavani Meadows Phase 2"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Address / Location *</label>
                    <input
                      type="text"
                      required
                      value={pLoc}
                      onChange={(e) => setPLoc(e.target.value)}
                      placeholder="e.g., Gokul Road near Airport, Hubli"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Size, Price, document */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Size / Dimensions *</label>
                    <input
                      type="text"
                      required
                      value={pSize}
                      onChange={(e) => setPSize(e.target.value)}
                      placeholder="e.g., 30x40 (1200 sq.ft) or 2 Acres"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Price (₹ in INR Numbers only) *</label>
                    <input
                      type="number"
                      required
                      value={pPrice}
                      onChange={(e) => setPPrice(e.target.value)}
                      placeholder="e.g., 2900000 (for ₹29 Lakhs)"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold font-mono focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">verification doc Link / brochure</label>
                    <input
                      type="url"
                      value={pDoc}
                      onChange={(e) => setPDoc(e.target.value)}
                      placeholder="e.g., https://originaldoc.com/rera.pdf"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden font-mono truncate"
                    />
                  </div>
                </div>

                {/* Direct Contacts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100 pt-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Phone contact *</label>
                    <input
                      type="tel"
                      value={pPhone}
                      onChange={(e) => setPPhone(e.target.value)}
                      placeholder="e.g., +91 80502 38777"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Email address</label>
                    <input
                      type="email"
                      value={pEmail}
                      onChange={(e) => setPEmail(e.target.value)}
                      placeholder="e.g., builder@neelgund.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Original Website</label>
                    <input
                      type="url"
                      value={pWeb}
                      onChange={(e) => setPWeb(e.target.value)}
                      placeholder="e.g., https://neelgund.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden font-mono truncate"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1 border-t border-slate-100 pt-4">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Detailed Listing Description</label>
                  <textarea
                    rows={4}
                    value={pDesc}
                    onChange={(e) => setPDesc(e.target.value)}
                    placeholder="Provide full landscape boundaries, municipal approvals, proximity details, and key project advantages..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden resize-none"
                  />
                </div>

                {/* Form Buttons */}
                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-extrabold text-xs shadow-md shadow-emerald-600/10 cursor-pointer active:scale-95"
                  >
                    Publish Listing Live
                  </button>
                </div>

              </form>
            )}
          </div>
        )}

      </div>

      {/* Pop-up view invoice receipt modal (Same design as checkout step 3) */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn text-left">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <div className="flex items-center gap-2">
                <Landmark className="h-5 w-5 text-emerald-600" />
                <h2 className="font-extrabold text-slate-800 text-base">Booking Escrow Certificate</h2>
              </div>
              <button 
                onClick={() => setActiveReceipt(null)}
                className="p-1.5 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto flex-grow space-y-6">
              
              {/* Receipt Visual layout */}
              <div id="print-dashboard-receipt" className="border border-slate-300/80 bg-slate-50/50 p-6 sm:p-8 rounded-2xl relative shadow-xs font-sans space-y-6">
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none opacity-5 pointer-events-none">
                  <Landmark className="h-72 w-72 text-emerald-800" />
                </div>

                <div className="flex justify-between items-start border-b-2 border-slate-200 pb-4">
                  <div className="text-left">
                    <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-base">
                      <Landmark className="h-5 w-5" />
                      <span>Hubli<span className="text-slate-800">Estate</span></span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Unified Property Portal, Hubballi-Dharwad</p>
                    <p className="text-[9px] text-slate-400 font-mono">support@hubliestate.com</p>
                  </div>
                  <div className="text-right space-y-1 font-mono">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wide">Receipt</span>
                    <p className="text-slate-800 text-xs font-extrabold">{activeReceipt.bookingNumber}</p>
                    <p className="text-slate-500 text-[9px]">{activeReceipt.date} | {activeReceipt.time}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white p-4 rounded-xl border border-slate-150 space-y-2">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Buyer Particulars</p>
                    <div className="space-y-1 font-medium text-slate-800">
                      <p className="font-bold">{activeReceipt.buyerName}</p>
                      <p className="font-mono text-[10px]">PAN: {activeReceipt.buyerPan}</p>
                      <p className="font-mono text-[10px]">Aadhaar: {activeReceipt.buyerAadhaar}</p>
                      <p className="text-[10px]">Email: {activeReceipt.buyerEmail}</p>
                      <p className="text-[10px]">Phone: {activeReceipt.buyerPhone}</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-150 space-y-2">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Property Particulars</p>
                    <div className="space-y-1 font-medium text-slate-800">
                      <p className="font-bold">{activeReceipt.propertyName}</p>
                      <p className="text-[10px]">Type: {activeReceipt.propertyType}</p>
                      <p className="text-[10px]">Location: {activeReceipt.propertyLocation}</p>
                      <p className="text-[10px] font-bold text-emerald-600">Quote: {activeReceipt.priceStr}</p>
                      <p className="text-[10px] text-slate-400">Developer/Broker: {activeReceipt.associatedWith}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 text-white rounded-xl p-4 font-mono text-xs flex justify-between items-center">
                  <div>
                    <span className="text-[9px] uppercase font-semibold text-slate-400 tracking-wider block">Escrow Settlement</span>
                    <p className="font-bold text-emerald-400 text-xs">{activeReceipt.paymentType}</p>
                    <p className="text-[9px] text-slate-400 mt-1">Transaction: {activeReceipt.transactionId}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase font-semibold text-slate-400 tracking-wider block">Amount Settled</span>
                    <p className="text-xl font-extrabold text-emerald-400">{activeReceipt.amountPaidStr}</p>
                    <p className="text-[9px] text-slate-400 mt-1">Method: {activeReceipt.paymentMethod}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400 leading-normal">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                    <span>RERA Karnataka Escrow Audited</span>
                  </div>
                  <p className="font-mono text-[9px] text-right">Certificate Hash: {activeReceipt.transactionId.replace('TXN-', 'SEC-')}</p>
                </div>

              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 shrink-0">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print Document</span>
                </button>
                <button
                  onClick={() => setActiveReceipt(null)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  Close View
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
