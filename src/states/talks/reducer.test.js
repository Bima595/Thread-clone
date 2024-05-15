

import { describe, it, expect } from 'vitest';
import talksReducer from './reducer';
import { ActionType } from './action';

describe('talksReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const result = talksReducer(initialState, action);

    expect(result).toEqual(initialState);
  });

  it('should handle RECEIVE_TALKS', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_TALKS,
      payload: {
        talks: [{ id: 1, title: 'Talk 1' }, { id: 2, title: 'Talk 2' }],
      },
    };

    const result = talksReducer(initialState, action);

    expect(result).toEqual(action.payload.talks);
  });

  it('should handle ADD_TALK', () => {
    const initialState = [{ id: 1, title: 'Talk 1' }];
    const newTalk = { id: 2, title: 'Talk 2' };
    const action = {
      type: ActionType.ADD_TALK,
      payload: {
        talk: newTalk,
      },
    };

    const result = talksReducer(initialState, action);

    expect(result).toEqual([newTalk, ...initialState]);
  });

  it('should handle TOGGLE_LIKE_TALK when user has not liked the talk before', () => {
    const initialState = [
      { id: 1, title: 'Talk 1', likes: [2, 3] },
      { id: 2, title: 'Talk 2', likes: [] },
    ];
    const action = {
      type: ActionType.TOGGLE_LIKE_TALK,
      payload: {
        talkId: 1,
        userId: 4,
      },
    };

    const result = talksReducer(initialState, action);

    expect(result).toEqual([
      { id: 1, title: 'Talk 1', likes: [2, 3, 4] },
      { id: 2, title: 'Talk 2', likes: [] },
    ]);
  });

  it('should handle TOGGLE_LIKE_TALK when user has already liked the talk', () => {
    const initialState = [
      { id: 1, title: 'Talk 1', likes: [2, 3] },
      { id: 2, title: 'Talk 2', likes: [] },
    ];
    const action = {
      type: ActionType.TOGGLE_LIKE_TALK,
      payload: {
        talkId: 1,
        userId: 2,
      },
    };

    const result = talksReducer(initialState, action);

    expect(result).toEqual([
      { id: 1, title: 'Talk 1', likes: [3] },
      { id: 2, title: 'Talk 2', likes: [] },
    ]);
  });

  it('should handle ADD_COMMENT', () => {
    const initialState = [
      { id: 1, title: 'Talk 1', comments: [{ id: 1, content: 'Comment 1' }] },
      { id: 2, title: 'Talk 2', comments: [] },
    ];
    const newComment = { id: 2, content: 'Comment 2' };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: newComment,
        talkId: 1,
      },
    };

    const result = talksReducer(initialState, action);

    expect(result).toEqual([
      { id: 1, title: 'Talk 1', comments: [{ id: 1, content: 'Comment 1' }, newComment] },
      { id: 2, title: 'Talk 2', comments: [] },
    ]);
  });
});
