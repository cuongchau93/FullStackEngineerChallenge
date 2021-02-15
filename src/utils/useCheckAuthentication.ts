import { useEffect } from 'react';
import { useHomepageSlice } from '../app/pages/HomePage/slice';
import { useDispatch } from 'react-redux';
import { MyJWT } from '../app/pages/HomePage/slice/types';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

export const useCheckAuthentication = () => {
  const { actions } = useHomepageSlice();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const authToken = localStorage.token;
    if (authToken) {
      const decodedToken = jwtDecode<MyJWT>(authToken);
      if (decodedToken.exp * 1000 < Date.now()) {
        dispatch(actions.logoutUser());
        history.push('/');
      } else {
        dispatch(actions.initStateIfNeeded());
      }
      return;
    } else if (window.location.pathname !== '/') {
      dispatch(actions.logoutUser());
      history.push('/'); // todo , check when token expired
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
