import React from "react";
import PropTypes from "prop-types";
import { FaThumbsUp, FaThumbsDown, FaReply } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function ChatDetail({ chat, authUser, ...props }) {
  const isUserLike =
    chat && chat.upVotesBy ? chat.upVotesBy.includes(authUser) : false;
  const isUserDislike =
    chat && chat.downVotesBy ? chat.downVotesBy.includes(authUser) : false;
  const likeCount = chat && chat.upVotesBy ? chat.upVotesBy.length : 0;
  const dislikeCount = chat && chat.downVotesBy ? chat.downVotesBy.length : 0;
  const ownerData = chat && chat.ownerData ? chat.ownerData : { name: "", email: "", avatar: "" };
  const createdAt = chat && chat.createdAt ? chat.createdAt : "";
  const title = chat && chat.title ? chat.title : "";
  const body = chat && chat.body ? chat.body : "";
  const category = chat && chat.category ? chat.category : "";
  const totalComments = chat && chat.totalComments ? chat.totalComments : 0;

  
  const [isLiked, setIsLiked] = React.useState(isUserLike);
  const [isDisliked, setIsDisliked] = React.useState(isUserDislike);
  const [isNeutral, setIsNeutral] = React.useState(
    !isUserLike && !isUserDislike
  );

  const navigate = useNavigate();

  const onVoteClickHandler = async (btn, event) => {
    event.stopPropagation();
    try {
      if (!isNeutral && isLiked && !isDisliked && btn === "like") {
        await api.neutralVote(chat.id);
        setIsNeutral(true);
        setIsLiked(false);
        setIsDisliked(false);
      } else if (!isNeutral && !isLiked && isDisliked && btn === "dislike") {
        await api.neutralVote(chat.id);
        setIsNeutral(true);
        setIsLiked(false);
        setIsDisliked(false);
      } else if (isNeutral && btn === "like") {
        await api.upVoteThread(chat.id);
        setIsLiked(true);
        setIsDisliked(false);
        setIsNeutral(false);
      } else if (isNeutral && btn === "dislike") {
        await api.downVoteThread(chat.id);
        setIsLiked(false);
        setIsDisliked(true);
        setIsNeutral(false);
      } else if (!isNeutral && isDisliked && !isLiked && btn === "like") {
        await api.upVoteThread(chat.id);
        setIsLiked(true);
        setIsDisliked(false);
        setIsNeutral(false);
      } else if (!isNeutral && !isDisliked && isLiked && btn === "dislike") {
        await api.downVoteThread(chat.id);
        setIsLiked(false);
        setIsDisliked(true);
        setIsNeutral(false);
      }
    } catch (error) {
      console.error("Failed to like/dislike chat:", error);
    }
  };

  const onChatClick = () => {
    navigate(`/chats/${chat.id}`);
  };

  const onChatPress = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      navigate(`/chats/${chat.id}`);
    }
  };

  return (
    <div
      key={chat && chat.id}
      role="button"
      tabIndex={0}
      className="chat-item"
      onClick={onChatClick}
      onKeyDown={onChatPress}
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
          <p className="chat-item__created-at">{createdAt}</p>
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
              onClick={() => onVoteClickHandler('like', event)}
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
              onClick={() => onVoteClickHandler('dislike', event)}
            >
              <FaThumbsDown
                style={{
                  color: isDisliked && !isNeutral ? 'blue' : 'gray',
                }}
              />
              <span>{dislikeCount}</span>
            </button>
            <FaReply /> {totalComments}
          </p>
        </div>
      </div>
    </div>
  );
}

ChatDetail.propTypes = {
  chat: PropTypes.object,
  authUser: PropTypes.string.isRequired,
};

export default ChatDetail;
