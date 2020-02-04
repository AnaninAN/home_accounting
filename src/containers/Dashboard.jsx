import React from 'react';
import { Container, Navbar, Button } from 'reactstrap';
import { Widget } from '../components/Widget';
import { DropTarget } from 'react-dnd';
import {CrudRedux} from 'containers/CrudContainer';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            crudVisible: false,
            widgets: {
                0: {top: 20, left: 80},
                1: {top: 180, left: 20},
                2: {top:100, left: 50},
            },
        };
        this.toggleCrudVisibility = this.toggleCrudVisibility.bind(this);
    }

    toggleCrudVisibility() {
        this.setState(() => ({
            crudVisible: !this.state.crudVisible,
        }));
    }

    render() {
        const { connectDropTarget } = this.props;
        const { widgets } = this.state;
        return connectDropTarget(
            <div>
            <Container fluid className='bg-secondary overflow-hidden min-vh-100'>
                <Navbar className='d-flex border-bottom'>
                    <h4 className='text-light'>Management Panel</h4>
                    <Button color='info' onClick={this.toggleCrudVisibility}>Toggle CRUD</Button>
                </Navbar>
                <h3 className='text-center p-2'>Dashboard</h3>
                {/*{Object.keys(widgets).map(key => {*/}
                {/*    const { left, top } = widgets[key];*/}
                {/*    return (*/}
                {/*        <Widget*/}
                {/*            key={key}*/}
                {/*            id={key}*/}
                {/*            left={left}*/}
                {/*            top={top}*/}
                {/*        />*/}
                {/*    )*/}
                {/*})}*/}
                {
                    (this.state.crudVisible &&
                        <CrudRedux/>
                    )
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
)(Dashboard)

