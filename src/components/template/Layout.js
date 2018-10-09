import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchMovie } from '../../store/actions/movieActions';
import MovieList from '../movie/MovieList';

class Layout extends Component {

  componentWillMount() {
    this.handleFetchMovie();
  }

  handleFetchMovie = () => {
    this.props.fetchMovie();
  }

  render() {
    const { movie } = this.props;
    const m = movie.map(m => {
      return (
        <MovieList
          movie={m}
          key={m.id}
        />
      );
    });

    return (
      <div className="container">
        <br></br>
        <h4>Now Showing</h4>
        <br></br>
        <div className="row">
          {m}
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  fetchMovie: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  movie: state.results.items
})

export default connect(mapStateToProps, { fetchMovie })(Layout);
