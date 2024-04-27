import api from '../../utils/api';

const ActionType = {
    RECEIVE_TALKS: 'RECEIVE_TALKS',
    ADD_TALK: 'ADD_TALK',
    TOGGLE_LIKE_TALK: 'TOGGLE_LIKE_TALK',
  };
   
  function receiveTalksActionCreator(talks, title,category, body) {
    return {
      type: ActionType.RECEIVE_TALKS,
      payload: {
        talks,title,category, body
      },
    };
  }
   
  function addTalkActionCreator(talk, title,category, body) {
    return {
      type: ActionType.ADD_TALK,
      payload: {
        talk,title,category, body
      },
    };
  }
   
  function toggleLikeTalkActionCreator({ talkId, userId }) {
    return {
      type: ActionType.TOGGLE_LIKE_TALK,
      payload: {
        talkId,
        userId,
      },
    };
  }

  function asyncAddTalk({ title,category, body }) {
    return async (dispatch) => {
      try {
        const talk = await api.createTalk({ title,category, body });
        dispatch(addTalkActionCreator(talk));
      } catch (error) {
        alert(error.message);
      }
    };
  }
   
  function asyncToogleLikeTalk(talkId) {
    return async (dispatch, getState) => {
      const { authUser } = getState();
      dispatch(toggleLikeTalkActionCreator({ talkId, userId: authUser.id }));
   
      try {
        await api.toggleLikeTalk(talkId);
      } catch (error) {
        alert(error.message);
        dispatch(toggleLikeTalkActionCreator({ talkId, userId: authUser.id }));
      }
    };
  }

  export {
    ActionType,
    receiveTalksActionCreator,
    addTalkActionCreator,
    toggleLikeTalkActionCreator,
    asyncAddTalk,
    asyncToogleLikeTalk,
  };