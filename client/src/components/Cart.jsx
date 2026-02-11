import React from 'react';

const Cart = ({ cartItems, onClose, onRemove, onCheckout }) => {
    const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'flex-end',
            zIndex: 2000,
            backdropFilter: 'blur(2px)'
        }}>
            <div style={{
                width: '450px',
                backgroundColor: 'white',
                height: '100%',
                boxShadow: '-5px 0 15px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                animation: 'slideIn 0.3s ease-out'
            }}>
                <div style={{
                    padding: '20px',
                    backgroundColor: 'var(--currys-purple)',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h2 style={{ color: 'white', margin: 0, fontSize: '1.2rem' }}>Your Basket ({cartItems.length} items)</h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            color: 'white',
                            border: 'none',
                            fontSize: '1.8rem',
                            lineHeight: 1,
                            padding: 0
                        }}
                    >
                        &times;
                    </button>
                </div>

                <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px' }}>
                    {cartItems.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px 0' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🛒</div>
                            <p style={{ color: 'var(--currys-text-light)' }}>Your basket is currently empty.</p>
                            <button className="outline" onClick={onClose} style={{ marginTop: '20px' }}>
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {cartItems.map((item, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    gap: '15px',
                                    paddingBottom: '20px',
                                    borderBottom: '1px solid var(--currys-grey-medium)'
                                }}>
                                    <div style={{ width: '80px', height: '80px', flexShrink: 0 }}>
                                        <img
                                            src={item.image_url}
                                            alt={item.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                    </div>
                                    <div style={{ flexGrow: 1 }}>
                                        <h4 style={{ fontSize: '0.9rem', margin: '0 0 5px 0', color: 'var(--currys-text-dark)' }}>{item.name}</h4>
                                        <div style={{ color: 'var(--currys-purple)', fontWeight: '700', fontSize: '1.1rem' }}>£{item.price.toFixed(2)}</div>
                                        <button
                                            onClick={() => onRemove(index)}
                                            style={{
                                                background: 'none',
                                                color: '#d32f2f',
                                                padding: 0,
                                                fontSize: '0.8rem',
                                                textDecoration: 'underline',
                                                marginTop: '5px'
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{
                    padding: '20px',
                    backgroundColor: 'var(--currys-grey-light)',
                    borderTop: '1px solid var(--currys-grey-medium)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                        <span style={{ fontWeight: '600' }}>Subtotal</span>
                        <span style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--currys-purple)' }}>£{total.toFixed(2)}</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--currys-text-light)', marginBottom: '20px' }}>
                        Shipping and taxes calculated at checkout.
                    </p>
                    <button
                        disabled={cartItems.length === 0}
                        onClick={onCheckout}
                        style={{
                            width: '100%',
                            backgroundColor: 'var(--currys-magenta)',
                            fontSize: '1.1rem',
                            padding: '15px'
                        }}
                    >
                        Go to Checkout
                    </button>
                </div>
            </div>
            <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
        </div>
    );
};

export default Cart;
