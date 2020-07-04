import {
  LOGIN_START,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP_START,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  AUTHENTICATE_USER,
  LOG_OUT,
  CLEAR_AUTH_STATE,
  EDIT_USER_SUCCESSFUL,
  EDIT_USER_FAILED
} from './actionTypes';

//login
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
          localStorage.setItem('token', data.data.token);
          dispatch(loginSuccess(data.data.user));
          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}

//signup
export function startsignup() {
  return {
    type: SIGNUP_START,
  };
}
export function signupFailed(errormsg) {
  return {
    type: SIGNUP_FAILURE,
    error: errormsg,
  };
}
export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user: user,
  };
}

export function signup(email, password, confirmpassword, name) {
  return (dispatch) => {
    dispatch(startsignup());
    const url = 'http://codeial.com:8000/api/v2/users/signup';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({
        email,
        password,
        confirm_password: confirmpassword,
        name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log('token',data.data.token);
          //localStorage.setItem('token', data.data.token);
          dispatch(signupSuccess(data.data.user));
          return;
        }
        dispatch(signupFailed(data.message));
      });
  };
}

//authenticate and logout
export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user: user,
  };
}

export function logoutUser() {
  return {
    type: LOG_OUT,
  };
}
export function clearAuth(){
  return {
    type:CLEAR_AUTH_STATE,
  };
}

//edit user profile
export function editUserSuccessful(user) {
  return {
    type: EDIT_USER_SUCCESSFUL,
    user,
  };
}

export function editUserFailed(error) {
  return {
    type: EDIT_USER_FAILED,
    error,
  };
}

export function editUser(name, password, confirmPassword, userId) {
  return (dispatch) => {
    const url = 'http://codeial.com:8000/api/v2/users/edit';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: getFormBody({
        name,
        password,
        confirm_password: confirmPassword,
        id: userId,
      }),
    })
      .then((repsonse) => repsonse.json())
      .then((data) => {
        console.log('data', data);
        if (data.success) {
          dispatch(editUserSuccessful(data.data.user));

          if (data.data.token) {
            localStorage.setItem('token', data.data.token);
          }
          return;
        }

        dispatch(editUserFailed(data.message));
      });
  };
}