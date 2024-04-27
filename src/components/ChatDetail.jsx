import React from "react";
import PropTypes from "prop-types";
import { FaThumbsUp, FaThumbsDown, FaReply } from "react-icons/fa";
import api from "../utils/api";
import { formatDistanceToNow } from 'date-fns';

function ChatDetail({ thread, authUser, ...props }) {
  const isUserLike =
    thread && thread.upVotesBy ? thread.upVotesBy.includes(authUser) : false;
  const isUserDislike =
    thread && thread.downVotesBy ? thread.downVotesBy.includes(authUser) : false;
  const likeCount = thread && thread.upVotesBy ? thread.upVotesBy.length : 0;
  const dislikeCount = thread && thread.downVotesBy ? thread.downVotesBy.length : 0;
  const ownerData = thread && thread.ownerData ? thread.ownerData : { name: "", email: "", avatar: "" };
  const createdAt = thread && thread.createdAt ? thread.createdAt : "";
  const title = thread && thread.title ? thread.title : "";
  const body = thread && thread.body ? thread.body : "";
  const category = thread && thread.category ? thread.category : "";
  const totalComments = thread && thread.totalComments ? thread.totalComments : 0;
  const createdAtText = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  
  const [isLiked, setIsLiked] = React.useState(isUserLike);
  const [isDisliked, setIsDisliked] = React.useState(isUserDislike);
  const [isNeutral, setIsNeutral] = React.useState(
    !isUserLike && !isUserDislike
  );



  const onVoteClickHandler = async (btn) => {
    try {
      if (!isNeutral && isLiked && !isDisliked && btn === "like") {
        await api.neutralVote(thread.id);
        setIsNeutral(true);
        setIsLiked(false);
        setIsDisliked(false);
      } else if (!isNeutral && !isLiked && isDisliked && btn === "dislike") {
        await api.neutralVote(thread.id);
        setIsNeutral(true);
        setIsLiked(false);
        setIsDisliked(false);
      } else if (isNeutral && btn === "like") {
        await api.upVoteThread(thread.id);
        setIsLiked(true);
        setIsDisliked(false);
        setIsNeutral(false);
      } else if (isNeutral && btn === "dislike") {
        await api.downVoteThread(thread.id);
        setIsLiked(false);
        setIsDisliked(true);
        setIsNeutral(false);
      } else if (!isNeutral && isDisliked && !isLiked && btn === "like") {
        await api.upVoteThread(thread.id);
        setIsLiked(true);
        setIsDisliked(false);
        setIsNeutral(false);
      } else if (!isNeutral && !isDisliked && isLiked && btn === "dislike") {
        await api.downVoteThread(thread.id);
        setIsLiked(false);
        setIsDisliked(true);
        setIsNeutral(false);
      }
    } catch (error) {
      console.error("Failed to like/dislike thread:", error);
    }
  };



  return (
    <div
      key={thread && thread.id}
      className="chat-item"
      {...props}
    >
      <div className="chat-item__user-photo">
        <img src={ownerData.avatar} alt={ownerData.name} />
      </div>
      <div className="chat-item__detail">
        <header>
          <div className="chat-item__user-info">
            <p className="chat-item__user-name">{ownerData.name}</p>
            <p className="chat-item__user-id">{ownerData.email}</p>
          </div>
          <p className="chat-item__created-at">{createdAtText}</p>
        </header>
        <article>
          <h2>{title}</h2>
          <p className="chat-item__text">{body}</p>
          <p>Category: {category}</p>
        </article>
  
        <div className="chat-item__likes">
          <p>
            <button
              type="button"
              aria-label="like"
              onClick={() => onVoteClickHandler('like')}
            >
              <FaThumbsUp
                style={{
                  color: isLiked && !isNeutral ? 'blue' : 'gray',
                }}
              />
              <span>{likeCount}</span>
            </button>{' '}
            <button
              type="button"
              aria-label="dislike"
              onClick={() => onVoteClickHandler('dislike')}
            >
              <FaThumbsDown
                style={{
                  color: isDisliked && !isNeutral ? 'blue' : 'gray',
                }}
              />
              <span>{dislikeCount}</span>
            </button>
            <button
              type="button"
              aria-label="reply"
              onClick={() => console.log("Reply clicked")} // Implement reply functionality here
            >
              <FaReply />
            </button>
            <span>{totalComments}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

ChatDetail.propTypes = {
  thread: PropTypes.object,
  authUser: PropTypes.string.isRequired,
};

export default ChatDetail;
