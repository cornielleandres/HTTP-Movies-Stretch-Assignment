import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    // this function needs to fire off a get request to localhost:5000/api/movies/:id
    // note that the id is dynamic.
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({
        movie: res.data
      }))
      .catch(err => console.log(err))
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(() => {
        this.props.deleteFromSavedList(this.state.movie.id);
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>

        <div className = 'delete-button' onClick = { this.deleteMovie }>Delete</div>
      </div>
    );
  }
}
