import * as React from 'react';
import styled from 'styled-components/macro';
import { A } from 'app/components/A';
import { useState } from 'react';
import { useHomepageSlice } from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import { Lead } from './Lead';
import { Title } from './Title';
import { selectError, selectIsLoading } from '../slice/selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { P } from './P';
import { LoginPayload } from '../slice/types';

export function LoginComponent() {
  const { actions } = useHomepageSlice();

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const onForgotPw = () => {
    alert('Please contact admin');
  };

  const onUsernameChanged = e => {
    setUserName(e.target.value);
  };
  const onPasswordChanged = e => {
    setPassword(e.target.value);
  };

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const userData: LoginPayload = {
      username,
      password,
    };

    dispatch(actions.loginUser(userData));
  };

  return (
    <Wrapper>
      <Title>Feedback Management</Title>
      <Lead>Please login to use the app</Lead>
      {loading && <LoadingIndicator />}
      <LoginForm onSubmit={handleSubmit}>
        {error && (
          <P
            style={{
              color: 'red',
              textAlign: 'center',
            }}
          >
            {error}
          </P>
        )}
        <label htmlFor="username">Username:</label>
        <Input
          id="username"
          type="text"
          value={username}
          placeholder="Enter Username"
          onChange={onUsernameChanged}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <Input
          id="password"
          type="password"
          value={password}
          placeholder="Enter Password"
          onChange={onPasswordChanged}
        />
        <br />
        <Input
          id="loginButton"
          type="submit"
          // disabled={loading}
          value="Submit"
        />
        <br />
        <A href="/#" onClick={onForgotPw}>
          Forgot Password?
        </A>
      </LoginForm>
    </Wrapper>
  );
}

const LoginForm = styled.form`
  border: 3px solid #f1f1f1;
  padding: 96px;
  h1 {
    text-align: center;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;

  ${props => {
    if (props.id === 'loginButton') {
      return `
        background-color: #4CAF50;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
        :hover {
          opacity: 0.8;
        }
      `;
    }
    return '';
  }}
`;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 320px;
`;
