import * as React from 'react';
import styled from 'styled-components/macro';
import { useState } from 'react';
import { useFeedbacksPageSlice } from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import { Title } from './Title';
import {
  selectError,
  selectIsLoading,
  selectSelectedFeedback,
} from '../slice/selectors';
import { EditFeedbackInfo, NewFeedbackInfo } from '../slice/types';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { P } from './P';
import { selectAllUsers } from 'app/pages/UserManagementPage/slice/selectors';
import { useUserManagementPageSlice } from 'app/pages/UserManagementPage/slice';

export function FeedbackDetailForm(props) {
  const { actions } = useFeedbacksPageSlice();
  const { actions: userActions } = useUserManagementPageSlice();
  const dispatch = useDispatch();

  const selectedFeedback = useSelector(selectSelectedFeedback);
  const users = useSelector(selectAllUsers);

  const [description, setDescription] = useState('');
  const [givenBy, setGivenBy] = useState(-1);
  const [belongsTo, setBelongsTo] = useState(-1);

  React.useEffect(() => {
    if (users.length === 0) {
      // assume that system must have at least one user
      dispatch(userActions.getAllUsersAtPage());
    }
  }, [dispatch, userActions, users.length]);

  React.useEffect(() => {
    if (selectedFeedback) {
      setGivenBy(selectedFeedback?.givenById);
      setBelongsTo(selectedFeedback?.belongsToId);
      setDescription(selectedFeedback?.description);
    } else {
      setGivenBy(-1);
      setBelongsTo(-1);
      setDescription('');
    }
  }, [selectedFeedback]);

  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const onGivenByChanged = e => {
    setGivenBy(e.target.value);
  };
  const onBelongsToChanged = e => {
    setBelongsTo(e.target.value);
  };

  const handleEditSubmit = e => {
    e.preventDefault();

    const feedbackData: EditFeedbackInfo = {
      description,
    };

    dispatch(actions.editFeedback(feedbackData));
  };

  const handleNewSubmit = e => {
    e.preventDefault();

    const feedbackData: NewFeedbackInfo = {
      description,
      givenById: givenBy,
      belongsToId: belongsTo,
    };

    dispatch(actions.addNewFeedback(feedbackData));
  };

  let usersOptions = [
    <option key={'default'} value={'-1'}>
      {-1}
    </option>,
  ].concat(
    users.map(u => (
      <option key={u.id} value={u.id}>
        {u.username}
      </option>
    )),
  );

  return (
    <Wrapper>
      {props.isEditing ? (
        <Title>Editing Feedback Form</Title>
      ) : (
        <Title>Adding New Feedback Form</Title>
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
        {/* <label htmlFor="description">Description:</label>
        <Input
          id="description"
          type="text"
          value={description}
          placeholder="Enter Description"
          onChange={onDescriptionChanged}
        /> */}
        <br />
        <label htmlFor="givenBy">Given By:</label>
        <Select id="givenBy" value={givenBy} onChange={onGivenByChanged}>
          {usersOptions}
        </Select>
        <br />
        <label htmlFor="belongsTo">Belongs To:</label>
        <Select id="belongsTo" value={belongsTo} onChange={onBelongsToChanged}>
          {usersOptions}
        </Select>

        <br />
        <Input
          id="loginButton"
          disabled={givenBy === -1 || belongsTo === -1}
          type="submit"
          value="Submit"
        />
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
  min-width: 400px;
`;

const CloseButton = styled.button`
  position: relative;
  float: right;
  top: -50px;
  right: -50px;
`;

const Select = styled.select`
  float: right;
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
        :disabled {
          background: #dddddd;
          cursor: not-allowed;
        }
      `;
    }
    return '';
  }}
`;
