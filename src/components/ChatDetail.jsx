import React from "react";
import PropTypes from "prop-types";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import api from "../utils/api";
import { formatDistanceToNow } from 'date-fns';
import "../styles/ChatDetail.css";

function ChatDetail({ thread, authUser, ...props }) {
  const isUserLike = thread && thread.upVotesBy ? thread.upVotesBy.includes(authUser) : false;
  const isUserDislike = thread && thread.downVotesBy ? thread.downVotesBy.includes(authUser) : false;
  const [likeCount, setLikeCount] = React.useState(thread && thread.upVotesBy ? thread.upVotesBy.length : 0);
  const [dislikeCount, setDislikeCount] = React.useState(thread && thread.downVotesBy ? thread.downVotesBy.length : 0);
  const createdAt = thread && thread.createdAt ? thread.createdAt : "";
  const title = thread && thread.title ? thread.title : "";
  const body = thread && thread.body ? thread.body : "";
  const category = thread && thread.category ? thread.category : "";
  const createdAtText = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  const [isLiked, setIsLiked] = React.useState(isUserLike);
  const [isDisliked, setIsDisliked] = React.useState(isUserDislike);
  const [isNeutral, setIsNeutral] = React.useState(!isUserLike && !isUserDislike);

  React.useEffect(() => {
    const likeStatus = localStorage.getItem(`like-${thread.id}`);
    const dislikeStatus = localStorage.getItem(`dislike-${thread.id}`);

    if (likeStatus === "true") {
      setIsLiked(true);
      setIsDisliked(false);
      setIsNeutral(false);
    } else if (dislikeStatus === "true") {
      setIsLiked(false);
      setIsDisliked(true);
      setIsNeutral(false);
    }
  }, [thread.id]);

  const updateLikeCount = (newCount) => {
    setLikeCount(newCount);
  };

  const updateDislikeCount = (newCount) => {
    setDislikeCount(newCount);
  };

  const onVoteClickHandler = async (btn) => {
    try {
      if (!isNeutral && isLiked && !isDisliked && btn === "like") {
        await api.neutralVote(thread.id);
        localStorage.setItem(`like-${thread.id}`, "false");
        setIsNeutral(true);
        setIsLiked(false);
        setIsDisliked(false);
        updateLikeCount(likeCount - 1);
      } else if (!isNeutral && !isLiked && isDisliked && btn === "dislike") {
        await api.neutralVote(thread.id);
        localStorage.setItem(`dislike-${thread.id}`, "false");
        setIsNeutral(true);
        setIsLiked(false);
        setIsDisliked(false);
        updateDislikeCount(dislikeCount - 1);
      } else if (isNeutral && btn === "like") {
        await api.upVoteThread(thread.id);
        localStorage.setItem(`like-${thread.id}`, "true");
        setIsLiked(true);
        setIsDisliked(false);
        setIsNeutral(false);
        updateLikeCount(likeCount + 1);
      } else if (isNeutral && btn === "dislike") {
        await api.downVoteThread(thread.id);
        localStorage.setItem(`dislike-${thread.id}`, "true");
        setIsLiked(false);
        setIsDisliked(true);
        setIsNeutral(false);
        updateDislikeCount(dislikeCount + 1);
      } else if (!isNeutral && isDisliked && !isLiked && btn === "like") {
        await api.upVoteThread(thread.id);
        localStorage.setItem(`like-${thread.id}`, "true");
        localStorage.setItem(`dislike-${thread.id}`, "false");
        setIsLiked(true);
        setIsDisliked(false);
        setIsNeutral(false);
        updateLikeCount(likeCount + 1);
        updateDislikeCount(dislikeCount - 1);
      } else if (!isNeutral && !isDisliked && isLiked && btn === "dislike") {
        await api.downVoteThread(thread.id);
        localStorage.setItem(`like-${thread.id}`, "false");
        localStorage.setItem(`dislike-${thread.id}`, "true");
        setIsLiked(false);
        setIsDisliked(true);
        setIsNeutral(false);
        updateLikeCount(likeCount - 1);
        updateDislikeCount(dislikeCount + 1);
      }
    } catch (error) {
      console.error("Failed to like/dislike thread:", error);
    }
  };

  return (
    <div key={thread && thread.id} className="chat-item" {...props}>
      <div className="chat-item__user-photo">
        <img src={thread.owner.avatar} alt={thread.owner.name} />
      </div>
      <div className="chat-item__detail">
        <header>
          <div className="chat-item__user-info">
            <p className="chat-item__user-name">{thread.owner.name}</p>
          </div>
        </header>
        <article>
          <h2>{title}</h2>
          <div dangerouslySetInnerHTML={{ __html: body }} />
          <p>Category: {category}</p>
        </article>
        <div className="chat-item__likes">
          <div>
            <button type="button" aria-label="like" onClick={() => onVoteClickHandler('like')}>
              <FaThumbsUp style={{ color: isLiked && !isNeutral ? 'blue' : 'gray' }} />
              <span>{likeCount}</span>
            </button>{' '}
            <button type="button" aria-label="dislike" onClick={() => onVoteClickHandler('dislike')}>
              <FaThumbsDown style={{ color: isDisliked && !isNeutral ? 'blue' : 'gray' }} />
              <span>{dislikeCount}</span>
            </button>
            <p className="chat-item__created-at">{createdAtText}</p>
          </div>
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
