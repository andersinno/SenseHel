import React, { Component } from 'react';
import Images from '../../assets/Images';
import BottomButton from '../BottomButton';
import CheckboxesSection from './CheckboxesSection';
import DetailItem from '../Card/DetailItem';

class CollapsibleComponent extends Component {
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
      <div>
        <div className="offered-service-card__detail-container">
          <div className="card__row">
            <img
              className="service-image"
              src={Images.Placeholder_Long}
              alt="placeholder"
            />
          </div>

          <DetailItem title="DETAIL" description={description} />

          <DetailItem title="BENEFIT" description={benefit.long} />

          <DetailItem title="PRICE" description={price} />

          <DetailItem title="REQUIRED SENSORS" description={requiredSensors} />

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
    );
  }
}

export default CollapsibleComponent;
