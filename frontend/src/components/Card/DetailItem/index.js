import React from 'react';
import classNames from 'classnames';

import './detailitem.styles.css';
import '../card.styles.css';

const DetailItem = ({ title, description, hideDivider }) => {
  if (!description) return null;

  return (
    <div
      className={classNames('card__row detail', {
        divider: !hideDivider
      })}
    >
      <p className="title card__text detail__title">{title}</p>
      <p className="body-text card__text detail__description">{description}</p>
    </div>
  );
};

export default DetailItem;
