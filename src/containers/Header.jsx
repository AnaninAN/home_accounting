import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';

export class Header extends React.Component {

    render() {
        return (
            <Container fluid className='bg-dark p-3'>
                <Row className='d-flex'>
                    <Col>
                        <h2 className='text-warning'>Hello! It's a start of cool "Home accounting" app</h2>
                    </Col>
                    <Col className='text-right'>
                        {this.props.token &&
                        <Link to={'/auth'}>
                            <Button color='danger' onClick={this.props.handleSignOut}>Sign Out</Button>
                        </Link>
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}