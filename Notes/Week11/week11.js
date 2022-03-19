import {makeRequest} from '/client/authHelpers';
console.log('hello')
makeRequest('login', 'POST', {
  password: 'user1',
  email: 'user1@email.com',
  });

