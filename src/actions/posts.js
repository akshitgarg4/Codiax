import { UPDATE_POSTS,ADD_POST } from './actionTypes';
export function fetchPosts() {
  return (dispatch) => {
    const url = 'http://codeial.com:8000/api/v2/posts?page=1&limit=25';
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(updatePosts(data.data.posts));
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts: posts,
  };
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
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


export function createPost(content) {
  return (dispatch) => {
    const url ='http://codeial.com:8000/api/v2/posts/create';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('token')}`,

      },
      body: getFormBody ({ content } ),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('dATA', data);

        if (data.success) {
          dispatch(addPost(data.data.post));
        }
      });
  };
}
