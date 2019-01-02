import React from 'react';

import './detailitem.styles.css';
import '../card.styles.css';

const DetailItem = ({ title, description }) => (
  <div className="card__row detail">
    <p className="title card__text detail__title">{title}</p>
    <p className="body-text card__text detail__description">{description}</p>
  </div>
);

export default DetailItem;
