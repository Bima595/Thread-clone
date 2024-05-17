import { describe, it, expect } from 'vitest';
import talkDetailReducer from './reducer';
import { ActionType } from './action';

describe('talkDetailReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    const result = talkDetailReducer(initialState, action);

    expect(result).toEqual(initialState);
  });

  it('should handle RECEIVE_TALK_DETAIL', () => {
    const initialState = null;
    const detailThread = { id: 1, title: 'Talk Detail' };
    const action = {
      type: ActionType.RECEIVE_TALK_DETAIL,
      payload: {
        detailThread,
      },
    };

    const result = talkDetailReducer(initialState, action);

    expect(result).toEqual(detailThread);
  });

  it('should handle CLEAR_TALK_DETAIL', () => {
    const initialState = { id: 1, title: 'Talk Detail' };
    const action = {
      type: ActionType.CLEAR_TALK_DETAIL,
    };

    const result = talkDetailReducer(initialState, action);

    expect(result).toEqual(null);
  });

  it('should handle TOGGLE_LIKE_TALK_DETAIL when user has not liked the talk before', () => {
    const initialState = { id: 1, title: 'Talk Detail', likes: [2, 3] };
    const action = {
      type: ActionType.TOGGLE_LIKE_TALK_DETAIL,
      payload: {
        userId: 4,
      },
    };

    const result = talkDetailReducer(initialState, action);

    expect(result).toEqual({ id: 1, title: 'Talk Detail', likes: [2, 3, 4] });
  });

  it('should handle TOGGLE_LIKE_TALK_DETAIL when user has already liked the talk', () => {
    const initialState = { id: 1, title: 'Talk Detail', likes: [2, 3] };
    const action = {
      type: ActionType.TOGGLE_LIKE_TALK_DETAIL,
      payload: {
        userId: 2,
      },
    };

    const result = talkDetailReducer(initialState, action);

    expect(result).toEqual({ id: 1, title: 'Talk Detail', likes: [3] });
  });

  it('should handle CREATE_COMMENT', () => {
    const initialState = { id: 1, title: 'Talk Detail', comments: [] };
    const newComment = { id: 1, content: 'New Comment' };
    const action = {
      type: ActionType.CREATE_COMMENT,
      payload: {
        comment: newComment,
      },
    };

    const result = talkDetailReducer(initialState, action);

    expect(result).toEqual({ id: 1, title: 'Talk Detail', comments: [newComment] });
  });
});
