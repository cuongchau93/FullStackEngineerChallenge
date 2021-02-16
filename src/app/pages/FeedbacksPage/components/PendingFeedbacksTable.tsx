import * as React from 'react';
import styled from 'styled-components/macro';
import { useEffect, useMemo } from 'react';
import { useFeedbacksPageSlice } from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import { Title } from './Title';
import {
  selectIsFetched,
  selectIsLoading,
  selectPendingFeedbacks,
  selectSelectedFeedback,
} from '../slice/selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { useSortBy, useTable } from 'react-table';
import { FeedbackDetailEmployeeForm } from './FeedbackDetailEmployeeForm';

export function PendingFeedbacksTable() {
  const { actions } = useFeedbacksPageSlice();
  const dispatch = useDispatch();

  const feedbacks = useSelector(selectPendingFeedbacks);
  const isFeedbackFetched = useSelector(selectIsFetched);
  const selectedFeedback = useSelector(selectSelectedFeedback);
  const data = useMemo(() => feedbacks, [feedbacks]);

  const onEditClick = useMemo(
    () => id => {
      dispatch(actions.selectFeedback(id));
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
            Header: 'Belongs to',
            accessor: 'belongsTo',
          },
          {
            Header: 'Given By',
            accessor: 'givenBy',
          },
        ],
      },
      {
        Header: 'Actions',
        columns: [
          {
            Header: 'Edit',
            Cell: ({ cell }) => (
              <button onClick={() => onEditClick(cell.row.values)}>Edit</button>
            ),
          },
        ],
      },
    ],
    [onEditClick],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  useEffect(() => {
    if (!isFeedbackFetched) {
      dispatch(actions.getSelfFeedbacks());
    }
  }, [actions, dispatch, isFeedbackFetched]);

  const loading = useSelector(selectIsLoading);

  const onCloseButtonClick = () => {
    dispatch(actions.selectFeedback(null));
  };

  return (
    <Wrapper>
      {loading && <LoadingIndicator />}

      {selectedFeedback && (
        <FeedbackDetailEmployeeForm onCloseButtonClick={onCloseButtonClick} />
      )}

      <Title>Pending Feedbacks Table</Title>
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
