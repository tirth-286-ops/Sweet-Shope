import React, { useEffect, useState } from 'react';

export default function SweetsPage() {
  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priceSort, setPriceSort] = useState('None');
  const [searchTerm, setSearchTerm] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState(null);
  const [buyerName, setBuyerName] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch('http://localhost:8000/api/sweets/')
      .then(response => response.json())
      .then(data => {
        setSweets(data);
        setFilteredSweets(data);
      })
      .catch(error => console.error('Error fetching sweets:', error));
  }, []);

  useEffect(() => {
    let filtered = [...sweets];
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(sweet => sweet.category === categoryFilter);
    }
    if (searchTerm.trim()) {
      filtered = filtered.filter(sweet =>
        sweet.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (priceSort === 'LowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'HighToLow') {
      filtered.sort((a, b) => b.price - a.price);
    }
    setFilteredSweets(filtered);
  }, [categoryFilter, priceSort, searchTerm, sweets]);

  const categories = ['All', ...new Set(sweets.map(sweet => sweet.category))];

  const openModal = (sweet) => {
    setSelectedSweet(sweet);
    setQuantity(1);
    setBuyerName('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSweet(null);
  };

  const handlePurchase = () => {
    if (!buyerName.trim()) {
      alert('Please enter your name.');
      return;
    }

    if (quantity < 1 || quantity > selectedSweet.quantity) {
      alert(`Please enter a valid quantity between 1 and ${selectedSweet.quantity}.`);
      return;
    }

    const purchaseData = {
      sweet: selectedSweet.id,
      buyer_name: buyerName,
      quantity: quantity,
      price: selectedSweet.price * quantity,
    };

    fetch('http://localhost:8000/api/purchases/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(purchaseData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Purchase failed');
        return res.json();
      })
      .then(() => {
        alert(`Successfully purchased ${quantity} x ${selectedSweet.name}`);
        setSweets(prev =>
          prev.map(s =>
            s.id === selectedSweet.id
              ? { ...s, quantity: s.quantity - quantity }
              : s
          )
        );
        closeModal();
      })
      .catch(err => {
        console.error('Purchase error:', err);
        alert('Failed to purchase. Try again later.');
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Sweets Collection</h1>

      {/* Filter Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <div>
          <label style={{ fontWeight: 'bold' }}>Filter by Category: </label>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ fontWeight: 'bold' }}>Sort by Price: </label>
          <select value={priceSort} onChange={(e) => setPriceSort(e.target.value)}>
            <option value="None">None</option>
            <option value="LowToHigh">Low to High</option>
            <option value="HighToLow">High to Low</option>
          </select>
        </div>
        <div>
          <label style={{ fontWeight: 'bold' }}>Search by Name: </label>
          <input
            type="text"
            placeholder="Enter sweet name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '6px', borderRadius: '5px' }}
          />
        </div>
      </div>

      {/* Sweet Cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {filteredSweets.map(sweet => {
          const isOutOfStock = sweet.quantity === 0;
          return (
            <div key={sweet.id} style={{
              width: '250px',
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '10px',
              textAlign: 'center',
              backgroundColor: '#fffaf0',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <img
                src={sweet.image || 'https://via.placeholder.com/250x180?text=No+Image'}
                alt={sweet.name}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  filter: isOutOfStock ? 'grayscale(100%)' : 'none',
                  opacity: isOutOfStock ? 0.6 : 1
                }}
              />
              <h3>{sweet.name}</h3>
              <p><strong>Category:</strong> {sweet.category}</p>
              <p><strong>Price:</strong> ₹{sweet.price} / {sweet.unit_type}</p>
              <p><strong>Available:</strong> {sweet.quantity} {sweet.unit_type}</p>
              <button
                disabled={isOutOfStock}
                onClick={() => openModal(sweet)}
                style={{
                  marginTop: '10px',
                  padding: '8px 16px',
                  backgroundColor: '#ff6f61',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {isOutOfStock ? 'Out of Stock' : 'Purchase'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && selectedSweet && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff', padding: '30px', borderRadius: '10px',
            width: '400px', textAlign: 'center', boxShadow: '0 0 10px rgba(0,0,0,0.3)'
          }}>
            <h2>Purchase: {selectedSweet.name}</h2>

            <div style={{ marginBottom: '10px' }}>
              <label><strong>Your Name:</strong></label><br />
              <input
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '5px' }}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label><strong>Quantity:</strong></label><br />
              <input
                type="text"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val > 0 && val <= selectedSweet.quantity) {
                    setQuantity(val);
                  } else {
                    setQuantity('');
                  }
                }}
                style={{ width: '100%', padding: '8px', borderRadius: '5px' }}
              />
            </div>

            <p><strong>Total Price: ₹{(selectedSweet.price * quantity).toFixed(2)}</strong></p>

            <div style={{ marginTop: '20px' }}>
              <button
                onClick={handlePurchase}
                style={{
                  padding: '10px 20px',
                  marginRight: '10px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px'
                }}
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
