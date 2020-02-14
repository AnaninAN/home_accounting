import './WidgetAccountContent.scss';

import React, { PureComponent } from 'react';
import { Row, Col } from 'reactstrap';

export class WidgetAccountContent extends PureComponent {
    render() {
        let { entity } = this.props;
        return (
            <Row className='widget-content mt-2 p-1'>
                <Col className='d-flex col-8'>
                    <p className={entity.amount > 0 ? 'text-success' : 'text-danger'}>{entity.amount}</p>
                    <p className='ml-2'>{entity.currency_id}</p>
                </Col>
                <Col className='col-4'>
                    <p className='text-warning'>{entity.account_category_id}</p>
                </Col>
            </Row>
        )
    }
}