import {makeRequest} from './client/authHelpers';

makeRequest('login', 'POST', {
  password: 'user1',
  email: 'user1@email.com'
  });