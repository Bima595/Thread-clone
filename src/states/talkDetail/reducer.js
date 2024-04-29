import { ActionType } from "./action";

function talkDetailReducer(detailThread = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_TALK_DETAIL:
      return action.payload.detailThread || null;
    case ActionType.CLEAR_TALK_DETAIL:
      return null;
    case ActionType.TOGGLE_LIKE_TALK_DETAIL:
      return {
        ...detailThread,
        likes: detailThread.likes.includes(action.payload.userId)
          ? detailThread.likes.filter((id) => id !== action.payload.userId)
          : detailThread.likes.concat(action.payload.userId),
      };
    case ActionType.CREATE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.concat(action.payload.comment),
      };
    default:
      return detailThread;
  }
}

export default talkDetailReducer;
