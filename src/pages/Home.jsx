import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, Sparkles, Building2, UserCheck, ShieldCheck, CreditCard, ChevronRight, Landmark } from 'lucide-react';
import { getFeaturedProperties, builders, agents } from '../data/realestateData';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const navigate = useNavigate();

  const featured = getFeaturedProperties();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    let url = '/properties';
    const params = [];
    if (searchQuery) params.push(`search=${encodeURIComponent(searchQuery)}`);
    if (selectedType !== 'All') params.push(`type=${selectedType}`);
    if (params.length > 0) url += `?${params.join('&')}`;
    navigate(url);
  };

  const propertyTypes = [
    { name: 'Agricultural', label: 'Farmland', desc: 'Fertile lands near highways', count: 5, bg: 'from-emerald-500 to-teal-600', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80' },
    { name: 'House', label: 'Villas & Houses', desc: 'Premium luxury independent homes', count: 2, bg: 'from-blue-500 to-indigo-600', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80' },
    { name: 'Plot', label: 'NA Plots', desc: 'RERA approved plotting layouts', count: 5, bg: 'from-amber-500 to-orange-600', img: 'https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=400&q=80' },
    { name: 'Flat', label: 'Flats & Apartments', desc: 'Modern living in central Hubli', count: 7, bg: 'from-purple-500 to-pink-600', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* 1. Hero Section */}
      <div className="relative bg-slate-900 overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80" 
            alt="Real estate background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-left space-y-8">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            Hubli-Dharwad's First Unified Property Portal
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none max-w-3xl">
            Find & Purchase Your Next <span className="text-emerald-500">Premium Property</span> in Hubli
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal">
            Consolidating top properties, verified builders, and expert agents onto a single transparent dashboard. Secure your reservation online today!
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="bg-white p-3 sm:p-4 rounded-2xl shadow-xl max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by location, project, builder, agent..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
              />
            </div>

            <div className="md:col-span-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm font-medium cursor-pointer"
              >
                <option value="All">All Property Types</option>
                <option value="Agricultural">Agricultural Land</option>
                <option value="House">Houses & Villas</option>
                <option value="Plot">Plots (NA/Layout)</option>
                <option value="Flat">Flats & Apartments</option>
                <option value="Building">Commercial Buildings</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-md hover:shadow-emerald-600/20 flex justify-center items-center gap-2 text-sm active:scale-98"
              >
                <Search className="h-4 w-4" />
                Find Properties
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 2. Quick stats bar */}
      <div className="bg-white py-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-slate-200">
            <div>
              <p className="text-3xl font-extrabold text-emerald-600">20+</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Verified Listings</p>
            </div>
            <div className="border-l md:border-l-0 border-slate-100">
              <p className="text-3xl font-extrabold text-slate-800">9+</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Premium Builders</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-800">8+</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Local Broker Partners</p>
            </div>
            <div className="border-l md:border-l-0 border-slate-100">
              <p className="text-3xl font-extrabold text-emerald-600">100%</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">RERA & Document Verified</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Core Features / Why Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl font-bold text-slate-800">Why Choose HubliEstate?</h2>
          <p className="text-slate-600">The modern real estate purchase journey, tailored specifically for the Hubli-Dharwad market.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-left hover:border-emerald-500/50 transition-colors">
            <div className="p-3 bg-emerald-50 rounded-xl w-fit text-emerald-600">
              <Landmark className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Single Unified Platform</h3>
            <p className="text-slate-600 text-sm leading-relaxed">No more juggling multiple brokers or directories. Find top builders (Bhavani, Neelgund, Koravi) and local agents in one spot.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-left hover:border-emerald-500/50 transition-colors">
            <div className="p-3 bg-emerald-50 rounded-xl w-fit text-emerald-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Document & RERA Verified</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Every listing is cross-checked. Easily view project catalogs, layout drawings, and original RERA documents/brochures directly.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-left hover:border-emerald-500/50 transition-colors">
            <div className="p-3 bg-emerald-50 rounded-xl w-fit text-emerald-600">
              <UserCheck className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Direct Agent/Builder Contact</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Direct connection info with zero hidden fees. View original websites, emails, and direct phone numbers to speak to specialists.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-left hover:border-emerald-500/50 transition-colors">
            <div className="p-3 bg-emerald-50 rounded-xl w-fit text-emerald-600">
              <CreditCard className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Online Reservation/Purchase</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Instantly book or lock in premium plots, villas, or flats with a secure booking fee, and generate a certified payment receipt.</p>
          </div>
        </div>
      </div>

      {/* 4. Browse by Property Type */}
      <div className="bg-slate-100/50 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div className="space-y-2 text-left">
              <h2 className="text-3xl font-bold text-slate-800">Explore by Category</h2>
              <p className="text-slate-600">Browse customized listings for your specific investment strategy.</p>
            </div>
            <Link to="/properties" className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1 group text-sm">
              View All Properties
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {propertyTypes.map((type) => (
              <Link 
                key={type.name} 
                to={`/properties?type=${type.name}`}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all text-left block"
              >
                <div className="h-40 relative overflow-hidden">
                  <img 
                    src={type.img} 
                    alt={type.label} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-bold text-lg leading-tight">{type.label}</p>
                    <p className="text-xs text-slate-200 mt-0.5">{type.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Featured Properties Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-2 text-left">
            <h2 className="text-3xl font-bold text-slate-800">Featured Listings</h2>
            <p className="text-slate-600">Handpicked residential houses, premium layout plots, and fertile agricultural farmland.</p>
          </div>
          <Link to="/properties" className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1 group text-sm">
            View All Listings
            <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col group text-left">
              <div className="h-48 overflow-hidden relative shrink-0">
                <img 
                  src={p.imageUrl} 
                  alt={p.name} 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase">
                  {p.type}
                </div>
                {p.associatedWith && (
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-xs px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    {p.associatedWith}
                  </div>
                )}
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div className="space-y-2 mb-4">
                  <h3 className="font-extrabold text-slate-800 text-lg group-hover:text-emerald-600 transition-colors line-clamp-1">
                    {p.name}
                  </h3>
                  <p className="flex items-center gap-1 text-slate-500 text-xs font-medium">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{p.location}</span>
                  </p>
                  <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-4 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Size</span>
                    <p className="text-slate-800 text-xs font-bold font-mono">{p.size}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-600 text-xs font-semibold uppercase tracking-wider block">Price</span>
                    <p className="text-slate-800 text-sm font-extrabold font-mono">{p.priceStr}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 shrink-0">
                <Link 
                  to={`/properties/${p.id}`} 
                  className="w-full py-2 bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-semibold rounded-lg transition-all text-center text-xs block active:scale-98"
                >
                  View Details & Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Directory Highlight */}
      <div className="bg-slate-900 text-white py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="inline-block bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-400 text-xs font-semibold uppercase">
                Builders & Agents Directory
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Partnering with Verified Real Estate Professionals
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                We've brought together Hubli's premier layout planners and estate brokers. Contact developers like Neelgund or Koravi Developers directly, or connect with agents like Hubballi Homes to secure agricultural plots.
              </p>
              <div className="flex gap-4">
                <Link to="/directory" className="px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-lg text-sm hover:bg-emerald-700 transition-colors shadow-xs">
                  Browse Directory
                </Link>
                <Link to="/dashboard?tab=add-listing" className="px-5 py-2.5 bg-slate-800 text-white font-semibold rounded-lg text-sm border border-slate-700 hover:bg-slate-700 hover:text-white transition-colors">
                  Join as Partner
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 text-left space-y-2">
                <p className="font-extrabold text-slate-100 text-sm">Bhavani Projects</p>
                <p className="text-xs text-slate-400">BM Plaza, Deshpande Nagar</p>
                <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-bold px-2 py-0.5 rounded uppercase inline-block">Builder</span>
              </div>
              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 text-left space-y-2">
                <p className="font-extrabold text-slate-100 text-sm">Reachmaxx Boosters</p>
                <p className="text-xs text-slate-400">Shirur Park Road, Hubballi</p>
                <span className="text-[10px] bg-sky-500/10 border border-sky-500/25 text-sky-400 font-bold px-2 py-0.5 rounded uppercase inline-block">Agent</span>
              </div>
              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 text-left space-y-2">
                <p className="font-extrabold text-slate-100 text-sm">Neelgund Developers</p>
                <p className="text-xs text-slate-400">Vidya Nagar, Hubballi</p>
                <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-bold px-2 py-0.5 rounded uppercase inline-block">Builder</span>
              </div>
              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 text-left space-y-2">
                <p className="font-extrabold text-slate-100 text-sm">Hubballi Homes</p>
                <p className="text-xs text-slate-400">Video Tours specialist</p>
                <span className="text-[10px] bg-sky-500/10 border border-sky-500/25 text-sky-400 font-bold px-2 py-0.5 rounded uppercase inline-block">Agent</span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
