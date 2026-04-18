import React, { useState, useEffect } from 'react';
import './CollegeSamagri.css';
import { MapPin, Box } from 'lucide-react';
import api from '../lib/api';

const FILTERS = ["All", "Books", "Equipment", "Stationery", "Other"];

/* ─── Components ───────────────────────────────────── */
const EmptyState = () => (
  <div className="samagri-empty-state">
    <div className="book-anim-wrapper">
      <svg className="empty-book-svg" viewBox="0 0 100 100">
        {/* Open book */}
        <path d="M 50 25 L 50 85" strokeWidth="2" />
        <path d="M 50 25 C 40 20, 20 22, 15 30 L 15 80 C 20 72, 40 70, 50 85" strokeWidth="3" />
        <path d="M 50 25 C 60 20, 80 22, 85 30 L 85 80 C 80 72, 60 70, 50 85" strokeWidth="3" />
        {/* Page lines */}
        <line x1="25" y1="40" x2="45" y2="38" strokeWidth="1" opacity="0.5" />
        <line x1="25" y1="50" x2="45" y2="48" strokeWidth="1" opacity="0.5" />
        <line x1="25" y1="60" x2="45" y2="58" strokeWidth="1" opacity="0.5" />
        <line x1="55" y1="38" x2="75" y2="40" strokeWidth="1" opacity="0.5" />
        <line x1="55" y1="48" x2="75" y2="50" strokeWidth="1" opacity="0.5" />
        <line x1="55" y1="58" x2="75" y2="60" strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
    <div className="samagri-empty-text">
      The exchange shelf is empty.<br />Share your books & supplies.
    </div>
  </div>
);

const ItemCard = ({ item, onClaim }) => {
  const isClaimed = item.status === 'Claimed';
  
  return (
    <div className={`samagri-card ${isClaimed ? 'is-claimed' : ''}`}>
      <div className="samagri-card-image">
        <img src={item.image || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop'} alt={item.title} loading="lazy" />
        <div className="samagri-gradient-overlay" />
        
        {isClaimed && (
          <div className="samagri-stamp-claimed">Claimed</div>
        )}

        {!isClaimed && (
          <div className="samagri-category-badge">
            {item.category || 'Item'}
          </div>
        )}
      </div>

      <div className="samagri-card-body">
        <h3 className="samagri-card-title">{item.title}</h3>
        
        <div className="samagri-card-meta">
          <div className="samagri-chip">
            <MapPin size={14} /> {item.location}
          </div>
          <div className="samagri-chip">
            <Box size={14} /> {item.quantity}
          </div>
        </div>

        {isClaimed ? (
          <div className="samagri-btn-claimed-state">Already Claimed</div>
        ) : (
          <button className="samagri-btn-claim" onClick={() => onClaim?.(item._id)}>Claim Item</button>
        )}
      </div>
    </div>
  );
};


/* ─── Main Page ────────────────────────────────────── */
export default function CollegeSamagri() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    try {
      const data = await api.getListings({ module: 'Samagri' });
      setListings(data);
    } catch (err) {
      console.error('Failed to load listings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async (listingId) => {
    try {
      await api.claimListing(listingId, '680e5c5b1234567890000001');
      loadListings();
    } catch (err) {
      console.error('Failed to claim:', err);
    }
  };

  const filteredListings = activeFilter === "All" 
    ? listings 
    : listings.filter(item => item.category === activeFilter);

  return (
    <div className="samagri-page">
      
      {/* Header */}
      <header className="samagri-header">
        <div className="samagri-header-bg-text">सामग्री</div>
        <div className="samagri-header-content">
          <h1 className="samagri-title">The Exchange</h1>
          <p className="samagri-subtitle">
            Pass on textbooks, lab coats, stationery, and equipment to juniors 
            who need them. Reuse is the new cool.
          </p>
        </div>
      </header>

      {/* Sticky Filter Bar */}
      <div className="samagri-filters-wrapper">
        <div className="samagri-filters-track">
          {FILTERS.map((f) => (
            <button 
              key={f}
              className={`samagri-filter-pill ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Content */}
      <main className="samagri-content-area">
        {loading ? (
          <div className="samagri-empty-state">
            <div className="samagri-empty-text">Loading...</div>
          </div>
        ) : filteredListings.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="samagri-grid">
            {filteredListings.map((item) => (
              <div key={item._id} className="samagri-card-wrapper">
                <ItemCard item={item} onClaim={handleClaim} />
              </div>
            ))}
          </div>
        )}
      </main>

    </div>
  );
}
