import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncReceiveTalkDetail } from "../states/talkDetail/action";
import { asyncAddTalk } from "../states/talks/action";
import {
  asyncUpvoteComment,
  asyncDownvoteComment,
} from "../states/talkDetail/action";
import ChatDetail from "../components/ChatDetail";
import ChatReplyInput from "../components/ChatReplyInput";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { formatDistanceToNow } from 'date-fns';
import "../styles/DetailPage.css";

function DetailPage() {
  const { id } = useParams();
  const { detailThread, authUser } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(true);
  const [likedComments, setLikedComments] = useState([]);
  const [dislikedComments, setDislikedComments] = useState([]);

  useEffect(() => {
    dispatch(asyncReceiveTalkDetail(id));
  }, [id, dispatch]);

  useEffect(() => {
    const likedCommentsStorage = JSON.parse(localStorage.getItem('likedComments')) || [];
    const dislikedCommentsStorage = JSON.parse(localStorage.getItem('dislikedComments')) || [];
    setLikedComments(likedCommentsStorage);
    setDislikedComments(dislikedCommentsStorage);
  }, []);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleUpvote = (commentId) => {
    const updatedLikedComments = [...likedComments];
    const updatedDislikedComments = [...dislikedComments];
  
    if (likedComments.includes(commentId)) {
      updatedLikedComments.splice(updatedLikedComments.indexOf(commentId), 1);
    } else {
      updatedLikedComments.push(commentId);
      updatedDislikedComments.splice(
        updatedDislikedComments.indexOf(commentId),
        1
      );
    }
  
    setLikedComments(updatedLikedComments);
    setDislikedComments(updatedDislikedComments);
  
    localStorage.setItem("likedComments", JSON.stringify(updatedLikedComments));
    localStorage.setItem("dislikedComments", JSON.stringify(updatedDislikedComments));
  
    dispatch(asyncUpvoteComment(id, commentId)).then(() => {
      dispatch(asyncReceiveTalkDetail(id));
    });
  };
  
  const handleDownvote = (commentId) => {
    const updatedDislikedComments = [...dislikedComments];
    const updatedLikedComments = [...likedComments];
  
    if (dislikedComments.includes(commentId)) {
      updatedDislikedComments.splice(updatedDislikedComments.indexOf(commentId), 1);
    } else {
      updatedDislikedComments.push(commentId);
      updatedLikedComments.splice(updatedLikedComments.indexOf(commentId), 1); 
    }
  
    setDislikedComments(updatedDislikedComments);
    setLikedComments(updatedLikedComments);
  
    localStorage.setItem("dislikedComments", JSON.stringify(updatedDislikedComments));
    localStorage.setItem("likedComments", JSON.stringify(updatedLikedComments));
  
    dispatch(asyncDownvoteComment(id, commentId)).then(() => {
      // Refresh the detail page after downvote
      dispatch(asyncReceiveTalkDetail(id));
    });
  };
  

  const sortedComments = detailThread
    ? [...detailThread.comments].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      )
    : [];

  const formatTimeDistance = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <section className="detail-page">
      {detailThread && (
        <>
          <div className="detail-page__parent">
            <h3>Replying To</h3>
            <ChatDetail
              thread={{ ...detailThread, comments: [] }}
              authUser={authUser}
            />
            <ChatReplyInput
              replyTalk={(text) =>
                dispatch(asyncAddTalk({ text, replyTo: id }))
              }
            />
          </div>
          <div className="detail-page__comments">
            <button onClick={toggleComments}>
              {showComments ? "Hide Comments" : "Show Comments"}
            </button>
            {showComments && (
              <div className="detail-page__comments-list">
              {sortedComments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-avatar">
                    <img src={comment.owner.avatar} alt="Avatar" />
                  </div>
                  <div className="comment-content">
                    <p className="owner-name">{comment.owner.name}</p>
                    <div dangerouslySetInnerHTML={{ __html: comment.content }} />
                    <div className="comment-actions">
                      <button
                        onClick={() => handleUpvote(comment.id)}
                        style={{
                          color: likedComments.includes(comment.id) ? "blue" : "black",
                        }}
                      >
                        <FaThumbsUp /> {comment.upVotesBy.length}
                      </button>
                      <button
                        onClick={() => handleDownvote(comment.id)}
                        style={{
                          color: dislikedComments.includes(comment.id) ? "blue" : "black",
                        }}
                      >
                        <FaThumbsDown /> {comment.downVotesBy.length}
                      </button>
                      <p className="time">{formatTimeDistance(comment.createdAt)}</p>  
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default DetailPage;
