import React, { Component } from 'react';
import axios from 'axios';
import './App.css';


const apiUrl = `http://localhost:8080`;

class App extends Component {
  constructor(props){
    super(props);

    //initialize state
    this.state = {
      page: 0,
      movies: [],
      hasMore: true,
      isLoading: false,
      sort: {
        param: 'title',
        direction: 'asc'
      }
    };

    //Load more rows on scroll to bottom of page
    window.onscroll = () => {
      const {
        loadMovies,
        state: {
          isLoading,
          hasMore
        },
      } = this;

      if ( isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadMovies();
      }
    };
  }


  refresh = async () => {
    await this.setState({
            page: 0,
            movies: [],
            sort: {
              param: 'title',
              direction: 'asc'
            }
          });
    this.loadMovies();
  }

  sort = async (item) => {
    var changeDirection = (item === this.state.sort.param);
    var dir = this.state.sort.direction;
    if(changeDirection){
      dir = (this.state.sort.direction === 'asc'? 'desc' : 'asc');
    }
    await this.setState({
            page: 0,
            movies: [],
            sort: {
              param: item,
              direction: dir
            }
          });
    this.loadMovies();
  }

  loadMovies = async () => {
    this.setState({
      isLoading: true
    })
    var sort = {};
    sort[this.state.sort.param] = this.state.sort.direction;
    var params = {
      page: this.state.page,
      sort: sort
    }
    const res = await axios.post(apiUrl + '/movies',params);
    this.setState({
      movies: [
        ...this.state.movies,
        ...res.data
      ],
      page: this.state.page + 1,
      isLoading: false
    });
    if(res.data.size === 0){
      this.setState({
        hasMore: false
      });
      console.log("no more movies to load")
    }
  }

  seedTable = async () => {
    const res = await axios.get(apiUrl + '/seed-table');
    this.setState({
      movies: res.data,
      page: this.state.page + 1
    });
  }

  componentDidMount() {
    this.loadMovies();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Movies:</h1>
          <div className="buttons">
            <button className="action_btn" onClick={() => this.refresh()}>refresh</button>
            <button className="action_btn" onClick={() => this.loadMovies()}>Load More</button>
          </div>
          
          <table>
            <thead>
              <tr>
                <th onClick={() => this.sort('title')}>Title</th>
                <th onClick={() => this.sort('year')}>Year</th>
                <th onClick={() => this.sort('runtime')}>Runtime</th>
                <th onClick={() => this.sort('genre')}>genre</th>
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title} </td>
                  <td>{movie.year}</td>
                  <td>{movie.runtime} minutes </td>
                  <td>{movie.genre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </header>
      </div>
    );
  }
}

export default App;