import React, { useState } from 'react';

export const AddCategoryForm = (props) => {

    const initialFormState = { name: '' };

    const [category, setCategory] = useState(initialFormState);

    const handleInputChange = (event) => {
        const { name, value } = event.currentTarget;
        setCategory({ ...category, [name]: value })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!category.name) return;

        props.addCategory(category);
        setCategory(initialFormState);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Category</label>
            <input type="text" name="name" value={category.name} onChange={handleInputChange} />
            <button>Add new category</button>
        </form>
    )
};