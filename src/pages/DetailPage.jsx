import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncReceiveTalkDetail } from "../states/talkDetail/action";
import { asyncAddTalk } from "../states/talks/action";
import ChatItem  from "../components/ChatItem";
import ChatDetail  from "../components/ChatDetail";
import ChatReplyInput  from "../components/ChatReplyInput";

function DetailPage() {
  const { id } = useParams();
  console.log(id);
  const { detailThread, authUser } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveTalkDetail(id));
  }, [id, dispatch]);

  return (
    <section className="detail-page">
      {detailThread && (
        <>
          <div className="detail-page__parent">
            <h3>Replying To</h3>
            <ChatItem {...detailThread.talk} authUser={authUser.id} />
          </div>
          <ChatDetail {...detailThread} authUser={authUser.id} />
          <ChatReplyInput replyTalk={(text) => dispatch(asyncAddTalk({ text, replyTo: id }))} />
        </>
      )}
    </section>
  );
}


export default DetailPage;
