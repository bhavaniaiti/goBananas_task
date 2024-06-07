import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, TextField, List, ListItem, ListItemText, Typography } from '@mui/material';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="container">
      <Typography variant="h4" component="h1" gutterBottom>
        User List
      </Typography>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <List className="user-list">
        {filteredUsers.map(user => (
          <ListItem key={user.id} className="user-list-item">
            <ListItemText
              primary={user.name}
              secondary={user.email}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default UserList;
