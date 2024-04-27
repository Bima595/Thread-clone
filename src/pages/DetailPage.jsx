import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncReceiveTalkDetail } from "../states/talkDetail/action";
import { asyncAddTalk } from "../states/talks/action";
import ChatDetail from "../components/ChatDetail";
import ChatReplyInput from "../components/ChatReplyInput";

function DetailPage() {
  const { id } = useParams();
  const { detailThread, authUser } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    dispatch(asyncReceiveTalkDetail(id));
  }, [id, dispatch]);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <section className="detail-page">
      {detailThread && (
        <>
          <div className="detail-page__parent">
            <h3>Replying To</h3>
            <ChatDetail thread={{ ...detailThread, comments: [] }} authUser={authUser} />
            <ChatReplyInput replyTalk={(text) => dispatch(asyncAddTalk({ text, replyTo: id }))} />
          </div>
          <div className="detail-page__comments">
            <button onClick={toggleComments}>
              {showComments ? "Hide Comments" : "Show Comments"}
            </button>
            {showComments && (
              <div className="detail-page__comments-list">
                {detailThread.comments.map((comment) => (
                  <ChatDetail key={comment.id} thread={comment} authUser={authUser} />
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
