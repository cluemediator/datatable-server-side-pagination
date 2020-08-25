import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const columns = [
  {
    name: 'Avatar',
    cell: row => <img height="30px" width="30px" alt={row.first_name} src={row.avatar} />
  },
  {
    name: 'First Name',
    selector: 'first_name'
  },
  {
    name: 'Last Name',
    selector: 'last_name'
  },
  {
    name: 'Email',
    selector: 'email'
  }
];

function App() {

  const [users, setUsers] = useState({});
  const [page, setPage] = useState(1);
  const countPerPage = 3;

  const getUserList = () => {
    axios.get(`https://reqres.in/api/users?page=${page}&per_page=${countPerPage}&delay=1`).then(res => {
      setUsers(res.data);
    }).catch(err => {
      setUsers({});
    });
  }

  useEffect(() => {
    getUserList();
  }, [page]);

  return (
    <div className="App">
      <h3>Server side pagination in DataTable - <a href="https://www.cluemediator.com" target="_blank">Clue Mediator</a></h3>
      <DataTable
        title="Employees"
        columns={columns}
        data={users.data}
        highlightOnHover
        pagination
        paginationServer
        paginationTotalRows={users.total}
        paginationPerPage={countPerPage}
        paginationComponentOptions={{
          noRowsPerPage: true
        }}
        onChangePage={page => setPage(page)}
      />
    </div>
  );
}

export default App;
