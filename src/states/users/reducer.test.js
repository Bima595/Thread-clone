import { describe, it, expect } from 'vitest';
import usersReducer from './reducer';
import { ActionType } from './action';

describe('usersReducer', () => {
  it('should return the initial state when state is undefined', () => {
    const initialState = [];
    const action = {};
    const nextState = usersReducer(undefined, action);
    expect(nextState).toEqual(initialState);
  });

  it('should handle RECEIVE_USERS action', () => {
    const users = [{ id: 1, name: 'John Doe' }];
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users,
      },
    };
    const nextState = usersReducer([], action);
    expect(nextState).toEqual(users);
  });

  it('should return the current state when the action type does not match', () => {
    const currentState = [{ id: 1, name: 'Jane Doe' }];
    const action = {
      type: 'UNKNOWN_ACTION',
    };
    const nextState = usersReducer(currentState, action);
    expect(nextState).toEqual(currentState);
  });
});
