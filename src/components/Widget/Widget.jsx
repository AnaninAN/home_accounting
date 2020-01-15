import React from 'react';
import './Widget.scss';
import { WidgetContent } from "../WidgetContent";

export class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            content: [
                {
                    "id": 1,
                    "name": "First Account",
                    "amount": 1500,
                    "account_category_id": 2,
                    "user_id": 2,
                    "currency_id": 1,
                    "created_at": 1574585703,
                    "updated_at": 1574585703
                },
                {
                    "id": 4,
                    "name": "Testing acc",
                    "amount": 650,
                    "account_category_id": 2,
                    "user_id": 2,
                    "currency_id": 3,
                    "created_at": 1574841985,
                    "updated_at": 1574841985
                },
                {
                    "id": 5,
                    "name": "Another nice Account",
                    "amount": -550,
                    "account_category_id": 2,
                    "user_id": 2,
                    "currency_id": 3,
                    "created_at": 1574841985,
                    "updated_at": 1574841985
                },
            ],
        };

        this.toggleVisibility = this.toggleVisibility.bind(this);
    }
    toggleVisibility() {
        this.setState(state => ({
                visible: !this.state.visible,
            }));
    }
    getAmount() {
        return this.state.content.reduce(function(sum,current) {
            return sum + current.amount;
        }, 0);
    }
    componentDidMount() {
        this.setState(state => ({
            amount: this.getAmount() + ' руб',
        }));
    }
    render() {
        return (
            <div className={this.props.class}>
                <div className='widget-header'>
                    <h4>{this.props.name}</h4>
                    <button className='visibility-toggle' onClick={this.toggleVisibility}>
                        {this.state.visible ? 'hide' : 'show'}
                    </button>
                </div>
                {this.state.visible === true &&
                <div>
                    <p>{this.state.amount}</p>
                    <ul>
                        {this.state.content.map((account) =>
                                <WidgetContent key={account.id} name={account.name} amount={account.amount} currency='руб'/>
                                )}
                    </ul>
                </div>
                }
            </div>
        );
    }
}