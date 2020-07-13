import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/auth';
import { searchUsers, searchResultsSuccess } from '../actions/search';

class Nav extends React.Component {
  logout = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  };

  handleSearch = (e) => {
    const searchText = e.target.value;
    if (searchText === '') {
      this.props.dispatch(searchResultsSuccess([]));
    } else {
      this.props.dispatch(searchUsers(searchText));
    }
  };

  render() {
    const { auth, results } = this.props;
    return (
      <div>
        {/*Navbar */}
        <nav className="nav">
          <div className="left-div">
            {/*on clicking the logo it will take to the homepage */}
            <Link to="/">
              <span className="main-logo">CODIAX</span>
            </Link>
          </div>
          <div className="search-container">
            <img
              className="search-icon"
              src="https://image.flaticon.com/icons/svg/483/483356.svg"
              alt="search-icon"
            />
            <input placeholder="Search" onChange={this.handleSearch} />

            {results.length > 0 && (
              <div className="search-results">
                <ul>
                  {results.map((user) => (
                    <li className="search-results-row" key={user._id}>
                      <Link to={`/users/${user._id}`}>
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSH4dcYWVFHFsz8M3Rsjpy2Hg6gQAmgbCIwWA&usqp=CAU"
                          alt="user-dp"
                        />
                        <span>{user.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="right-nav">
            {auth.isLoggedIn && (
              <div className="user">
                <Link to="/settings">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSH4dcYWVFHFsz8M3Rsjpy2Hg6gQAmgbCIwWA&usqp=CAU"
                    alt="user-dp"
                    id="user-dp"
                  />
                </Link>
                <span>{auth.user.name}</span>
              </div>
            )}

            <div className="nav-links">
              <ul>
                {!auth.isLoggedIn && (
                  <li>
                    <Link to="/login">Log in</Link>
                  </li>
                )}
                {auth.isLoggedIn && <li onClick={this.logout}>Logout</li>}
                {!auth.isLoggedIn && (
                  <li>
                    <Link to="/signup">Register</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    results: state.search.results,
  };
}

export default connect(mapStateToProps)(Nav);
