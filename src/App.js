import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router } from 'react-router-dom';
import reducer, { initialState, USER_LOGIN_SUCCESS } from 'Store';
import PageLoading from 'Components/PageLoading';
import Header from 'Components/Header';
import Errors from 'Components/Errors';
import Routes from 'Routes';

const { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENTID } = process.env;
export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const App = ({ user }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (user) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
    }
  }, [user]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <ReducerDefinitionGate>
          {user ? (
            <AppContent />
          ) : (
            <Auth0Provider
              domain={REACT_APP_AUTH0_DOMAIN}
              clientId={REACT_APP_AUTH0_CLIENTID}
              redirectUri={window.location.origin}
              audience={`https://${REACT_APP_AUTH0_DOMAIN}/api/v2/`}
              scope='read:current_user update:current_user_metadata'
            >
              <Auth0Initializer />
            </Auth0Provider>
          )}
        </ReducerDefinitionGate>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

// ensures state is defined before children are mounted
const ReducerDefinitionGate = React.memo(({ children }) => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [reducerIsDefined, setReducerIsDefined] = useState(false);

  useEffect(() => {
    if (state && dispatch) {
      setReducerIsDefined(true);
    }
  }, [state, dispatch]);

  if (reducerIsDefined) {
    return children;
  }

  return <PageLoading />;
});

const Auth0Initializer = () => {
  const { isPageLoading, error } = useAuth0();

  if (isPageLoading) {
    return <PageLoading />;
  }

  if (error) {
    return <pre className='p-8 bg-red-400 text-white'>{error.message}</pre>;
  }

  return <Auth0Handler />;
};

const Auth0Handler = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  useEffect(() => {
    if (user) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
    }
  }, [user, dispatch]);

  if (isAuthenticated) {
    return <AppContent logoutHandler={logout} />;
  }

  return <PageLoading />;
};

const AppContent = ({ logoutHandler }) => {
  return (
    <>
      <Router>
        <Header logoutHandler={logoutHandler} />
        <Errors />
        <main className='p-4'>
          <Routes />
        </main>
      </Router>
    </>
  );
};

export default App;
