import HttpRequest from './HttpRequest';

function registerUser(userData) {
  return HttpRequest({
    url: `/api/users/register`,
    method: `POST`,
    data: userData
  });
}

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