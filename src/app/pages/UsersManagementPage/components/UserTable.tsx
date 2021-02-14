import * as React from 'react';
import styled from 'styled-components/macro';
import { A } from 'app/components/A';
import { useEffect, useMemo } from 'react';
import { useUserManagementPageSlice } from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import { Title } from './Title';
import {
  selectAllUsers,
  selectError,
  selectIsLoading,
} from '../slice/selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { useSortBy, useTable } from 'react-table';

export function UserTable() {
  const { actions } = useUserManagementPageSlice();
  const dispatch = useDispatch();

  const users = useSelector(selectAllUsers);
  const data = useMemo(() => users, [users]);

  const onRowEditClick = e => {
    console.log(e);
  };

  const onRowDeleteClick = e => {};

  const onRowAssignClick = e => {};

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
            Header: 'Total feedback',
            accessor: 'total',
          },
        ],
      },
      {
        Header: 'Actions',
        columns: [
          {
            Header: 'Edit',
            Cell: ({ cell }) => (
              <button onClick={() => onRowEditClick(cell)}>Edit</button>
            ),
          },
          {
            Header: 'Delete',
            Cell: ({ cell }) => (
              <button onClick={() => onRowDeleteClick(cell)}>Delete</button>
            ),
          },
          {
            Header: 'Assign',
            Cell: ({ cell }) => (
              <button onClick={() => onRowAssignClick(cell)}>Assign</button>
            ),
          },
        ],
      },
    ],
    [],
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
  const error = useSelector(selectError);

  const onCreateNewUserClick = e => {
    e.preventDefault();

    // const userData: LoginPayload = {
    //   username,
    //   password,
    // };

    // dispatch(actions.createNewUser(userData));
  };

  return (
    <Wrapper>
      <Title>Users Table</Title>
      {loading && <LoadingIndicator />}
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
      {/* {users.forEach(u => (
        <></>
      ))} */}
      <br />
      <A href="/#" onClick={onCreateNewUserClick}>
        Add New User
      </A>
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
