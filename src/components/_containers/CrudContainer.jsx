import React from 'react';
import {Switch, Route, Link, BrowserRouter} from 'react-router-dom';
import { Crud } from '../_crud/Crud';
import { category } from '../_entities/category';
import { currency } from '../_entities/currency';
import { label } from '../_entities/label';
import { accountCategory } from '../_entities/accountCategory';
import { account } from '../_entities/account';

export class CrudContainer extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <h1>CRUD Container</h1>
                <Link to={'/crud/categories'}>Categories</Link>
                <Link to={'/crud/currencies'}>Currencies</Link>
                <Link to={'/crud/labels'}>Labels</Link>
                <Link to={'/crud/account-categories'}>Account categories</Link>
                <Link to={'/crud/accounts'}>Accounts</Link>
                <Switch>
                    <Route path='/crud/categories' key='categories' render={(props) => <Crud {...props} entity={category}/>} exact />
                    <Route path='/crud/currencies' key='currencies' render={(props) => <Crud {...props} entity={currency}/>} exact />
                    <Route path='/crud/labels' key='labels' render={(props) => <Crud {...props} entity={label}/>} exact />
                    <Route path='/crud/account-categories' key='account-categories' render={(props) => <Crud {...props} entity={accountCategory}/>} exact />
                    <Route path='/crud/accounts' key='accounts' render={(props) => <Crud {...props} entity={account}/>} exact />
                </Switch>
            </BrowserRouter>
        )
    }
}