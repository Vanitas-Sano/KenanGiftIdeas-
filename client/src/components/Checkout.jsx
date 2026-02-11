import React, { useState } from 'react';

const Checkout = ({ total, onComplete, onCancel }) => {
    const [processing, setProcessing] = useState(false);

    const handlePayment = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            onComplete();
        }, 2000);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2100,
            backdropFilter: 'blur(4px)'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '40px',
                borderRadius: 'var(--radius-standard)',
                width: '500px',
                maxWidth: '90%',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                position: 'relative'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h2 style={{ color: 'var(--currys-purple)', fontSize: '1.8rem', margin: '0 0 10px 0' }}>Secure Checkout</h2>
                    <p style={{ color: 'var(--currys-text-light)', fontSize: '0.9rem' }}>Fast & secure payment processing</p>
                </div>

                <div style={{
                    backgroundColor: 'var(--currys-grey-light)',
                    padding: '20px',
                    borderRadius: 'var(--radius-standard)',
                    textAlign: 'center',
                    marginBottom: '30px',
                    border: '1px solid var(--currys-grey-medium)'
                }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--currys-text-light)', marginBottom: '5px' }}>Total to pay</div>
                    <div style={{
                        color: 'var(--currys-purple)',
                        fontSize: '2.5rem',
                        fontWeight: '800'
                    }}>
                        £{total.toFixed(2)}
                    </div>
                </div>

                <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', borderBottom: '1px solid var(--currys-grey-medium)', paddingBottom: '10px' }}>
                    Choose a payment method
                </h3>

                <div style={{ display: 'grid', gap: '12px', marginBottom: '30px' }}>
                    <button onClick={handlePayment} style={{ width: '100%', justifyContent: 'flex-start', padding: '15px' }}>
                        <span style={{ marginRight: '15px' }}>💳</span> Pay by Credit or Debit Card
                    </button>
                    <button onClick={handlePayment} className="outline" style={{ width: '100%', justifyContent: 'flex-start', padding: '15px' }}>
                        <span style={{ marginRight: '15px' }}>🅿️</span> Pay by PayPal
                    </button>
                    <button onClick={handlePayment} className="outline" style={{ width: '100%', justifyContent: 'flex-start', padding: '15px', color: '#1a73e8' }}>
                        <span style={{ marginRight: '15px' }}>G</span> Pay with Google Pay
                    </button>
                </div>

                <button
                    onClick={onCancel}
                    style={{
                        width: '100%',
                        background: 'none',
                        color: 'var(--currys-text-light)',
                        fontSize: '0.9rem',
                        textDecoration: 'underline'
                    }}
                >
                    Cancel and return to basket
                </button>

                {processing && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 'var(--radius-standard)',
                        zIndex: 10
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            border: '4px solid var(--currys-grey-medium)',
                            borderTop: '4px solid var(--currys-purple)',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            marginBottom: '20px'
                        }}></div>
                        <h2 style={{ color: 'var(--currys-purple)' }}>Securing transaction...</h2>
                    </div>
                )}
            </div>
            <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default Checkout;
