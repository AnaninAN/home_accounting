import { App } from 'components/App';
import { UserRedux } from 'containers/UserContainer';

export const routes = [
  {
    path: '/',
    exact: true,
    component: App,
  },
  {
    path: '/auth',
    exact: true,
    component: UserRedux,
  }
];