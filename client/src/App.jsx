import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GiftList from './components/GiftList';
import CategoryFilter from './components/CategoryFilter';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
  const [gifts, setGifts] = useState([]);
  const [filteredGifts, setFilteredGifts] = useState([]);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isBasketAnimating, setIsBasketAnimating] = useState(false);
  const [flyingItems, setFlyingItems] = useState([]);

  const fetchGifts = async () => {
    try {
      const response = await fetch('/api/gifts');
      const data = await response.json();
      if (data.message === 'success') {
        setGifts(data.data);
      }
    } catch (error) {
      console.error('Error fetching gifts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  useEffect(() => {
    if (category === 'All') {
      setFilteredGifts(gifts);
    } else {
      setFilteredGifts(gifts.filter(gift => gift.category === category));
    }
  }, [category, gifts]);

  const addToCart = (gift, event) => {
    setCart([...cart, gift]);

    // Handle Fly Animation
    if (event) {
      const buttonRect = event.currentTarget.getBoundingClientRect();
      const basketIcon = document.getElementById('basket-anchor');

      if (basketIcon) {
        const basketRect = basketIcon.getBoundingClientRect();

        // Calculate Translation
        const targetX = basketRect.left - buttonRect.left;
        const targetY = basketRect.top - buttonRect.top;

        const newFlyItem = {
          id: Date.now(),
          x: buttonRect.left,
          y: buttonRect.top,
          targetX: `${targetX}px`,
          targetY: `${targetY}px`,
          image: gift.image_url
        };

        setFlyingItems(prev => [...prev, newFlyItem]);

        // Cleanup and trigger header bump after animation
        setTimeout(() => {
          setFlyingItems(prev => prev.filter(item => item.id !== newFlyItem.id));
          setIsBasketAnimating(true);
          setTimeout(() => setIsBasketAnimating(false), 400);
        }, 800);
      }
    } else {
      // Fallback for non-event triggers
      setIsBasketAnimating(true);
      setTimeout(() => setIsBasketAnimating(false), 400);
    }
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const completePayment = () => {
    alert('Order Placed Successfully! Your tech is on the way. 📦');
    setCart([]);
    setIsCheckoutOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        cartCount={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
        isBasketAnimating={isBasketAnimating}
      />

      <CategoryFilter currentCategory={category} onCategoryChange={setCategory} />

      <main style={{ flex: 1, position: 'relative' }}>
        {/* Flying Items overlay */}
        {flyingItems.map(item => (
          <img
            key={item.id}
            src={item.image}
            className="item-fly-element"
            alt=""
            style={{
              top: item.y,
              left: item.x,
              '--target-x': item.targetX,
              '--target-y': item.targetY
            }}
          />
        ))}

        <div className="container" style={{ paddingTop: '20px' }}>
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Top tech choices for you</h2>
            <p style={{ color: 'var(--currys-text-light)', fontSize: '0.9rem' }}>
              Showing results for <strong>{category}</strong>. Free delivery included.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <div style={{ fontSize: '1.2rem', color: 'var(--currys-purple)' }}>Loading your catalogue...</div>
            </div>
          ) : (
            <GiftList gifts={filteredGifts} onAddToCart={addToCart} />
          )}
        </div>
      </main>

      {/* Footer - Visual Only */}
      <footer style={{
        backgroundColor: 'var(--currys-purple)',
        color: 'white',
        padding: '40px 0',
        marginTop: 'auto'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h4 style={{ color: 'white' }}>Customer Service</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', lineHeight: '2' }}>
              <li>Contact Us</li>
              <li>Delivery Information</li>
              <li>Returns & Refunds</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'white' }}>About Currys</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', lineHeight: '2' }}>
              <li>Corporate Info</li>
              <li>Careers</li>
              <li>Sustainability</li>
            </ul>
          </div>
          <div style={{ maxWidth: '300px' }}>
            <h4 style={{ color: 'white' }}>Stay connected</h4>
            <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>Sign up for our newsletter to get latest tech news and offers.</p>
            <div style={{ display: 'flex', gap: '5px' }}>
              <input type="text" placeholder="Your email" style={{ flex: 1, padding: '5px 10px' }} />
              <button style={{ padding: '5px 15px', backgroundColor: 'var(--currys-magenta)' }}>Join</button>
            </div>
          </div>
        </div>
      </footer>

      {isCartOpen && (
        <Cart
          cartItems={cart}
          onClose={() => setIsCartOpen(false)}
          onRemove={removeFromCart}
          onCheckout={handleCheckout}
        />
      )}

      {isCheckoutOpen && (
        <Checkout
          total={cart.reduce((sum, item) => sum + (item.price || 0), 0)}
          onComplete={completePayment}
          onCancel={() => setIsCheckoutOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
