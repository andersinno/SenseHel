import React, { Component } from 'react';
import BottomButton from '../BottomButton';
import CheckboxesSection from './CheckboxesSection';
import DetailItem from '../Card/DetailItem';
import ConfirmDialog from '../ConfirmDialog';

class CollapsibleComponent extends Component {
  state = {
    termsChecked: false,
    consentChecked: false,
    requesting: false,
    subscribed: false,
    confirmOpen: false
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

  onUnsubscribe = () => this.setState({ confirmOpen: true });

  handleUnsubscribe = () => {
    const { onRequestSuccess } = this.props;

    // make some API call
    this.setState({ requesting: true, confirmOpen: false });

    setTimeout(() => {
      onRequestSuccess('Successfully unsubscribed');
      this.setState({ requesting: false, subscribed: false });
    }, 2000);

    // setTimeout(() => {
    //   onRequestFail('Unsubscribe failed!');
    //   this.setState({ requesting: false, subscribed: false });
    // }, 2000);
  };

  render() {
    const {
      detailFields,
      serviceImageUrl,
      termsAndConditions,
      privacyPolicy,
      classes
    } = this.props;
    const {
      termsChecked,
      consentChecked,
      requesting,
      subscribed,
      confirmOpen
    } = this.state;

    const {
      description,
      price,
      benefit_long: benefit,
      required_sensors: requiredSensors
    } = detailFields;

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
              src={serviceImageUrl}
              alt="placeholder"
            />
          </div>

          <DetailItem title="DETAIL" description={description} />

          <DetailItem title="BENEFIT" description={benefit} />

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
          variant={subscribed ? 'negative' : 'default'}
          title={buttonTitle}
          onClick={!subscribed ? this.handleSubscribe : this.onUnsubscribe}
          disabled={!subscribed && (!termsChecked || !consentChecked)}
          loading={requesting}
        />

        <ConfirmDialog
          title="Confirm Unsubscribe"
          description="Unsubcribing will revoke all consents given and you will no longer have access to the benefits of this service"
          handleConfirm={this.handleUnsubscribe}
          open={confirmOpen}
          handleClose={() => this.setState({ confirmOpen: false })}
        />
      </div>
    );
  }
}

export default CollapsibleComponent;
