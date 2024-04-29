import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

export const SET_IS_PRELOAD = "SET_IS_PRELOAD";

export const setIsPreload = (isPreload) => ({
  type: SET_IS_PRELOAD,
  payload: {
    isPreload,
  },
});

export const asyncPreloadProcess = () => {
  return async (dispatch) => {
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreload(false));
    }
  };
};
