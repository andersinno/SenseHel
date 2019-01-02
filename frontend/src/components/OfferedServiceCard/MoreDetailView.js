import React, { Component } from 'react';
import Collapse from '@material-ui/core/Collapse/Collapse';
import Slide from '@material-ui/core/Slide/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core';
import Images from '../../assets/Images';
import BottomButton from '../BottomButton';

const styles = {
  root: {
    '&$checked': {
      color: green[500]
    }
  },
  checked: {
    color: green[500]
  }
};

const CheckBoxes = ({
  termsChecked,
  consentChecked,
  handleChange,
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
            checked: classes.checked
          }}
        />
      }
      label={
        <div>
          <span className="body-text">Please read our </span>
          <a href="/" className="body-text">
            <b>terms and conditions</b>
          </a>
          <span className="body-text"> and view our </span>
          <a href="/" className="body-text">
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
            checked: classes.checked
          }}
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

const DetailItem = ({ title, description }) => (
  <div className="offered-service-card__row offered-service-card__row--detail">
    <p className="title offered-service-card__text row--detail__title">
      {title}
    </p>
    <p className="body-text offered-service-card__text row--detail__description">
      {description}
    </p>
  </div>
);

class MoreDetailView extends Component {
  state = {
    termsChecked: false,
    consentChecked: false
  };

  handleCheckChange = value => {
    this.setState({ [value]: !this.state[value] }); // eslint-disable-line
  };

  render() {
    const {
      expanded,
      description,
      benefit,
      price,
      requiredSensors,
      classes
    } = this.props;
    const { termsChecked, consentChecked } = this.state;

    return (
      <Collapse in={expanded} timeout="auto" mountOnEnter unmountOnExit>
        <Slide
          direction="up"
          in={expanded}
          timeout={500}
          mountOnEnter
          unmountOnExit
        >
          <div>
            <div className="offered-service-card__detail-container">
              <div className="offered-service-card__row">
                <img
                  className="service-image"
                  src={Images.Placeholder_Long}
                  alt="placeholder"
                />
              </div>

              <DetailItem title="DETAIL" description={description} />

              <DetailItem title="BENEFIT" description={benefit.long} />

              <DetailItem title="PRICE" description={price} />

              <DetailItem
                title="REQUIRED SENSORS"
                description={requiredSensors}
              />

              <CheckBoxes
                termsChecked={termsChecked}
                consentChecked={consentChecked}
                handleChange={this.handleCheckChange}
                classes={classes}
              />
            </div>

            <BottomButton
              buttonType="default"
              title="subscribe"
              onClick={this.handleSubscribe}
              disabled={!termsChecked || !consentChecked}
            />
          </div>
        </Slide>
      </Collapse>
    );
  }
}

export default withStyles(styles)(MoreDetailView);
