import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TalkInput from "../components/ChatInput";
import TalksList from "../components/ChatList";
import { asyncPopulateUsersAndTalks } from "../states/shared/action";
import { asyncAddTalk, asyncToogleLikeTalk } from "../states/talks/action";

function HomePage() {
  const { talks = [], users = [], authUser } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndTalks());
  }, [dispatch]);

  const onAddTalk = (text) => {
    dispatch(asyncAddTalk({ text }));
  };

  const onLike = (id) => {
    dispatch(asyncToogleLikeTalk(id));
  };

  const talkList = talks.map((talk) => ({
    ...talk,
    user: users.find((user) => user.id === talk.user),
    authUser: authUser.id,
  }));

  return (
    <section className="home-page">
      <TalkInput addTalk={onAddTalk} />
      <TalksList body={talkList} />
    </section>
  );
}

export default HomePage;
