import {
    vi, expect,test
  } from 'vitest';
import { asyncPopulateUsersAndTalks } from './action';
import api from '../../utils/api';
import { receiveTalksActionCreator } from '../talks/action';
import { receiveUsersActionCreator } from '../users/action';

test('asyncPopulateUsersAndTalks dispatches actions correctly', async () => {
  const users = [{ id: 1, name: 'Alice' }];
  const talks = [{ id: 1, title: 'Talk 1' }];

  const dispatch = vi.fn();
  api.getAllUsers = vi.fn().mockResolvedValue(users);
  api.getAllTalks = vi.fn().mockResolvedValue(talks);
  
  await asyncPopulateUsersAndTalks()(dispatch);

  expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(users));
  expect(dispatch).toHaveBeenCalledWith(receiveTalksActionCreator(talks));
});
