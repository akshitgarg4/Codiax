import React from 'react';
import { addLike } from '../actions/posts';

function handleCommentLike(commentsid, userId, dispatch) {
  dispatch(addLike(commentsid, 'Comment', userId));
}

function Comment({ comment, dispatch, userId }) {
  const isCommentLikedByUser = comment.likes.includes(userId);
  return (
    <div className="post-comment-item">
      <div className="post-comment-header">
        <span className="post-comment-author">{comment.user.name}</span>
        <span className="post-comment-time">{`${comment.createdAt.slice(
          0,
          10
        )}    ${comment.createdAt.slice(11, 19)}`}</span>

        <div
          className="post-comment-likes"
          onClick={() => handleCommentLike(comment._id, userId, dispatch)}
        >
          {isCommentLikedByUser ? (
            <span>
              <img
                style={{ width: 15, height: 10 }}
                src="https://image.flaticon.com/icons/svg/1076/1076984.svg"
                alt="like comment"
              />
              <strong>{comment.likes.length} Likes</strong>
            </span>
          ) : (
            <span>
              <img
                style={{ width: 15, height: 10 }}
                src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                alt="likes-comment"
              />
              <strong>{comment.likes.length} Likes</strong>
            </span>
          )}
        </div>
      </div>

      <div className="post-comment-content">{comment.content}</div>
    </div>
  );
}

export default Comment;
