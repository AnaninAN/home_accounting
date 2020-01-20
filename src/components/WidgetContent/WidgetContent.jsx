import './WidgetContent.scss';
import React from 'react';

export class WidgetContent extends React.Component {
    render() {
        return (
            <ul>
                {Object.entries(this.props.content).map(([key, value]) =>
                    <li key={key}>{key} : {value}</li>
                )}
            </ul>
        )
    }
}