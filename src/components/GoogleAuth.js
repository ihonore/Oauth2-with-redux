import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as AuthorizationAction from '../framework/redux/module/Authorization';
import 'font-awesome/css/font-awesome.min.css';
import Todos from '../components/Todos';
import TodoInput from '../components/TodoInput';
import LoginCard from '../components/LoginCard';

let profile;

const GoogleAuth = ({ dispatch, isSignedIn }) => {
  const [auth, setAuth] = useState(null);
  (function () {
    return (
      <div>
        <Todos />
        <TodoInput />
      </div>
    );
  })();

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
      return <LoginCard onSignInClick={onSignInClick} />;
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
