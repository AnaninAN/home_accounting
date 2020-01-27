import React from 'react';

export const CategoryTable = (props) => {

    const handleDeleteCategory = (id) => {
        props.deleteCategory(id);
    };

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {props.categories.length > 0 ? (
                props.categories.map(category => (
                    <tr key={category.id}>
                        <td>{category.name}</td>
                        <td>
                            <button onClick={() => props.editRow(category)}>Edit</button>
                            <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td>No categories</td>
                </tr>
            )}
            </tbody>
        </table>
    )
};


