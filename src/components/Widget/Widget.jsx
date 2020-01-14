import React from 'react';
import './Widget.scss';
import { WidgetContent } from "../WidgetContent";

export class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            amount: null,
            content: [],
        };

        this.toggleVisibility = this.toggleVisibility.bind(this);
    }
    toggleVisibility() {
        this.setState(state => ({
                visible: !this.state.visible,
                content: [
                    {name: 'account1', value: '5000 $',},
                    {name: 'account2', value: '3000 $',},
                ],
            })
        );
    }
    componentDidMount() {
        this.setState(state => ({
            amount: Math.random(),
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
                    <WidgetContent name='Account1' value='5000 $'/>
                    <WidgetContent name='Account2' value='3000 $'/>
                </div>
                }
            </div>
        );
    }
}