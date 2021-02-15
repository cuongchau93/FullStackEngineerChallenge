import * as React from 'react';
import styled from 'styled-components/macro';
import { A } from 'app/components/A';
import { useEffect, useMemo, useState } from 'react';
import { useUserManagementPageSlice } from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import { Title } from './Title';
import {
  selectAllUsers,
  selectIsLoading,
  selectSelectedUser,
} from '../slice/selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { useSortBy, useTable } from 'react-table';
import { UserDataForm } from './UserDataForm';

export function UserTable() {
  const { actions } = useUserManagementPageSlice();
  const dispatch = useDispatch();

  const users = useSelector(selectAllUsers);
  const selectedUser = useSelector(selectSelectedUser);
  const data = useMemo(() => users, [users]);

  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const onEditClick = useMemo(
    () => id => {
      dispatch(actions.selectUser(id));
      setIsCreatingUser(false);
    },
    [actions, dispatch],
  );

  const onAddNewClick = () => {
    dispatch(actions.selectUser(-1));
    setIsCreatingUser(true);
  };

  const onRemoveClick = useMemo(
    () => id => {
      dispatch(actions.removeUser(id));
      setIsCreatingUser(false);
    },
    [actions, dispatch],
  );

  const columns = useMemo(
    () => [
      {
        Header: 'User Info',
        columns: [
          {
            Header: 'Id',
            accessor: 'id',
          },
          {
            Header: 'Name',
            accessor: 'username',
          },
          {
            Header: 'Role',
            accessor: 'role',
          },
        ],
      },
      {
        Header: 'Feedback Info',
        columns: [
          {
            Header: 'Total Assigned Feedback',
            accessor: 'totalAssignedFeedbacks',
          },
          {
            Header: 'Done Feedback',
            accessor: 'doneFeedbacks',
          },
        ],
      },
      {
        Header: 'Actions',
        columns: [
          {
            Header: 'Edit',
            Cell: ({ cell }) => (
              <button onClick={() => onEditClick(cell.row.id)}>Edit</button>
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
    if (users.length === 0) {
      dispatch(actions.getAllUsersAtPage());
    }
  }, [actions, dispatch, users.length]);

  const loading = useSelector(selectIsLoading);

  const onCloseButtonClick = () => {
    dispatch(actions.selectUser(-1));
    setIsCreatingUser(false);
  };
  return (
    <Wrapper>
      {loading && <LoadingIndicator />}

      {isCreatingUser ? (
        <UserDataForm onCloseButtonClick={onCloseButtonClick} />
      ) : (
        selectedUser && (
          <UserDataForm isEditing onCloseButtonClick={onCloseButtonClick} />
        )
      )}

      <Title>Users Table</Title>
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
        <Button onClick={onAddNewClick}>Add New User</Button>
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
