import './Header.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';

export const Header = ({ token, username, handleSignOut }) => {

  return (
    <Container fluid className='bg-dark p-3'>
      <Row className='d-flex'>
        <Col>
          <h2 className='text-warning'>Hello! It's a start of cool "Home accounting" app</h2>
        </Col>
        <Col className='text-right'>
          <span className="info-name">You are logged in <span className="info-name__username">{username}</span></span>
          {token &&
          <Link to={'/auth'}>
            <Button color='danger' onClick={handleSignOut}>Sign Out</Button>
          </Link>
          }
        </Col>
      </Row>
    </Container>
  );
};