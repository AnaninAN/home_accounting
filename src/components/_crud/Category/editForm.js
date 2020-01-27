import React, { useState, useEffect } from 'react';

export const EditCategoryForm = (props) => {

    const [category, setCategory] = useState(props.currentCategory);

    useEffect(
        () => {
            setCategory(props.currentCategory);
        },
        [props]
    );

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setCategory({ ...category, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!category.name) return;

        props.updateCategory(category);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
                type="text"
                name="name"
                value={category.name}
                onChange={handleInputChange}
            />
            <button>Update category</button>
            <button onClick={() => props.setEditing(false)}>Cancel</button>
        </form>
    )
};