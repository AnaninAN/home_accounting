import React, {useState, useEffect} from 'react';
import {AddCategoryForm} from './form';
import {CategoryTable} from './table';
import {EditCategoryForm} from './editForm';

export const Category = () => {

    const [categories, setCategories] = useState({});

    const [editing, setEditing] = useState(false);

    const initialFormState = { id: null, name: ''};

    const [currentCategory, setCurrentCategory] = useState(initialFormState);

    const fetchData = () => {
        fetch('http://localhost/v1/categories', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        }).then(data => {
            setCategories(data);
        });
    };

    useEffect(() => {
       fetchData();
    }, []);

    const addCategory = (category) => {
        fetch('http://localhost/v1/categories', {
            method: 'POST',
            body : JSON.stringify(category),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(response => {
            if (response.status === 201) {
                return response.json();
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        }).then(data => {
            setCategories([ ...categories, data ]);
        });
    };

    const deleteCategory = (id) => {
        setEditing(false);
        fetch(`http://localhost/v1/categories/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(response => {
            if (response.status === 204) {
                setCategories(categories.filter(category => category.id !== id));
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        });
    };

    const updateCategory = (updatedCategory) => {
        setEditing(false);
        const id = updatedCategory.id;
        delete updatedCategory.id;

        fetch(`http://localhost/v1/categories/${id}`, {
            method: 'PATCH',
            body : JSON.stringify(updatedCategory),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        }).then(data => {
            setCategories(categories.map(category => (category.id === data.id ? data : category)));
        });
    };

    const editRow = (category) => {
        setEditing(true);
        setCurrentCategory({ id: category.id, name: category.name });
    };

    return (
        <div>
            <h1>CRUD Category</h1>
            <div>
                <div>
                    {editing ? (
                        <div>
                            <h2>Edit category</h2>
                            <EditCategoryForm
                                editing={editing}
                                setEditing={setEditing}
                                currentCategory={currentCategory}
                                updateCategory={updateCategory}
                            />
                        </div>
                    ) : (
                        <div>
                            <h2>Add category</h2>
                            <AddCategoryForm addCategory={addCategory} />
                        </div>
                    )}
                </div>
                <div>
                    <h2>View categories</h2>
                    <CategoryTable categories={categories} deleteCategory={deleteCategory} editRow={editRow}/>
                </div>
            </div>
        </div>
    )
};


