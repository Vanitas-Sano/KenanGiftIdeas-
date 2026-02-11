import React from 'react';

const CategoryFilter = ({ currentCategory, onCategoryChange }) => {
    const categories = ['All', 'GPU', 'CPU', 'Money', 'Other'];

    return (
        <div style={{
            backgroundColor: 'white',
            borderBottom: '1px solid var(--currys-grey-medium)',
            marginBottom: '30px'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'flex-start',
                gap: '5px'
            }}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`filter-tab ${currentCategory === cat ? 'active' : ''}`}
                        onClick={() => onCategoryChange(cat)}
                        style={{
                            borderRadius: 0,
                            padding: '15px 25px',
                            fontSize: '0.95rem'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;
