import React, { Component } from 'react';
import Collapse from '@material-ui/core/Collapse/Collapse';
import Slide from '@material-ui/core/Slide/Slide';
import Images from '../../assets/Images';
import BottomButton from '../BottomButton';
import CheckboxesSection from './CheckboxesSection';

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
    consentChecked: false,
    requesting: false,
    subscribed: false
  };

  handleCheckChange = value => {
    this.setState({ [value]: !this.state[value] }); // eslint-disable-line
  };

  handleSubscribe = () => {
    const { subscribed } = this.state;
    // make some API call
    this.setState({ requesting: true });

    setTimeout(
      () => this.setState({ requesting: false, subscribed: !subscribed }),
      2000
    );
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
    const { termsChecked, consentChecked, requesting, subscribed } = this.state;
    let buttonTitle = 'subscribe';
    if (requesting) {
      buttonTitle = 'requesting...';
    } else if (subscribed) {
      buttonTitle = 'unsubscribe';
    }

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

              <CheckboxesSection
                termsChecked={termsChecked}
                consentChecked={consentChecked}
                handleChange={this.handleCheckChange}
                classes={classes}
                disabled={subscribed}
              />
            </div>

            <BottomButton
              buttonType={subscribed ? 'negative' : 'default'}
              title={buttonTitle}
              onClick={this.handleSubscribe}
              disabled={!subscribed && (!termsChecked || !consentChecked)}
              loading={requesting}
            />
          </div>
        </Slide>
      </Collapse>
    );
  }
}

export default MoreDetailView;
