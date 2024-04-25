import PropTypes from "prop-types";
import React from "react";
import { FaThumbsUp, FaThumbsDown, FaReply } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function TalkItem({ talk, ...props }) {
  const isUserLike = talk.upVotesBy.includes(talk.authUser);
  const isUserDislike = talk.downVotesBy.includes(talk.authUser);

  const likeCount = talk.upVotesBy.length;
  const dislikeCount = talk.downVotesBy.length;

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
        await api.neutralVote(talk.id);
        setIsNeutral(true);
        setIsLiked(false);
        setIsDisliked(false);
      } else if (!isNeutral && !isLiked && isDisliked && btn === "dislike") {
        await api.neutralVote(talk.id);
        setIsNeutral(true);
        setIsLiked(false);
        setIsDisliked(false);
      } else if (isNeutral && btn === "like") {
        await api.upVoteThread(talk.id);
        setIsLiked(true);
        setIsDisliked(false);
        setIsNeutral(false);
      } else if (isNeutral && btn === "dislike") {
        await api.downVoteThread(talk.id);
        setIsLiked(false);
        setIsDisliked(true);
        setIsNeutral(false);
      } else if (!isNeutral && isDisliked && !isLiked && btn === "like") {
        await api.upVoteThread(talk.id);
        setIsLiked(true);
        setIsDisliked(false);
        setIsNeutral(false);
      } else if (!isNeutral && !isDisliked && isLiked && btn === "dislike") {
        await api.downVoteThread(talk.id);
        setIsLiked(false);
        setIsDisliked(true);
        setIsNeutral(false);
      }
    } catch (error) {
      console.error("Failed to like/dislike talk:", error);
    }
  };

  const onTalkClick = () => {
    navigate(`/threads/${talk.id}`);
  };

  const onTalkPress = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      navigate(`/threads/${talk.id}`);
    }
  };

  console.log();
  return (
    <div
      key={talk.id}
      role="button"
      tabIndex={0}
      className="talk-item"
      // onClick={onTalkClick}
      // onKeyDown={onTalkPress}
      {...props}
    >
      <div className="talk-item__user-photo">
        <img src={talk.ownerData.avatar} alt={talk.ownerData.avatar} />
      </div>
      <div className="talk-item__detail">
        <header>
          <div className="talk-item__user-info">
            <p className="talk-item__user-name">{talk.ownerData.name}</p>
            <p className="talk-item__user-id">{talk.ownerData.email}</p>
          </div>
          <p className="talk-item__created-at">{talk.createdAt}</p>
        </header>
        <article>
          <h2>{talk.title}</h2>
          <p className="talk-item__text">{talk.body}</p>
          <p>Category: {talk.category}</p>
        </article>

        <div className="talk-item__likes">
          <p>
            <button
              type="button"
              aria-label="like"
              onClick={() => onVoteClickHandler("like", event)}
            >
              <FaThumbsUp
                style={{
                  color: isLiked && !isNeutral ? "blue" : "gray",
                }}
              />
              <span>{likeCount}</span>
            </button>{" "}
            <button
              type="button"
              aria-label="dislike"
              onClick={() => onVoteClickHandler("dislike", event)}
            >
              <FaThumbsDown
                style={{
                  color: isDisliked && !isNeutral ? "blue" : "gray",
                }}
              />
              <span>{dislikeCount}</span>
            </button>
            <FaReply /> {talk.totalComments}
          </p>
        </div>
      </div>
    </div>
  );
}

TalkItem.propTypes = {
  talk: PropTypes.object,
};

export default TalkItem;
