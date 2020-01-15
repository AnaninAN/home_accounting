import './WidgetContent.scss';
import React from 'react';

export class WidgetContent extends React.Component {
    render() {
        return (
            <li className='widget-content'>{this.props.name} : {this.props.amount} {this.props.currency}</li>
        )
    }
}