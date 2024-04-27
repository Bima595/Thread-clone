import api from "../../utils/api";

const ActionType = {
  RECEIVE_TALK_DETAIL: "RECEIVE_TALK_DETAIL",
  CLEAR_TALK_DETAIL: "CLEAR_TALK_DETAIL",
  TOGGLE_LIKE_TALK_DETAIL: "TOGGLE_LIKE_TALK_DETAIL",
};

function receiveTalkDetailActionCreator(detailThread) {
   
  return {
    type: ActionType.RECEIVE_TALK_DETAIL,
    payload: {
      detailThread,
    },
  };
}

function clearTalkDetailActionCreator() {
  return {
    type: ActionType.CLEAR_TALK_DETAIL,
  };
}

function toggleLikeTalkDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_LIKE_TALK_DETAIL,
    payload: {
      userId,
    },
  };
}

const asyncReceiveTalkDetail = (talkId) => {
  return async (dispatch) => {
    dispatch(clearTalkDetailActionCreator());
    try {
      const talkDetail = await api.getTalkDetail(talkId);
      console.log(talkDetail);
      dispatch(receiveTalkDetailActionCreator(talkDetail));
    } catch (error) {
      console.log(error.message);
    }
  };
};

function asyncToogleLikeTalkDetail() {
  return async (dispatch, getState) => {
    const { authUser, talkDetail } = getState();
    dispatch(toggleLikeTalkDetailActionCreator(authUser.id));

    try {
      await api.toggleLikeTalk(talkDetail.id);
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveTalkDetailActionCreator,
  clearTalkDetailActionCreator,
  toggleLikeTalkDetailActionCreator,
  asyncReceiveTalkDetail,
  asyncToogleLikeTalkDetail,
};
