import React from 'react';

const Header = ({ cartCount, onOpenCart, isBasketAnimating }) => {
    return (
        <div style={{ backgroundColor: 'var(--currys-purple)', color: 'white' }}>
            <header className="container" style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '15px 0'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    {/* Logo Section */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'var(--currys-purple)',
                            fontWeight: '900',
                            fontSize: '1.2rem'
                        }}>
                            K
                        </div>
                        <h1 style={{ color: 'white', margin: 0, fontSize: '1.4rem', letterSpacing: '-0.5px' }}>Birthday Gift Idea for Kenan</h1>
                    </div>

                    {/* Search Bar - Visual Only */}
                    <div style={{
                        flex: 1,
                        maxWidth: '600px',
                        margin: '0 40px',
                        display: 'none', // Hide on small screens, show on large in real CSS
                        position: 'relative'
                    }}>
                        <input
                            type="text"
                            placeholder="Search for tech..."
                            style={{ width: '100%', padding: '10px 15px', borderRadius: '30px', border: 'none' }}
                        />
                        <button style={{
                            position: 'absolute',
                            right: '5px',
                            top: '5px',
                            padding: '5px 15px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            height: 'calc(100% - 10px)'
                        }}>
                            Search
                        </button>
                    </div>

                    {/* Cart Section */}
                    <button
                        onClick={onOpenCart}
                        style={{
                            background: 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            border: 'none',
                            padding: '5px 10px'
                        }}
                    >
                        <div id="basket-anchor" className={isBasketAnimating ? 'basket-animate' : ''} style={{ position: 'relative' }}>
                            <span style={{ fontSize: '1.5rem' }}>🛒</span>
                            {cartCount > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-5px',
                                    right: '-5px',
                                    background: 'var(--currys-magenta)',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '18px',
                                    height: '18px',
                                    fontSize: '0.7rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontWeight: '700'
                                }}>
                                    {cartCount}
                                </span>
                            )}
                        </div>
                        <span style={{ fontWeight: '500' }}>Basket</span>
                    </button>
                </div>
            </header>

            {/* Sub-nav - Visual Only */}
            <div style={{ backgroundColor: 'var(--currys-purple-light)', fontSize: '0.85rem' }}>
                <div className="container" style={{ display: 'flex', gap: '30px', padding: '8px 0' }}>
                    <span>Stores</span>
                    <span>Help & Support</span>
                    <span>Track my order</span>
                    <span style={{ marginLeft: 'auto', fontWeight: 'bold' }}>Free delivery on everything</span>
                </div>
            </div>
        </div>
    );
};

export default Header;
