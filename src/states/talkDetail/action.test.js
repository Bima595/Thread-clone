import { describe, it, expect } from 'vitest';
import { createCommentActionCreator, ActionType } from './action';

describe('createCommentActionCreator', () => {
  it('should create an action to create a comment', () => {
    const comment = { id: 1, content: 'This is a comment', createdAt: '2024-05-17', owner: { id: 1, name: 'User', avatar: 'avatar.png' }};
    const expectedAction = {
      type: ActionType.CREATE_COMMENT,
      payload: {
        comment,
      },
    };
    expect(createCommentActionCreator(comment)).toEqual(expectedAction);
  });
});
