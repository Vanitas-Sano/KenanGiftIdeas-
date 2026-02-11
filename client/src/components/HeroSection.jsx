import React from 'react';

const HeroSection = ({ children }) => {
    return (
        <section style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '40px 0 80px 0',
            gap: '50px',
            flexWrap: 'wrap'
        }}>
            <div style={{ flex: '1', minWidth: '300px', paddingTop: '20px' }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    marginBottom: '20px',
                    color: 'var(--color-dark)',
                    lineHeight: '1.1'
                }}>
                    Your ultimate <br />
                    <span style={{ color: 'var(--color-primary)' }}>birthday gifting</span> partner
                </h1>
                <p style={{
                    fontSize: '1.1rem',
                    color: 'var(--color-text-light)',
                    marginBottom: '30px',
                    maxWidth: '80%'
                }}>
                    Enhance Kenan's birthday experience with top-tier tech gifts.
                    Chip in from anywhere, monitor all contributions, and manage
                    the wish list efficiently.
                </p>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <span style={{ fontSize: '3rem', color: '#ddd' }}>📍</span>
                    <span style={{ fontSize: '3rem', color: '#ddd' }}>📍</span>
                    <span style={{ fontSize: '3rem', color: '#ddd' }}>📍</span>
                </div>
            </div>

            <div style={{
                flex: '0 0 400px',
                maxWidth: '100%',
                position: 'relative',
                zIndex: 10
            }}>
                {children}
            </div>
        </section>
    );
};

export default HeroSection;
