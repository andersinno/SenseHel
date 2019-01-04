import React from 'react';
import '../Card/card.styles.css';
import './nosubscard.styles.css';
import BottomButton from '../BottomButton';

const NoSubscriptionsCard = () => (
  <div className="card">
    <div className="no-subs-card__block">
      <p className="large-body dark-text centered">
        {`It seems you don't have any subscriptions.`}
        <br />
        {`Let's check what subscriptions can benefit you.`}
      </p>
    </div>
    <BottomButton onClick={() => {}} title="Go to see subscriptions" />
  </div>
);

export default NoSubscriptionsCard;
