import * as React from 'react';
import styled from 'styled-components/macro';
import { useEffect, useState } from 'react';
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

export function FeedbackDetailEmployeeForm(props) {
  const { actions } = useFeedbacksPageSlice();
  const dispatch = useDispatch();

  const selectedFeedback = useSelector(selectSelectedFeedback);

  const [description, setDescription] = useState('');
  const [givenBy] = useState(-1);
  const [belongsTo] = useState(-1);

  useEffect(() => {
    if (selectedFeedback) {
      setDescription(selectedFeedback?.description);
    } else {
      setDescription('');
    }
  }, [selectedFeedback]);

  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const onDescriptionChanged = e => {
    setDescription(e.target.value);
  };

  const handleEditSubmit = e => {
    e.preventDefault();

    const feedbackData: EditFeedbackInfo = {
      description,
    };

    dispatch(actions.editFeedback(feedbackData));
  };

  return (
    <Wrapper>
      <Title>Editing Feedback Form</Title>
      {loading && <LoadingIndicator />}
      <LoginForm onSubmit={handleEditSubmit}>
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
        <label htmlFor="description">Description:</label>
        <TextArea
          id="description"
          value={description}
          placeholder="Enter Description"
          onChange={onDescriptionChanged}
        />
        <br />
        <label htmlFor="givenBy">
          Given By: {selectedFeedback?.givenBy || -1}
        </label>
        <br />
        <label htmlFor="belongsTo">
          Belongs To: {selectedFeedback?.belongsTo || -1}
        </label>

        <br />
        <Input
          id="loginButton"
          disabled={description.length === 0}
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

const TextArea = styled.textarea`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  min-width: 360px;
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
