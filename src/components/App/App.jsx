import React from 'react';

import { PrivateRoute } from 'components/PrivateRoute';
import { DashboardRedux } from 'containers/DashboardContainer';

export const App = () => {
  return (
  <div>
    <PrivateRoute path='/' component={DashboardRedux} exact/>
  </div>
  );
}