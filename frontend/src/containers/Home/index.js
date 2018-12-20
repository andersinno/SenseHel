import React from 'react';
import './home.styles.css';
import AppHeader from '../../components/AppHeader';

const HomePage = () => (
  <div className="home-page">
    <AppHeader
      headline="PAULI TOIVONEN"
      title={`URHO KEKKOSEN KATU 7B,\nHELSINKI`}
      hasBgImage
    />
  </div>
);

export default HomePage;
