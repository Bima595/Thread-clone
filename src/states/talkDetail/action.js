import api from "../../utils/api";

const ActionType = {
  RECEIVE_TALK_DETAIL: "RECEIVE_TALK_DETAIL",
  CLEAR_TALK_DETAIL: "CLEAR_TALK_DETAIL",
  TOGGLE_LIKE_TALK_DETAIL: "TOGGLE_LIKE_TALK_DETAIL",
  UPVOTE_COMMENT: "UPVOTE_COMMENT",
  DOWNVOTE_COMMENT: "DOWNVOTE_COMMENT",
  CREATE_COMMENT: "CREATE_COMMENT", 
};


function createCommentActionCreator(comment) {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: {
      comment,
    },
  };
}

const asyncCreateComment = (threadId, content) => {
  return async (dispatch) => {
    try {
      const newComment = await api.createComment(threadId, content);
      dispatch(createCommentActionCreator(newComment));
    } catch (error) {
      console.log(error.message);
    }
  };
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

function upvoteCommentActionCreator(commentId) {
  return {
    type: ActionType.UPVOTE_COMMENT,
    payload: {
      commentId,
    },
  };
}

function downvoteCommentActionCreator(commentId) {
  return {
    type: ActionType.DOWNVOTE_COMMENT,
    payload: {
      commentId,
    },
  };
}

const asyncReceiveTalkDetail = (talkId) => {
  return async (dispatch) => {
    dispatch(clearTalkDetailActionCreator());
    try {
      const talkDetail = await api.getTalkDetail(talkId);
      console.log(talkDetail.comments);
      dispatch(receiveTalkDetailActionCreator(talkDetail));
    } catch (error) {
      console.log(error.message);
    }
  };
};

const asyncUpvoteComment = (threadId, commentId) => {
  return async (dispatch) => {
    try {
      await api.upVoteComment(threadId, commentId);
      dispatch(upvoteCommentActionCreator(commentId));
    } catch (error) {
      console.log(error.message);
    }
  };
};

const asyncDownvoteComment = (threadId, commentId) => {
  return async (dispatch) => {
    try {
      await api.downVoteComment(threadId, commentId);
      dispatch(downvoteCommentActionCreator(commentId));
    } catch (error) {
      console.log(error.message);
    }
  };
};

const asyncNeutralizeCommentVote = (threadId, commentId) => {
  return async (dispatch) => {
    try {
      await api.neutralizeCommentVote(threadId, commentId);
      dispatch(downvoteCommentActionCreator(commentId));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export {
  ActionType,
  receiveTalkDetailActionCreator,
  clearTalkDetailActionCreator,
  toggleLikeTalkDetailActionCreator,
  asyncReceiveTalkDetail,
  asyncUpvoteComment,
  asyncDownvoteComment,
  asyncNeutralizeCommentVote,
  asyncCreateComment,
};
