import { LOGIN_START, LOGIN_FAILURE, LOGIN_SUCCESS } from './actionTypes';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginFailed(errormsg) {
  return {
    type: LOGIN_FAILURE,
    error: errormsg,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user: user,
  };
}
function getFormBody(params) {
  let FormBody = [];
  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);
    FormBody.push(encodedKey + '=' + encodedValue);
  }
  return FormBody.join('&');
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = 'http://codeial.com:8000/api/v2/users/login';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          dispatch(loginSuccess(data.data.user));
          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}
