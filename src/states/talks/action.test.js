// src/states/talks/action.test.js

import { describe, it, expect, vi } from 'vitest';
import {
  ActionType,
  receiveTalksActionCreator,
  addTalkActionCreator,
  toggleLikeTalkActionCreator,
  addCommentActionCreator,
  asyncAddTalk,
  asyncToogleLikeTalk,
  asyncAddComment,
} from './action';
import api from '../../utils/api';

// Mock the api module
vi.mock('../../utils/api');

describe('Action Creators', () => {
  it('should create an action to receive talks', () => {
    const talks = [{ id: 1, title: 'Test Talk' }];
    const expectedAction = {
      type: ActionType.RECEIVE_TALKS,
      payload: {
        talks,
      },
    };

    expect(receiveTalksActionCreator(talks)).toEqual(expectedAction);
  });

  it('should create an action to add a talk', () => {
    const talk = { id: 1, title: 'New Talk' };
    const expectedAction = {
      type: ActionType.ADD_TALK,
      payload: {
        talk,
      },
    };

    expect(addTalkActionCreator(talk)).toEqual(expectedAction);
  });

  it('should create an action to toggle like on a talk', () => {
    const talkId = 1;
    const userId = 2;
    const expectedAction = {
      type: ActionType.TOGGLE_LIKE_TALK,
      payload: {
        talkId,
        userId,
      },
    };

    expect(toggleLikeTalkActionCreator({ talkId, userId })).toEqual(expectedAction);
  });

  it('should create an action to add a comment', () => {
    const comment = { id: 1, content: 'Test Comment' };
    const talkId = 1;
    const expectedAction = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment,
        talkId,
      },
    };

    expect(addCommentActionCreator(comment, talkId)).toEqual(expectedAction);
  });
});

describe('Async Actions', () => {
  it('should dispatch addCommentActionCreator after successfully creating a comment', async () => {
    const comment = { id: 1, content: 'Test Comment' };
    api.createComment.mockResolvedValue(comment);

    const dispatch = vi.fn();
    const thunk = asyncAddComment(1, 'Test Comment');

    await thunk(dispatch);

    expect(api.createComment).toHaveBeenCalledWith({ talkId: 1, content: 'Test Comment' });
    expect(dispatch).toHaveBeenCalledWith(addCommentActionCreator(comment, 1));
  });

  it('should dispatch addTalkActionCreator after successfully creating a talk', async () => {
    const talk = { id: 1, title: 'New Talk' };
    api.createTalk.mockResolvedValue(talk);

    const dispatch = vi.fn();
    const thunk = asyncAddTalk({ title: 'New Talk', category: 'General', body: 'Talk Body' });

    await thunk(dispatch);

    expect(api.createTalk).toHaveBeenCalledWith({ title: 'New Talk', category: 'General', body: 'Talk Body' });
    expect(dispatch).toHaveBeenCalledWith(addTalkActionCreator(talk));
  });

  it('should dispatch toggleLikeTalkActionCreator after toggling like on a talk', async () => {
    const getState = () => ({ authUser: { id: 2 } });
    const dispatch = vi.fn();
    const thunk = asyncToogleLikeTalk(1);

    api.toggleLikeTalk.mockResolvedValueOnce();

    await thunk(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(toggleLikeTalkActionCreator({ talkId: 1, userId: 2 }));
    expect(api.toggleLikeTalk).toHaveBeenCalledWith(1);
  });

  it('should handle errors in asyncAddComment', async () => {
    const mockError = new Error('Failed to add comment');
    api.createComment.mockRejectedValue(mockError);

    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const dispatch = vi.fn();
    const thunk = asyncAddComment(1, 'Test Comment');

    await thunk(dispatch);

    expect(api.createComment).toHaveBeenCalledWith({ talkId: 1, content: 'Test Comment' });
    expect(alertSpy).toHaveBeenCalledWith(mockError.message);

    alertSpy.mockRestore();
  });

  it('should handle errors in asyncAddTalk', async () => {
    const mockError = new Error('Failed to add talk');
    api.createTalk.mockRejectedValue(mockError);

    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const dispatch = vi.fn();
    const thunk = asyncAddTalk({ title: 'New Talk', category: 'General', body: 'Talk Body' });

    await thunk(dispatch);

    expect(api.createTalk).toHaveBeenCalledWith({ title: 'New Talk', category: 'General', body: 'Talk Body' });
    expect(alertSpy).toHaveBeenCalledWith(mockError.message);

    alertSpy.mockRestore();
  });

  it('should handle errors in asyncToogleLikeTalk and revert state', async () => {
    const getState = () => ({ authUser: { id: 2 } });
    const dispatch = vi.fn();
    const thunk = asyncToogleLikeTalk(1);

    api.toggleLikeTalk.mockRejectedValue(new Error('Failed to toggle like'));

    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    await thunk(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(toggleLikeTalkActionCreator({ talkId: 1, userId: 2 }));
    expect(api.toggleLikeTalk).toHaveBeenCalledWith(1);
    expect(alertSpy).toHaveBeenCalledWith('Failed to toggle like');

    // Ensure the state is reverted
    expect(dispatch).toHaveBeenCalledWith(toggleLikeTalkActionCreator({ talkId: 1, userId: 2 }));

    alertSpy.mockRestore();
  });
});
