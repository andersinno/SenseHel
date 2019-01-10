import React, { Component } from 'react';
import BottomButton from '../BottomButton';
import CheckboxesSection from './CheckboxesSection';
import DetailItem from '../Card/DetailItem';
import ConfirmDialog from '../ConfirmDialog';

class CollapsibleComponent extends Component {
  state = {
    termsChecked: false,
    consentChecked: false,
    confirmOpen: false,
    requesting: false
  };

  handleCheckChange = value => {
    this.setState({ [value]: !this.state[value] }); // eslint-disable-line
  };

  onRequest = async requestHandler => {
    this.setState({ requesting: true, confirmOpen: false });
    await requestHandler();
    this.setState({ requesting: false });
  };

  onUnsubscribeClick = () => this.setState({ confirmOpen: true });

  render() {
    const {
      detailFields,
      serviceImageUrl,
      termsAndConditions,
      privacyPolicy,
      subscribed,
      handleSubscribe,
      handleUnsubscribe,
      classes
    } = this.props;
    const {
      termsChecked,
      consentChecked,
      confirmOpen,
      requesting
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
            termsChecked={subscribed || termsChecked}
            consentChecked={subscribed || consentChecked}
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
          onClick={
            !subscribed
              ? () => this.onRequest(handleSubscribe)
              : this.onUnsubscribeClick
          }
          disabled={!subscribed && (!termsChecked || !consentChecked)}
          loading={requesting}
        />

        <ConfirmDialog
          title="Confirm Unsubscribe"
          description="Unsubcribing will revoke all consents given and you will no longer have access to the benefits of this service"
          handleConfirm={() => this.onRequest(handleUnsubscribe)}
          open={confirmOpen}
          handleClose={() => this.setState({ confirmOpen: false })}
        />
      </div>
    );
  }
}

export default CollapsibleComponent;
