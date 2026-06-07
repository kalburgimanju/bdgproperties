import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users2, Search, ArrowRight, Globe, Phone, Mail, HelpCircle } from 'lucide-react';
import { builders, agents } from '../data/realestateData';

export default function Directory() {
  const [activeTab, setActiveTab] = useState('builders'); // 'builders' or 'agents'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBuilders = builders.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAgents = agents.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-slate-800">Professional Directory</h1>
            <p className="text-slate-600 text-sm">Find and contact Hubli's premier developers, layout planners, and certified real estate brokers.</p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:max-w-xs shrink-0">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search directors, companies..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 text-slate-800 placeholder-slate-400 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm font-medium shadow-2xs"
            />
          </div>
        </div>

        {/* Tab Toggle Toolbar */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => { setActiveTab('builders'); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm tracking-wide border-b-2 transition-all cursor-pointer ${
              activeTab === 'builders' 
                ? 'border-emerald-600 text-emerald-600 bg-emerald-50/20' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Building2 className="h-4.5 w-4.5" />
            <span>Builders & Developers ({filteredBuilders.length})</span>
          </button>
          <button
            onClick={() => { setActiveTab('agents'); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm tracking-wide border-b-2 transition-all cursor-pointer ${
              activeTab === 'agents' 
                ? 'border-emerald-600 text-emerald-600 bg-emerald-50/20' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Users2 className="h-4.5 w-4.5" />
            <span>RERA Registered Brokers ({filteredAgents.length})</span>
          </button>
        </div>

        {/* Listings Display Grid */}
        {activeTab === 'builders' ? (
          filteredBuilders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredBuilders.map((b) => (
                <div key={b.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col group justify-between">
                  <div className="h-44 bg-slate-100 overflow-hidden relative shrink-0">
                    <img 
                      src={b.imageUrl} 
                      alt={b.name} 
                      className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[9px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                      Builder
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-2 mb-4">
                      <h3 className="font-extrabold text-slate-800 text-lg group-hover:text-emerald-600 transition-colors">{b.name}</h3>
                      <p className="text-xs text-slate-400 font-medium line-clamp-1">{b.address}</p>
                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">{b.description}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                      {b.phone && <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-md font-mono">{b.phone}</span>}
                      {b.email && <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-md font-mono line-clamp-1 max-w-[200px]">{b.email}</span>}
                    </div>
                  </div>

                  <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 shrink-0">
                    <Link 
                      to={`/directory/${b.id}?type=builder`}
                      className="w-full py-2 bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-bold rounded-lg transition-all text-center text-xs flex items-center justify-center gap-1 active:scale-98 cursor-pointer"
                    >
                      <span>View Managed Properties</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-4 max-w-sm mx-auto">
              <HelpCircle className="h-10 w-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800">No builders found</h3>
              <p className="text-slate-500 text-xs">No active builders match your search term "{searchQuery}". Try editing your query.</p>
            </div>
          )
        ) : (
          filteredAgents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredAgents.map((a) => (
                <div key={a.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col group justify-between">
                  <div className="h-44 bg-slate-100 overflow-hidden relative shrink-0">
                    <img 
                      src={a.imageUrl} 
                      alt={a.name} 
                      className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[9px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                      Broker / Agent
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-2 mb-4">
                      <h3 className="font-extrabold text-slate-800 text-lg group-hover:text-emerald-600 transition-colors">{a.name}</h3>
                      <p className="text-xs text-slate-400 font-medium line-clamp-1">{a.address}</p>
                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">{a.description}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                      {a.phone && <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-md font-mono">{a.phone}</span>}
                      {a.email && <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-md font-mono line-clamp-1 max-w-[200px]">{a.email}</span>}
                    </div>
                  </div>

                  <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 shrink-0">
                    <Link 
                      to={`/directory/${a.id}?type=agent`}
                      className="w-full py-2 bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-bold rounded-lg transition-all text-center text-xs flex items-center justify-center gap-1 active:scale-98 cursor-pointer"
                    >
                      <span>View Listings Portfolio</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-4 max-w-sm mx-auto">
              <HelpCircle className="h-10 w-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800">No agents found</h3>
              <p className="text-slate-500 text-xs">No active brokers match your search term "{searchQuery}". Try editing your query.</p>
            </div>
          )
        )}

      </div>
    </div>
  );
}
