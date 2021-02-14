import { useEffect } from 'react';
import { useHomepageSlice } from '../app/pages/HomePage/slice';
import { useDispatch } from 'react-redux';
import { MyJWT } from '../app/pages/HomePage/slice/types';
import jwtDecode from 'jwt-decode';

export const useCheckAuthentication = () => {
  const { actions } = useHomepageSlice();
  const dispatch = useDispatch();

  useEffect(() => {
    const authToken = localStorage.token;
    if (authToken) {
      const decodedToken = jwtDecode<MyJWT>(authToken);
      if (decodedToken.exp * 1000 < Date.now()) {
        dispatch(actions.logoutUser());
      } else {
        dispatch(actions.initStateIfNeeded());
      }
      return;
    } else if (window.location.pathname !== '/') {
      dispatch(actions.logoutUser());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
