import * as React from 'react';
import styled from 'styled-components/macro';
import { useState } from 'react';
import { useUserManagementPageSlice } from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import { Title } from './Title';
import {
  selectError,
  selectIsLoading,
  selectSelectedUser,
} from '../slice/selectors';
import { EditUserInfo, NewUserInfo } from '../slice/types';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { P } from './P';

export function UserDataForm(props) {
  const { actions } = useUserManagementPageSlice();
  const dispatch = useDispatch();

  const selectedUser = useSelector(selectSelectedUser);

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState({
    value: 'EMPLOYEE',
  });

  React.useEffect(() => {
    if (selectedUser) {
      setUserName(selectedUser?.username);
      setRole({ value: selectedUser?.role });
    } else {
      setUserName('');
      setRole({ value: 'EMPLOYEE' });
    }
  }, [selectedUser]);

  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const onUsernameChanged = e => {
    setUserName(e.target.value);
  };
  const onPasswordChanged = e => {
    setPassword(e.target.value);
  };
  const onRoleChanged = e => {
    setRole({ value: e.target.value });
  };

  const handleEditSubmit = e => {
    e.preventDefault();

    const userData: EditUserInfo = {
      username,
      role: role.value,
    };

    dispatch(actions.editUser(userData));
  };

  const handleNewSubmit = e => {
    e.preventDefault();

    const userData: NewUserInfo = {
      username,
      password,
      role: role.value,
    };

    dispatch(actions.addNewUser(userData));
  };

  return (
    <Wrapper>
      {props.isEditing ? (
        <Title>Editing User Form</Title>
      ) : (
        <Title>Adding New User Form</Title>
      )}
      {loading && <LoadingIndicator />}
      <LoginForm
        onSubmit={props.isEditing ? handleEditSubmit : handleNewSubmit}
      >
        <CloseButton onClick={props.onCloseButtonClick}>X</CloseButton>
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
        {!props.isEditing && (
          <>
            <label htmlFor="password">Password:</label>
            <Input
              id="password"
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={onPasswordChanged}
            />
          </>
        )}

        <select value={role.value} onChange={onRoleChanged}>
          <option value="EMPLOYEE">EMPLOYEE</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <br />
        <Input id="loginButton" type="submit" value="Submit" />
      </LoginForm>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 320px;
`;

const LoginForm = styled.form`
  border: 3px solid #f1f1f1;
  padding: 96px;
  h1 {
    text-align: center;
  }
`;

const CloseButton = styled.button`
  position: relative;
  float: right;
  top: -50px;
  right: -50px;
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
