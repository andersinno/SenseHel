import React from 'react';
import classNames from 'classnames';
import './bottombutton.styles.css';

const BottomButton = ({ title, buttonType, disabled, loading, onClick }) => (
  <button
    type="submit"
    className={classNames('bottom-button', {
      'bottom-button--default': buttonType === 'default',
      'bottom-button--negative': buttonType === 'negative',
      'bottom-button--disabled': disabled
    })}
    disabled={disabled || loading}
    onClick={onClick}
  >
    <p
      className={classNames('title', {
        'title--disabled': disabled
      })}
    >
      {title}
    </p>
  </button>
);

export default BottomButton;
