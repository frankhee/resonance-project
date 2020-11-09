import HttpRequest from './HttpRequest';

//Request to register new user
function registerUser(userData) {
  return HttpRequest({
    url: `/api/users/register`,
    method: `POST`,
    data: userData
  });
}

//Request to login user
function loginUser(userData) {
  return HttpRequest({
    url: `/api/users/login`,
    method: `POST`,
    data: userData
  });
}

const UserServices = {
  registerUser,
  loginUser
};

export default UserServices;