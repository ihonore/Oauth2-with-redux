import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as AuthorizationAction from './framework/redux/module/Authorization';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FaTimesCircle } from 'react-icons/fa';
import 'font-awesome/css/font-awesome.min.css';
import { useDispatch, useSelector } from 'react-redux';
let profile;

const GoogleAuth = ({ dispatch, isSignedIn }) => {
  const [auth, setAuth] = useState(null);

  const Todos = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todoss.todos);
    const handleClick = (id) =>
      dispatch({
        type: 'DELETE_TODO',
        payload: id,
      });
    if (!todos || !todos.length) {
      return <p>NO TODOS</p>;
    }
    return (
      <ul>
        {todos.map((todo) => (
          <div className='list post-it'>
            <li>
              <div contenteditable='true'>{todo.label}</div>
            </li>
            <FaTimesCircle
              className='delete'
              onClick={() => handleClick(todo.id)}
            />
          </div>
        ))}
      </ul>
    );
  };
  const TodoInput = () => {
    const dispatch = useDispatch();
    const [newTodo, setNewTodo] = useState();
    const handleChange = (event) => setNewTodo(event.target.value);
    const handleClick = () =>
      dispatch({
        type: 'ADD_TODO',
        payload: {
          label: newTodo,
          id: Math.ceil(Math.random() * 100),
        },
      });

    return (
      <div>
        <input type='text' value={newTodo} onChange={handleChange} />
        <Button className='addTodo' onClick={handleClick}>
          ADD TODO
        </Button>
      </div>
    );
  };

  useEffect(() => {
    const params = {
      clientId:
        '261191662219-c2ib90fcmkpuc13ri54vo9smbpuk2vor.apps.googleusercontent.com',
      scope: 'profile email',
    };

    window.gapi.load('client:auth2', () => {
      window.gapi.client.init(params).then(() => {
        setAuth(window.gapi.auth2.getAuthInstance());
        onAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
      });
    });
  }, []);

  const onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      dispatch(
        AuthorizationAction.signIn(
          window.gapi.auth2.getAuthInstance().currentUser.get().getId(),
          (profile = window.gapi.auth2.getAuthInstance().currentUser.get()),
          console.log(profile.Lu, '++++++')
        )
      );
    } else {
      dispatch(AuthorizationAction.signOut());
    }
  };

  const onSignInClick = () => {
    auth.signIn();
  };

  const onSignOutClick = () => {
    auth.signOut();
  };

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return (
        <div>
          <h1>Please login with google first</h1>
          <Button className='signInBtn' onClick={onSignInClick}>
            Sign In with Google
          </Button>
        </div>
      );
    } else if (isSignedIn) {
      return (
        <div className='App'>
          <header className='App-header'>
            <img
              src={profile.Lu.rN}
              referrerpolicy='no-referrer'
              className='App-logo'
              alt='logo'
            />
            <p>{profile.Lu.tf}</p>
            <p className='todos'>
              <span role='img'>📝</span>TODOS
            </p>
            <Todos />
            <TodoInput />
            <Button
              variant='danger'
              className='signOutBtn'
              onClick={onSignOutClick}
            >
              Signout
            </Button>
          </header>
        </div>
      );
    } else {
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
    }
  };

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
    todos: state.todos,
  };
};

export default connect(mapStateToProps)(GoogleAuth);
