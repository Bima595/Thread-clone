import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import TalkInput from '../components/TalkInput';
import TalksList from '../components/ChatList';
import { asyncPopulateUsersAndTalks } from '../states/shared/action';
import { asyncToogleLikeTalk } from '../states/talks/action';
 
function HomePage() {
  const {
    talks = [],
    users = [],
    authUser,
  } = useSelector((states) => states);
 
  const dispatch = useDispatch();
 
  useMemo(() => {
 
    dispatch(asyncPopulateUsersAndTalks());
  }, [dispatch]);
 
//   const onAddTalk = (text) => {
//     // @TODO: dispatch async action to add talk
//     dispatch(asyncAddTalk({ text }));
//   };
 
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
      {/* <TalkInput addTalk={onAddTalk} /> */}
      <TalksList talks={talkList} like={onLike} />
    </section>
  );
}
 
export default HomePage;