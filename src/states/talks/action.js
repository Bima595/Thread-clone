import api from '../../utils/api';

const ActionType = {
  RECEIVE_TALKS: 'RECEIVE_TALKS',
  ADD_TALK: 'ADD_TALK',
  TOGGLE_LIKE_TALK: 'TOGGLE_LIKE_TALK',
  ADD_COMMENT: 'ADD_COMMENT', 
};

function receiveTalksActionCreator(talks) {
  return {
    type: ActionType.RECEIVE_TALKS,
    payload: {
      talks,
    },
  };
}

function addTalkActionCreator(talk) {
  return {
    type: ActionType.ADD_TALK,
    payload: {
      talk,
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

function addCommentActionCreator(comment, talkId) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
      talkId,
    },
  };
}

function asyncAddComment(talkId, content) {
  return async (dispatch) => {
    try {
      const comment = await api.createComment({ talkId, content });
      dispatch(addCommentActionCreator(comment, talkId));
    } catch (error) {
      alert(error.message);
    }
  };
}


function asyncAddTalk({ title, category, body }) {
  return async (dispatch) => {
    try {
      const talk = await api.createTalk({ title, category, body });
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
  addCommentActionCreator,
  asyncAddComment
};
