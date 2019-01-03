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
    const { onRequestSuccess } = this.props;

    // make some API call
    this.setState({ requesting: true });

    setTimeout(() => {
      onRequestSuccess({
        title: 'Successfully Subscribed',
        subtitle: 'You can view your subscriptions in home page'
      });
      this.setState({ requesting: false, subscribed: true });
    }, 2000);

    // setTimeout(
    //   () => {
    //     onRequestFail('Subscribe failed!');
    //     this.setState({ requesting: false, subscribed: false })
    //   },2000
    // );
  };

  handleUnsubscribe = () => {
    const { onRequestFail, onRequestSuccess } = this.props;

    // make some API call
    this.setState({ requesting: true });

    setTimeout(() => {
      onRequestSuccess('Successfully unsubscribed');
      this.setState({ requesting: false, subscribed: true });
    }, 2000);

    setTimeout(() => {
      onRequestFail('Unsubscribe failed!');
      this.setState({ requesting: false, subscribed: false });
    }, 2000);
  };

  render() {
    const {
      description,
      benefit,
      price,
      requiredSensors,
      termsAndConditions,
      privacyPolicy,
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
            termsAndConditions={termsAndConditions}
            privacyPolicy={privacyPolicy}
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
