import { useHomepageSlice } from 'app/pages/HomePage/slice';
import { selectUserInfo } from 'app/pages/HomePage/slice/selectors';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

export function Nav() {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const { actions } = useHomepageSlice();

  const onLogout = () => {
    dispatch(actions.logoutUser());
  };

  return (
    <Wrapper>
      <Item href="/#" target="#" title="#" rel="noopener noreferrer">
        Welcome {userInfo?.username}
      </Item>
      <Item
        href="/#"
        onClick={onLogout}
        rel="noopener noreferrer"
        title="Login Page"
      >
        Logout
      </Item>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
`;

const Item = styled.a`
  color: ${p => p.theme.primary};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  .icon {
    margin-right: 0.25rem;
  }
`;
