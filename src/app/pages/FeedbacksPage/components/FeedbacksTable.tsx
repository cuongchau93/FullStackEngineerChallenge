import * as React from 'react';
import styled from 'styled-components/macro';
import { useEffect, useMemo, useState } from 'react';
import { useFeedbacksPageSlice } from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import { Title } from './Title';
import {
  selectAllFeedbacks,
  selectIsLoading,
  selectSelectedFeedback,
} from '../slice/selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { useSortBy, useTable } from 'react-table';
import { FeedbackDetailForm } from './FeedbackDetailForm';

export function FeedbacksTable() {
  const { actions } = useFeedbacksPageSlice();
  const dispatch = useDispatch();

  const feedbacks = useSelector(selectAllFeedbacks);
  const selectedFeedback = useSelector(selectSelectedFeedback);
  const data = useMemo(() => feedbacks, [feedbacks]);

  const [isCreatingFeedback, setIsCreatingFeedback] = useState(false);

  const onEditClick = useMemo(
    () => id => {
      dispatch(actions.selectFeedback(id));
      setIsCreatingFeedback(false);
    },
    [actions, dispatch],
  );

  const onAddNewClick = () => {
    dispatch(actions.selectFeedback(-1));
    setIsCreatingFeedback(true);
  };

  const onRemoveClick = useMemo(
    () => id => {
      dispatch(actions.removeFeedback(id));
      setIsCreatingFeedback(false);
    },
    [actions, dispatch],
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Feedback Info',
        columns: [
          {
            Header: 'Id',
            accessor: 'id',
          },
          {
            Header: 'Description',
            accessor: 'description',
          },
          {
            Header: 'Given By',
            accessor: 'givenById',
          },
          {
            Header: 'Belongs to',
            accessor: 'belongsToId',
          },
        ],
      },
      {
        Header: 'Actions',
        columns: [
          {
            Header: 'Edit',
            Cell: ({ cell }) => (
              <button
                disabled={cell.row.values.description.length > 0}
                onClick={() => onEditClick(cell.row.id)}
              >
                Edit
              </button>
            ),
          },
          {
            Header: 'Remove',
            Cell: ({ cell }) => (
              <button onClick={() => onRemoveClick(cell.row.values.id)}>
                Remove
              </button>
            ),
          },
        ],
      },
    ],
    [onEditClick, onRemoveClick],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  useEffect(() => {
    if (feedbacks.length === 0) {
      dispatch(actions.getAllFeedbacks());
    }
  }, [actions, dispatch, feedbacks.length]);

  const loading = useSelector(selectIsLoading);

  const onCloseButtonClick = () => {
    dispatch(actions.selectFeedback(-1));
    setIsCreatingFeedback(false);
  };
  return (
    <Wrapper>
      {loading && <LoadingIndicator />}

      {isCreatingFeedback ? (
        <FeedbackDetailForm onCloseButtonClick={onCloseButtonClick} />
      ) : (
        selectedFeedback && (
          <FeedbackDetailForm
            isEditing
            onCloseButtonClick={onCloseButtonClick}
          />
        )
      )}

      <Title>Feedbacks Table</Title>
      <StyledDiv>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <Button onClick={onAddNewClick}>Add New Feedback</Button>
      </StyledDiv>
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

const Button = styled.button`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
  float: right;
`;

const StyledDiv = styled.div`
  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }

    th {
      background-color: rgba(0, 0, 255, 0.5);
      border-bottom: 3px solid blue;
      color: white;
      font-weight: bold;
    }
  }
`;
