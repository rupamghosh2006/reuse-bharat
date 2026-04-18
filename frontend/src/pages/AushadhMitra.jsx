import React, { useState, useEffect } from 'react';
import './AushadhMitra.css';
import { MapPin, Box, Search } from 'lucide-react';
import api from '../lib/api';

const FILTERS = ["All", "Medicine", "Equipment", "First Aid"];

/* ─── Components ───────────────────────────────────── */
const EmptyState = () => (
  <div className="aushadh-empty-state">
    <div className="pill-anim-wrapper">
      <svg className="empty-pill-svg" viewBox="0 0 100 100">
        {/* Capsule */}
        <rect x="25" y="30" width="50" height="40" rx="20" ry="20" strokeWidth="3" />
        <line x1="50" y1="30" x2="50" y2="70" strokeWidth="2" />
        {/* Plus sign */}
        <line x1="45" y1="85" x2="55" y2="85" strokeWidth="2" />
        <line x1="50" y1="80" x2="50" y2="90" strokeWidth="2" />
      </svg>
    </div>
    <div className="aushadh-empty-text">
      The dispensary is empty right now.<br />Be the first to share medicine.
    </div>
  </div>
);

const MedicineCard = ({ item, onClaim }) => {
  const isClaimed = item.status === 'Claimed';
  
  return (
    <div className={`aushadh-card ${isClaimed ? 'is-claimed' : ''}`}>
      <div className="aushadh-card-image">
        <img src={item.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop'} alt={item.title} loading="lazy" />
        <div className="aushadh-gradient-overlay" />
        
        {isClaimed && (
          <div className="aushadh-stamp-claimed">Claimed</div>
        )}

        {!isClaimed && (
          <div className={`aushadh-validity-badge ${item.isUrgent ? 'pulse-urgent' : ''}`}>
            {item.timeLimit || 'Available'}
          </div>
        )}
      </div>

      <div className="aushadh-card-body">
        <h3 className="aushadh-card-title">{item.title}</h3>
        
        <div className="aushadh-card-meta">
          <div className="aushadh-chip">
            <MapPin size={14} /> {item.location}
          </div>
          <div className="aushadh-chip">
            <Box size={14} /> {item.quantity}
          </div>
        </div>

        {isClaimed ? (
          <div className="aushadh-btn-claimed-state">Already Claimed</div>
        ) : (
          <button className="aushadh-btn-claim" onClick={() => onClaim?.(item._id)}>Claim Medicine</button>
        )}
      </div>
    </div>
  );
};


/* ─── Main Page ────────────────────────────────────── */
export default function AushadhMitra() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    try {
      const data = await api.getListings({ module: 'Aushadh' });
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
    <div className="aushadh-page">
      
      {/* Header */}
      <header className="aushadh-header">
        <div className="aushadh-header-bg-text">औषध मित्र</div>
        <div className="aushadh-header-content">
          <h1 className="aushadh-title">The Dispensary</h1>
          <p className="aushadh-subtitle">
            Share unused, sealed medicines and first-aid supplies with fellow 
            students who need them. Every pill counts.
          </p>
        </div>
      </header>

      {/* Sticky Filter Bar */}
      <div className="aushadh-filters-wrapper">
        <div className="aushadh-filters-track">
          {FILTERS.map((f) => (
            <button 
              key={f}
              className={`aushadh-filter-pill ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Content */}
      <main className="aushadh-content-area">
        {loading ? (
          <div className="aushadh-empty-state">
            <div className="aushadh-empty-text">Loading...</div>
          </div>
        ) : filteredListings.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="aushadh-grid">
            {filteredListings.map((item) => (
              <div key={item._id} className="aushadh-card-wrapper">
                <MedicineCard item={item} onClaim={handleClaim} />
              </div>
            ))}
          </div>
        )}
      </main>

    </div>
  );
}
