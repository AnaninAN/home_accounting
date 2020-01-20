import React from 'react';
import './Dashboard.scss';
import { Widget } from '../Widget';
import { DropTarget } from 'react-dnd';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widgets: {
                0: {top: 20, left: 80},
                1: {top: 180, left: 20},
                2: {top:100, left: 50},
            },
        }
    }
    render() {
        const { connectDropTarget } = this.props;
        const { widgets } = this.state;
        return connectDropTarget(
            <div className='dashboard'>
                Dashboard
                {Object.keys(widgets).map(key => {
                    const { left, top } = widgets[key];
                    return (
                        <Widget
                            key={key}
                            id={key}
                            left={left}
                            top={top}
                        />
                    )
                })}
            </div>,
        )
    }
    moveWidget(id, left, top) {
        this.setState(
            (state) => ({
                widgets: {
                    ...state.widgets,
                    [id]: {
                        left: left,
                        top: top,
                    },
                },
            }));
    }
}
export default DropTarget(
    'widget',
    {
        drop(props, monitor, component) {
            if (!component) {
                return
            }
            const item = monitor.getItem();
            const delta = monitor.getDifferenceFromInitialOffset();
            const left = Math.round(item.left + delta.x);
            const top = Math.round(item.top + delta.y);
            component.moveWidget(item.id, left, top);
        },
    },
    connect => ({
        connectDropTarget: connect.dropTarget(),
    }),
)(Dashboard)

