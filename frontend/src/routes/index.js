import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

import MeetupDetails from '../pages/MeetupDetails';
import MeetupCreate from '../pages/MeetupCreate';
import MeetupEdit from '../pages/MeetupEdit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/meetup" exact component={MeetupCreate} isPrivate />
      <Route path="/meetup/:id" exact component={MeetupEdit} isPrivate />
      <Route
        path="/meetup/:id/details"
        exact
        component={MeetupDetails}
        isPrivate
      />

      <Route path="/" component={() => <h1>404 - Page is not found.</h1>} />
    </Switch>
  );
}
