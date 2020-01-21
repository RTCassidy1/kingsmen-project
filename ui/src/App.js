import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

const apiUrl = `http://localhost:8080`;

class App extends Component {
  state = {
    users: []
  };

  async createUser() {
    await axios.get(apiUrl + '/user-create');
    this.loadMovies();
  }

  async loadMovies() {
    const res = await axios.get(apiUrl + '/movies');
    this.setState({
      users: res.data
    });
  }

  componentDidMount() {
    this.loadMovies();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button onClick={() => this.createUser()}>Create User</button>
          <p>Movies:</p>
          <table>
            <tr>
              <th><strong>title</strong></th>
              <th>Year</th>
              <th>Runtime</th>
              <th>genre</th>
            </tr>
            {this.state.users.map(user => (
              <tr>
                <td>{user.title} </td>
                <td><span>{user.year}</span></td>
                <td> {user.runtime} minutes </td>
                <td>{user.genre}</td>
              </tr>
            ))}
          </table>
        </header>
      </div>
    );
  }
}

export default App;