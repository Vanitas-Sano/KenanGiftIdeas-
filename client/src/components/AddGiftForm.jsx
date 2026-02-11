import React, { useState } from 'react';

const AddGiftForm = ({ onGiftAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        link: '',
        image_url: '',
        price: '',
        category: 'Other'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/gifts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setFormData({ name: '', description: '', link: '', image_url: '', price: '', category: 'Other' });
                if (onGiftAdded) onGiftAdded();
                alert('Gift Idea Added!');
            } else {
                console.error('Failed to add gift');
            }
        } catch (error) {
            console.error('Error adding gift:', error);
        }
    };

    return (
        <div className="lime-card" style={{ borderRadius: 'var(--radius-main)', boxShadow: 'var(--shadow-card)' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Add Gift Idea</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Gift Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ flex: 1 }}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price (£)"
                        value={formData.price}
                        onChange={handleChange}
                        style={{ flex: '0 0 80px' }}
                    />
                </div>

                <input
                    type="text"
                    name="description"
                    placeholder="Short description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    style={{ marginBottom: '12px' }}
                >
                    <option value="GPU">GPU</option>
                    <option value="CPU">CPU</option>
                    <option value="Money">Money</option>
                    <option value="Other">Other</option>
                </select>

                <input
                    type="url"
                    name="image_url"
                    placeholder="Image URL (optional)"
                    value={formData.image_url}
                    onChange={handleChange}
                />

                <button type="submit" style={{ marginTop: '10px' }}>
                    SUBMIT IDEA
                </button>
            </form>
        </div>
    );
};

export default AddGiftForm;
