import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import { green, grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    '&$checked': {
      color: green[500]
    }
  },
  checked: {
    color: green[500]
  },
  disabled: {
    '&$checked': {
      color: grey[500]
    }
  }
};

const CheckboxesSection = ({
  termsChecked,
  consentChecked,
  handleChange,
  disabled,
  termsAndConditions,
  privacyPolicy,
  classes
}) => (
  <div className="offered-service-card__row--checkboxes">
    <FormControlLabel
      control={
        <Checkbox
          checked={termsChecked}
          onChange={() => handleChange('termsChecked')}
          classes={{
            root: classes.root,
            checked: classes.checked,
            disabled: classes.disabled
          }}
          disabled={disabled}
        />
      }
      label={
        <div>
          <span className="body-text">Please read our </span>
          <a
            href={termsAndConditions}
            target="_blank"
            rel="noopener noreferrer"
            className="body-text"
          >
            <b>terms and conditions</b>
          </a>
          <span className="body-text"> and view our </span>
          <a
            href={privacyPolicy}
            target="_blank"
            rel="noopener noreferrer"
            className="body-text"
          >
            <b>privacy policy here *</b>
          </a>
        </div>
      }
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={consentChecked}
          onChange={() => handleChange('consentChecked')}
          classes={{
            root: classes.root,
            checked: classes.checked,
            disabled: classes.disabled
          }}
          disabled={disabled}
        />
      }
      label={
        <div>
          <span className="body-text">
            I have read and understood the terms and conditions and consent to
            my details being stored *
          </span>
        </div>
      }
    />
  </div>
);

export default withStyles(styles)(CheckboxesSection);
