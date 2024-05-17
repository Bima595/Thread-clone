import { describe, it, expect } from 'vitest';
import { receiveTalksActionCreator, ActionType } from './action';

describe('receiveTalksActionCreator', () => {
  it('should create an action to receive talks', () => {
    const talks = [
      { id: 1, title: 'Talk 1', body: 'Content 1' },
      { id: 2, title: 'Talk 2', body: 'Content 2' }
    ];
    const expectedAction = {
      type: ActionType.RECEIVE_TALKS,
      payload: {
        talks,
      },
    };
    expect(receiveTalksActionCreator(talks)).toEqual(expectedAction);
  });
});