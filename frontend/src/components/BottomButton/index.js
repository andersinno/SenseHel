import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './bottombutton.styles.css';

const BottomButton = ({ title, variant, disabled, loading, onClick }) => (
  <button
    type="submit"
    className={classNames('bottom-button', {
      'bottom-button--default': variant === 'default',
      'bottom-button--negative': variant === 'negative',
      'bottom-button--loading': loading,
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

BottomButton.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['default', 'negative']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

BottomButton.defaultProps = {
  variant: 'default',
  disabled: false,
  loading: false
};

export default BottomButton;
