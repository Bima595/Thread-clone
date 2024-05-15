import { describe, it, expect, vi } from 'vitest';
import { asyncRegisterUser, receiveUsersActionCreator, ActionType } from './action';
import api from '../../utils/api';

// Mock the api module
vi.mock('../../utils/api');

describe('Action Creators', () => {
  it('should create an action to receive users', () => {
    const users = [{ id: 1, name: 'John Doe' }];
    const expectedAction = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users,
      },
    };
    
    expect(receiveUsersActionCreator(users)).toEqual(expectedAction);
  });
});

describe('Async Actions', () => {
  it('should call api.register and show alert on error', async () => {
    const mockError = new Error('Registration failed');
    api.register.mockRejectedValue(mockError);

    // Spy on alert to verify it's called
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const dispatch = vi.fn();
    const thunk = asyncRegisterUser({ email: 'test@example.com', name: 'Test User', password: 'password' });
    
    await thunk(dispatch);

    expect(api.register).toHaveBeenCalledWith({ email: 'test@example.com', name: 'Test User', password: 'password' });
    expect(alertSpy).toHaveBeenCalledWith(mockError.message);

    // Clean up
    alertSpy.mockRestore();
  });
});
