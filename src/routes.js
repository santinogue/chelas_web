import React from 'react';
import {Route, IndexRedirect} from 'react-router';
import Layout from './layout/Layout';
import AdminLayout from './adminLayout';
import Home from './pages/home';
import AdminHome from './pages/adminHome';

const createRoutes = (store) => {
  // const reloadUserAndAuthenticate = ({ params }, replace) => {
  //   reloadUser();
  //   needAuthentication({params}, replace);
  // };
  //
  // const needAuthentication = ({ params }, replace) => {
  //   const { user } = store.getState();
  //
  //   if (!user.authenticated) {
  //     replace('/users/sign_in');
  //   }
  //
  //   if (user.force_pricing || user.user && user.user.force_pricing) {
  //     replace('/pricing');
  //   }
  // };
  //
  // const reloadUser = () => {
  //   const { user } = store.getState();
  //
  //   if (!user.authenticated) return;
  //
  //   api.getUser()
  //   .then(data => {
  //     store.dispatch({ type: actionTypes.RELOAD_USER_SUCCESS, user: data });
  //   })
  //   .catch(error => store.dispatch({ type: actionTypes.RELOAD_USER_FAILURE, error }));
  // };
  //
  // const logout = ({ params }, replace) => {
  //   store.dispatch({ type: 'LOGOUT' });
  //   replace('/users/sign_in');
  // };

  return (
    <div>
      <Route path='/' component={Layout}>
        <IndexRedirect to='/home' />
        <Route path='/home' component={Home} />

        <Route path='/admin' component={AdminLayout}>
          <IndexRedirect to='/admin/home' />
          <Route path='/admin/home' component={AdminHome} />
        </Route>

        {/* <Route path='/pricing' component={Pricing} />
        <Route path='/parcels_subscriptions' component={ParcelSubscription} onEnter={reloadUserAndAuthenticate} />
        <Route path='/parcels_subscription' component={ParcelSubscription} onEnter={reloadUserAndAuthenticate} />
        <Route path='/mobile' component={Mobile} />
        <Route path='/profile' component={Profile} onEnter={reloadUserAndAuthenticate} />
        <Route path='/profile/edit' component={ProfileEdit} onEnter={needAuthentication} />
        <Route path='/users/sign_in' component={SignIn} />
        <Route path='/logout' onEnter={logout} />
        <Route path='/signup/success' component={Pricing} />
        <Route path='/signup/parcels' component={Pricing} />
        <Route path='/impersonate_user' component={Dashboard} onEnter={needAuthentication} />
        <Route path='/users/new_password' component={RecoverPassword} /> */}
      </Route>

      {/* <Route path='/users/embed_sign_in/:email/:auth_token' component={EmbedSignIn} />
      <Route path='/:toolbox/maps/new' component={NewMap} onEnter={reloadUserAndAuthenticate} />
      <Route path='/:toolbox/maps/:mapId' component={EditMap} onEnter={reloadUserAndAuthenticate} />
      <Route path='/:toolbox/maps/:mapSlug/share' component={ShareMap} />
      <Route path='/:toolbox/maps/:mapSlug/embed' component={EmbedMap} /> */}
    </div>
  );
};

export default createRoutes;
