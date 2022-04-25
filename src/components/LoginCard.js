import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const LoginCard = (onSignInClick) => {
  return (
    <div className='App'>
      <header className='App-header-login'>
        <Card className='mb-3' style={{ color: '#000' }}>
          <Card.Img src='https://media.istockphoto.com/vectors/secure-user-authentication-with-mobile-phone-data-security-form-and-vector-id1254960887?k=20&m=1254960887&s=612x612&w=0&h=K5WNp-W5n99TDzMaVV_IAqKXOr4MYmvhVVeX7oeroZw=' />
          <Card.Body>
            <Card.Title>Google Authentication</Card.Title>
            <Card.Text>You must login to access your Todo list</Card.Text>
            <Button className='signInBtn' onClick={onSignInClick}>
              LOGIN WITH GOOGLE
              <FontAwesomeIcon className='google-icon' icon={faGoogle} />
            </Button>
          </Card.Body>
        </Card>
      </header>
    </div>
  );
};

export default LoginCard;
