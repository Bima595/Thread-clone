import PropTypes from "prop-types";
import { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaReply } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import api from "../utils/api";
import "../styles/ChatItem.css";
function TalkItem({ talk, authUser, ...props }) {
  const isUserLike = talk?.upVotesBy?.includes(authUser);
  const isUserDislike = talk?.downVotesBy?.includes(authUser);
  const [likeCount, setLikeCount] = useState(talk?.upVotesBy?.length ?? 0);
  const [dislikeCount, setDislikeCount] = useState(
    talk?.downVotesBy?.length ?? 0
  );
  const [isLiked, setIsLiked] = useState(
    isUserLike || localStorage.getItem(`liked_${talk.id}`) === "true"
  );
  const [isDisliked, setIsDisliked] = useState(
    isUserDislike || localStorage.getItem(`disliked_${talk.id}`) === "true"
  );
  const [isNeutral, setIsNeutral] = useState(
    !isUserLike &&
      !isUserDislike &&
      localStorage.getItem(`liked_${talk.id}`) !== "true" &&
      localStorage.getItem(`disliked_${talk.id}`) !== "true"
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
        localStorage.removeItem(`liked_${talk.id}`);
        setLikeCount(likeCount - 1);
      } else if (!isNeutral && !isLiked && isDisliked && btn === "dislike") {
        await api.neutralVote(talk.id);
        setIsNeutral(true);
        setIsLiked(false);
        setIsDisliked(false);
        localStorage.removeItem(`disliked_${talk.id}`);
        setDislikeCount(dislikeCount - 1);
      } else if (isNeutral && btn === "like") {
        await api.upVoteThread(talk.id);
        setIsLiked(true);
        setIsDisliked(false);
        setIsNeutral(false);
        localStorage.setItem(`liked_${talk.id}`, "true");
        setLikeCount(likeCount + 1);
      } else if (isNeutral && btn === "dislike") {
        await api.downVoteThread(talk.id);
        setIsLiked(false);
        setIsDisliked(true);
        setIsNeutral(false);
        localStorage.setItem(`disliked_${talk.id}`, "true");
        setDislikeCount(dislikeCount + 1);
      } else if (!isNeutral && isDisliked && !isLiked && btn === "like") {
        await api.upVoteThread(talk.id);
        setIsLiked(true);
        setIsDisliked(false);
        setIsNeutral(false);
        localStorage.setItem(`liked_${talk.id}`, "true");
        localStorage.removeItem(`disliked_${talk.id}`);
        setLikeCount(likeCount + 1);
        setDislikeCount(dislikeCount - 1);
      } else if (!isNeutral && !isDisliked && isLiked && btn === "dislike") {
        await api.downVoteThread(talk.id);
        setIsLiked(false);
        setIsDisliked(true);
        setIsNeutral(false);
        localStorage.setItem(`disliked_${talk.id}`, "true");
        localStorage.removeItem(`liked_${talk.id}`);
        setDislikeCount(dislikeCount + 1);
        setLikeCount(likeCount - 1);
      }
    } catch (error) {
      console.error("Failed to like/dislike talk:", error);
    }
  };

  const onTalkClick = () => {
    if (talk && talk.id) {
      navigate(`/threads/${talk.id}`);
    }
  };

  const keyPressHandler = (event) => {
    if ((event.key === "Enter" || event.key === " ") && talk && talk.id) {
      navigate(`/threads/${talk.id}`);
    }
  };

  const createdAtFormatted = formatDistanceToNow(new Date(talk?.createdAt), {
    addSuffix: true,
  });

  return (
    <div
      key={talk?.id}
      role="button"
      tabIndex={0}
      className="talk-item"
      onClick={onTalkClick}
      onKeyDown={keyPressHandler}
      {...props}
    >
      <div className="talk-item__detail">
        <header>
          <div className="talk-item__user-info"></div>
          <p className="talk-item__created-at">{createdAtFormatted}</p>
        </header>
        <article>
          <h2>{talk?.title}</h2>
          <p
  className="talk-item__text"
  dangerouslySetInnerHTML={{ __html: talk?.body }}
/>
          <p>Category: {talk?.category}</p>
        </article>

        <div className="talk-item__likes">
          <div>
            <button
              type="button"
              aria-label="like"
              onClick={(event) => {
                event.stopPropagation();
                onVoteClickHandler("like", event);
              }}
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
              onClick={(event) => {
                event.stopPropagation();
                onVoteClickHandler("dislike", event);
              }}
            >
              <FaThumbsDown
                style={{
                  color: isDisliked && !isNeutral ? "blue" : "gray",
                }}
              />
              <span>{dislikeCount}</span>
            </button>
            <FaReply /> {talk?.totalComments}
            <div className="talk-item__user-name">
              Dibuat oleh: <span>{talk?.ownerData?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TalkItem.propTypes = {
  talk: PropTypes.object,
  authUser: PropTypes.string.isRequired,
};

export default TalkItem;
