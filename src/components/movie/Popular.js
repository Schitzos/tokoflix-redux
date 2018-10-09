import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPopularMovie } from '../../store/actions/popularMovie';
import MovieList from '../movie/MovieList';

class Popular extends Component {

  componentWillMount() {
    this.handleFetchPopularMovie();
  }

  handleFetchPopularMovie = () => {
    this.props.fetchPopularMovie();
  }

  render() {
    const { popular } = this.props;
    // console.log(popular)
    const p = popular.map(p => {
      return (
        <MovieList
          movie={p}
          key={p.id}
        />
      );
    });

    return (
      <div className="container">
        <br></br>
        <h4>Popular</h4>
        <br></br>
        <div className="row">
          {p}
        </div>
      </div>
    )
  }
}

Popular.propTypes = {
    fetchPopularMovie: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  popular: state.popular.items
})

export default connect(mapStateToProps, { fetchPopularMovie })(Popular);
