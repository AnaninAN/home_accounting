import React from 'react';
import { DropTarget } from 'react-dnd';
import { Container } from 'reactstrap';
import { Widget } from 'components/Widget';

class WidgetContainer extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            widgets: {},
        };
    }

    render() {
        const {connectDropTarget} = this.props;
        let { entities } = this.props;
        const widgets = this.state.widgets;
        if (entities.has('errors')) {
            entities = entities.delete('errors');
        }
        entities = Array.from(entities.values());

        return connectDropTarget(
            <div>
                <Container fluid className='bg-danger min-vh-100 position-relative'>
                {
                    entities.map(entity => {
                        return <Widget
                            entity={entity}
                            key={entity.id}
                            id={entity.id}
                            top={typeof(widgets[entity.id]) !== 'undefined' ? widgets[entity.id].top : 0}
                            left={typeof(widgets[entity.id]) !== 'undefined' ? widgets[entity.id].left : 0}
                        />
                    })
                }
                </Container>
            </div>
            ,
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
)(WidgetContainer)