import React from 'react';
import { DragSource } from 'react-dnd';
import './Widget.scss';
import { WidgetContent } from '../WidgetContent';
import { WidgetBalanceContent } from '../WidgetBalanceContent';

const subjectSource = {
    beginDrag(props) {
        const { id, left, top } = props;
        return { id, left, top };
    },
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}

class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            content: this.getContent()
        };

        this.toggleVisibility = this.toggleVisibility.bind(this);
    }
    toggleVisibility() {
        this.setState(() => ({
                visible: !this.state.visible,
            }));
    }

    getContent() {
        const content = [
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
                "id": 2,
                "name": "Test Account",
                "amount": 650,
                "account_category_id": 3,
                "user_id": 2,
                "currency_id": 1,
                "created_at": 1574588765,
                "updated_at": 1574588765
            },
            {
              "id": 3,
              "name": "Balance",
              "content": [
                  {"name": "Account 1", "amount": 1500},
                  {"name": "Account 2", "amount": 500},
                  {"name": "Account 3", "amount": -650},
              ],
            },
        ];
        return content[this.props.id];
    }

    render() {
        const { connectDragSource } = this.props;
        return connectDragSource(
            <div className='widget' style={{ left: this.props.left, top: this.props.top }} id={this.props.id}>
                <div className='widget-header'>
                    <h4>{this.state.content.name}</h4>
                    <button className='visibility-toggle' onClick={this.toggleVisibility}>
                        {this.state.visible ? 'hide' : 'show'}
                    </button>
                </div>
                {this.state.visible === true &&
                    <div>
                        {this.state.content.name === 'Balance' ? (
                            <WidgetBalanceContent content={this.state.content}/>
                        ) : (
                            <WidgetContent content={this.state.content}/>
                        )
                        }
                    </div>
                }
            </div>,
        );
    }
}

export default DragSource('widget', subjectSource, collect)(Widget);


