import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import * as types from './types';
import api from '../../utils/api';
import {
    describe, it, expect,jest
  } from 'vitest';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('asyncCreateComment', () => {
  it('creates CREATE_COMMENT when creating a comment has been done', async () => {
    const store = mockStore({});

    const expectedActions = [
      { type: types.ActionType.CREATE_COMMENT, payload: { comment: { id: 1, content: 'Test Comment' } } },
    ];

    // Mocking the API call
    api.createComment = jest.fn().mockResolvedValueOnce({ id: 1, content: 'Test Comment' });

    await store.dispatch(actions.asyncCreateComment(1, 'Test Comment'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches an error message when createComment API call fails', async () => {
    const store = mockStore({});

    // Mocking the API call to fail
    api.createComment = jest.fn().mockRejectedValueOnce(new Error('Failed to create comment'));

    await store.dispatch(actions.asyncCreateComment(1, 'Test Comment'));
    expect(store.getActions()).toEqual([]);
  });
});
