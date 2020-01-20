import './WidgetBalanceContent.scss';
import React from 'react';

export class WidgetBalanceContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: null,
        }
    }
    getAmount() {
        return this.props.content.content.reduce(function(sum,current) {
            return sum + current.amount;
        }, 0);
    }
    componentDidMount() {
        this.setState(() => ({
            amount: this.getAmount() + ' руб',
        }));
    }

    render() {
        return (
            <div>
                Amount: {this.state.amount}
                <ul>
                    {this.props.content.content.map((item) =>
                        <li key={item.name}>{item.name} : {item.amount}</li>
                    )}
                </ul>
            </div>
        )
    }
}