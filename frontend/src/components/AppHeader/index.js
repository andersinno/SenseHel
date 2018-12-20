import React from 'react';
import './appheader.styles.css';

const AppHeader = ({ headline, title }) => (
  <div className="app-header">
    <div className="app-header__content">
      <p className="headline">{headline}</p>
      <div className="line" />
      <p className="title">{title}</p>
    </div>
  </div>
);

export default AppHeader;
