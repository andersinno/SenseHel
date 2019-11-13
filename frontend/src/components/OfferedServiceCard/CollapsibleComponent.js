import React, { Component } from 'react';
import BottomButton from '../BottomButton';
import CheckboxesSection from './CheckboxesSection';
import DetailItem from '../Card/DetailItem';
import ConfirmDialog from '../ConfirmDialog';
import PermissionCheckbox from './PermissionCheckbox';

class CollapsibleComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      termsChecked: false,
      consentChecked: false,
      confirmOpen: false,
      requesting: false,
      dataStreamConsent: props.allowed_permissions.map(item => item.sts_id)
    };
  }

  handleCheckChange = value => {
    this.setState({ [value]: !this.state[value] }); // eslint-disable-line
  };

  onRequest = async requestHandler => {
    this.setState({ requesting: true, confirmOpen: false });
    await requestHandler(this.props.serviceId, this.props.serviceUrl, this.state.dataStreamConsent);
    this.setState({ requesting: false });
    if (requestHandler.name === 'handleUnsubscribe') {
      this.setState({ dataStreamConsent: []})
    }
  };

  onUnsubscribeClick = () => this.setState({ confirmOpen: true });

  handleDataStreamChange = (datastreamId) => {
    let dataStream = this.state.dataStreamConsent;
    if (dataStream.includes(datastreamId)) {
      dataStream = dataStream.filter(dstream_id => dstream_id !== datastreamId)
    } else {
      dataStream.push(datastreamId)
    }
    this.setState({
      dataStreamConsent: dataStream
    })
  }

  render() {
    const {
      detailFields,
      serviceImageUrl,
      termsAndConditions,
      privacyPolicy,
      subscribed,
      handleSubscribe,
      handleUnsubscribe,
      allowed_permissions,
      classes,
      datastreams,
      handlePermissionUpdate,
      serviceId,
      serviceUrl
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
          <div className="body-text datastream-permission">
            <p className="agree-level">I agree to allow read permission to following datastreams:</p>
            <PermissionCheckbox
              datastreams={datastreams}
              allowed_permissions={allowed_permissions}
              serviceId={serviceId}
              handlePermissionUpdate={handlePermissionUpdate}
              handleDataStreamChange={this.handleDataStreamChange}
              dataStreamConsent={this.state.dataStreamConsent}
              serviceUrl={serviceUrl}
              disabled={subscribed}
            />
          </div>
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
