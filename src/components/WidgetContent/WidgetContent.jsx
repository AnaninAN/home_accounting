import './WidgetContent.scss';
import React from 'react';

export class WidgetContent extends React.Component {
    render() {
        return (
            <div className='widget-content'>
                <p>{this.props.name}</p>
                <p>{this.props.value}</p>
            </div>
        )
    }
}