import {
  UPDATE_POSTS,
  ADD_POST,
  ADD_COMMENT,
  UPDATE_POST_LIKE,
  UPDATE_COMMENT_LIKE,
} from '../actions/actionTypes';

export default function posts(state = [], action) {
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
    case ADD_POST:
      return [action.post, ...state];
    case ADD_COMMENT:
      const newPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            comments: [action.comment, ...post.comments],
          };
        }

        return post;
      });
      return newPosts;
    case UPDATE_POST_LIKE:
      if(action.deleted)
      {
        const updatedPosts = state.map((post) => {
          if (post._id === action.postId) {
            const likes=post.likes.filter((ele)=>
            ele !== action.userId
            )
            return {
              ...post,
              likes: likes,
            };
          }
  
          return post;
        });
        return updatedPosts;

      }
      else{
        const updatedPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            likes: [...post.likes, action.userId],
          };
        }

        return post;
      });
      return updatedPosts;
      }
      

      
    case UPDATE_COMMENT_LIKE:
      if(action.deleted)
      {
        const updatedComment = state.map((post) => {
          //inside the post array traverse the comments array
          const updatedComments = post.comments.map((comment) => {
            if (comment._id === action.commentId) {
              const likes=comment.likes.filter((ele)=>
            ele !== action.userId
            )
              const comments = {
                ...comment,
                likes: likes,
              };
  
              return comments;
            } else {
              return comment;
            }
          });
          return {
            ...post,
            comments: updatedComments,
          };
        });
        return updatedComment;
      }
      else
      {
        const updatedComment = state.map((post) => {
          //inside the post array traverse the comments array
          const updatedComments = post.comments.map((comment) => {
            if (comment._id === action.commentId) {
              const comments = {
                ...comment,
                likes: [...comment.likes, action.userId],
              };
  
              return comments;
            } else {
              return comment;
            }
          });
          return {
            ...post,
            comments: updatedComments,
          };
        });
        return updatedComment;
      }
      
    default:
      return state;
  }
}
