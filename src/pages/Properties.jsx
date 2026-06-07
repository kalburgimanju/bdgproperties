import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal, ArrowUpDown, HelpCircle, X, ChevronRight } from 'lucide-react';
import { properties, builders, agents, searchDatabase } from '../data/realestateData';

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Local filter states synchronized with search params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'All');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [assocType, setAssocType] = useState(searchParams.get('assocType') || 'All');
  const [assocId, setAssocId] = useState(searchParams.get('assocId') || 'All');
  const [sortBy, setSortBy] = useState('featured'); // 'price-asc', 'price-desc', 'name'
  const [showFilters, setShowFilters] = useState(false);

  const [filteredProperties, setFilteredProperties] = useState([]);

  // Extract list of property types for filter dropdown
  const propertyTypes = ["All", ...new Set(properties.map(p => p.type))];

  // Sync states when URL params change
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    setSelectedType(searchParams.get('type') || 'All');
    setMinPrice(searchParams.get('minPrice') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
    setAssocType(searchParams.get('assocType') || 'All');
    setAssocId(searchParams.get('assocId') || 'All');
  }, [searchParams]);

  // Execute Search & Filtering
  useEffect(() => {
    const filters = {
      type: selectedType,
      minPrice: minPrice ? Number(minPrice) : null,
      maxPrice: maxPrice ? Number(maxPrice) : null
    };

    let results = searchDatabase(searchQuery, filters);

    // Additional custom filtering not handled by base searchDatabase
    if (assocType !== 'All') {
      results = results.filter(p => p.associationType === assocType);
    }

    if (assocId !== 'All') {
      results = results.filter(p => p.associationId === assocId);
    }

    // Apply Sorting
    if (sortBy === 'price-asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      results.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProperties(results);
  }, [searchQuery, selectedType, minPrice, maxPrice, assocType, assocId, sortBy]);

  const updateFilters = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'All' && value !== '') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams({});
    setSearchQuery('');
    setSelectedType('All');
    setMinPrice('');
    setMaxPrice('');
    setAssocType('All');
    setAssocId('All');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="text-left space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-800">Browse Properties</h1>
          <p className="text-slate-600 text-sm">
            Showing {filteredProperties.length} active real estate listings across Hubli-Dharwad.
          </p>
        </div>

        {/* Search and Sort Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs justify-between items-center">
          
          {/* Quick search input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                updateFilters('search', e.target.value);
              }}
              placeholder="Search listings by name, location, partners..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
            />
          </div>

          {/* Quick options */}
          <div className="flex w-full sm:w-auto justify-between sm:justify-end gap-3 shrink-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-4 py-2 border rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                showFilters 
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>

            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
              <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-slate-700 text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

        </div>

        {/* Multi-facet Filters Drawer/Section */}
        {(showFilters || selectedType !== 'All' || minPrice || maxPrice || assocType !== 'All' || assocId !== 'All') && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs animate-slideDown text-left">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-5">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
                Detailed Filters
              </h3>
              <button 
                onClick={clearAllFilters}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
              >
                Clear All Filters
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {/* Filter 1: Property Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Property Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    updateFilters('type', e.target.value);
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium cursor-pointer"
                >
                  {propertyTypes.map(t => (
                    <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>
                  ))}
                </select>
              </div>

              {/* Filter 2: Min Price */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Min Price (₹)</label>
                <select
                  value={minPrice}
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                    updateFilters('minPrice', e.target.value);
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium cursor-pointer"
                >
                  <option value="">No Minimum</option>
                  <option value="500000">₹5 Lakhs</option>
                  <option value="1500000">₹15 Lakhs</option>
                  <option value="3000000">₹30 Lakhs</option>
                  <option value="5000000">₹50 Lakhs</option>
                  <option value="8000000">₹80 Lakhs</option>
                  <option value="10000000">₹1 Crore</option>
                </select>
              </div>

              {/* Filter 3: Max Price */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Max Price (₹)</label>
                <select
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                    updateFilters('maxPrice', e.target.value);
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium cursor-pointer"
                >
                  <option value="">No Maximum</option>
                  <option value="1500000">₹15 Lakhs</option>
                  <option value="3000000">₹30 Lakhs</option>
                  <option value="6000000">₹60 Lakhs</option>
                  <option value="9000000">₹90 Lakhs</option>
                  <option value="12000000">₹1.2 Crores</option>
                  <option value="20000000">₹2 Crores</option>
                </select>
              </div>

              {/* Filter 4: Associated Partner Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Partner Association</label>
                <select
                  value={assocType}
                  onChange={(e) => {
                    setAssocType(e.target.value);
                    updateFilters('assocType', e.target.value);
                    // reset sub-partner when switching type
                    setAssocId('All');
                    updateFilters('assocId', 'All');
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium cursor-pointer"
                >
                  <option value="All">All Partners</option>
                  <option value="builder">Builder Managed</option>
                  <option value="agent">Broker/Agent Managed</option>
                </select>
              </div>

            </div>

            {/* Sub-partner Select list (Condition-driven) */}
            {assocType !== 'All' && (
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Select {assocType === 'builder' ? 'Builder' : 'Broker'}:</span>
                <select
                  value={assocId}
                  onChange={(e) => {
                    setAssocId(e.target.value);
                    updateFilters('assocId', e.target.value);
                  }}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium cursor-pointer max-w-xs"
                >
                  <option value="All">All {assocType === 'builder' ? 'Builders' : 'Agents'}</option>
                  {assocType === 'builder' 
                    ? builders.map(b => <option key={b.id} value={b.id}>{b.name}</option>)
                    : agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)
                  }
                </select>
              </div>
            )}
          </div>
        )}

        {/* Listings Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProperties.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col group text-left">
                
                {/* Visual Header */}
                <div className="h-52 overflow-hidden relative shrink-0 bg-slate-100">
                  <img 
                    src={p.imageUrl} 
                    alt={p.name} 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                    {p.type}
                  </div>
                  {p.associatedWith && (
                    <Link
                      to={`/directory/${p.associationId}?type=${p.associationType}`}
                      className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-[11px] px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1 hover:bg-emerald-600 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                      {p.associatedWith}
                    </Link>
                  )}
                </div>

                {/* Listing Body */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-2 mb-5">
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

                  {/* Pricing and Dimensions */}
                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Size / Extent</span>
                      <p className="text-slate-800 text-xs font-bold font-mono">{p.size}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-600 text-xs font-semibold uppercase tracking-wider block">Price Quote</span>
                      <p className="text-slate-800 text-sm font-extrabold font-mono">{p.priceStr}</p>
                    </div>
                  </div>
                </div>

                {/* Call to action */}
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 shrink-0 flex gap-2">
                  <Link 
                    to={`/properties/${p.id}`} 
                    className="flex-1 py-2 bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-semibold rounded-lg transition-all text-center text-xs block"
                  >
                    Details
                  </Link>
                  <Link 
                    to={`/properties/${p.id}?book=true`}
                    className="flex-1 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all text-center text-xs block active:scale-95 shadow-sm"
                  >
                    Buy / Reserve
                  </Link>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty Search results */
          <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-4 max-w-lg mx-auto">
            <HelpCircle className="h-12 w-12 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-lg">No properties found</h3>
            <p className="text-slate-500 text-sm">
              We couldn't find any properties matching your current search parameters. Try adjusting your price ranges, property types, or clearing filters.
            </p>
            <button 
              onClick={clearAllFilters}
              className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 text-xs transition-colors"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
