import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IoHome, IoMedal } from 'react-icons/io5'; // Import IoMedal untuk ikon leaderboard

function Navigation({ authUser, signOut }) {
  const { id, photo, name } = authUser;

  return (
    <div className="navigation">
      <img src={photo} alt={id} title={name} />
      <nav>
        <Link to="/"><IoHome /></Link>
        <Link to="/leaderboard"><IoMedal /></Link> {/* Tautan untuk leaderboard */}
      </nav>
      <button type="button" onClick={signOut}>Sign out</button>
    </div>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
