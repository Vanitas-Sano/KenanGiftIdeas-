import React from 'react';

const GiftList = ({ gifts, onAddToCart }) => {
    if (!gifts || gifts.length === 0) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
                <h2 style={{ color: 'var(--currys-text-light)' }}>Sorry, we couldn't find any products in this category.</h2>
                <p>Try selecting another category or check back later.</p>
            </div>
        );
    }

    return (
        <div className="container" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
            paddingBottom: '60px'
        }}>
            {gifts.map((gift) => (
                <div key={gift.id} className="product-card">
                    {/* Image Container */}
                    <div style={{
                        height: '200px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '15px',
                        position: 'relative'
                    }}>
                        {gift.image_url ? (
                            <img
                                src={gift.image_url}
                                alt={gift.name}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain'
                                }}
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        ) : (
                            <div style={{ fontSize: '4rem', color: '#eee' }}>📦</div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{
                            fontSize: '1rem',
                            lineHeight: '1.4',
                            height: '2.8em',
                            overflow: 'hidden',
                            color: 'var(--currys-text-dark)',
                            marginBottom: '10px'
                        }}>
                            {gift.name}
                        </h3>

                        <p style={{
                            fontSize: '0.85rem',
                            color: 'var(--currys-text-light)',
                            marginBottom: '20px',
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}>
                            {gift.description}
                        </p>

                        <div style={{ marginTop: 'auto' }}>
                            {/* Product Info Labels */}
                            <div style={{ fontSize: '0.75rem', color: '#00a651', fontWeight: 'bold', marginBottom: '8px' }}>
                                FREE Delivery
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--currys-text-light)', marginBottom: '2px' }}>Price:</div>
                                    <div style={{
                                        color: 'var(--currys-purple)',
                                        fontSize: '1.5rem',
                                        fontWeight: '800'
                                    }}>
                                        £{gift.price.toFixed(2)}
                                    </div>
                                </div>

                                <button
                                    onClick={(e) => onAddToCart(gift, e)}
                                    style={{ padding: '8px 15px', fontSize: '0.85rem' }}
                                >
                                    Add to basket
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GiftList;
