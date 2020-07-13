import {
  UPDATE_POSTS,
  ADD_POST,
  ADD_COMMENT,
  UPDATE_POST_LIKE,
  UPDATE_COMMENT_LIKE,
} from './actionTypes';
export function fetchPosts() {
  return (dispatch) => {
    const url = '/api/v1/posts';
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
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
    const url = '/api/v1/posts/create';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: getFormBody({ content }),
    })
      .then((response) => response.json())
      .then((data) => {

        if (data.success) {
          dispatch(addPost(data.data.post));
        }
      });
  };
}

export function createComment(content, postId) {
  return (dispatch) => {
    const url = '/api/v1/comments/';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: getFormBody({ content, post_id: postId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(addComment(data.data.comment, postId));
        }
      }).catch(console.log("errrororrrrrrrrrr"));
  };
}

export function addComment(comment, postId) {
  return {
    type: ADD_COMMENT,
    comment,
    postId,
  };
}

//liking a post
export function addLike(id, likeType, userId) {
  return (dispatch) => {
    const url = `/api/v1/likes/toggle?likeable_id=${id}&likeable_type=${likeType}`;

    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {

        if (data.success) {
          if (likeType === 'Post') {
            dispatch(addLikeToStore(id, userId,data.deleted));
          } else {
            dispatch(addLikeToStore2(id, userId,data.deleted));
            //console.log("comment likeddddddd" ,data);
          }
        }
      });
  };
}

export function addLikeToStore(postId, userId,deleted) {
  return {
    type: UPDATE_POST_LIKE,
    postId,
    userId,
    deleted
  };
}

export function addLikeToStore2(commentId, userId,deleted) {
  return {
    type: UPDATE_COMMENT_LIKE,
    commentId: commentId,
    userId: userId,
    deleted
  };
}
