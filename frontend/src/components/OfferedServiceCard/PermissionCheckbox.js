import React from 'react';
import BottomButton from '../BottomButton';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';


const CheckboxField = ({ dstream, checked, onChange }) => {
  return (
    <div className="offered-service-card__row--checkboxes">
      <FormControlLabel
        control={
          <Checkbox
            type="checkbox"
            onChange={e => onChange(e.target.value)}
            value={dstream.sts_id}
            checked={checked}
          />
        }
        label={
          <div>
          <span className="body-text">{dstream.description}</span>&nbsp;
          <span className="body-text">({dstream.name})</span>
          </div>
        }
      />
    </div>
  );
};

const getCheckedState = (id, dataStreamConsent) => dataStreamConsent.includes(id);

const permissionHandler = (serviceId, dataStreamConsent, serviceUrl, handlePermissionUpdate) => {
  const data = {
    serviceId: serviceId,
    allowed_datastream_ids: dataStreamConsent,
    service_url: serviceUrl,
  }
  handlePermissionUpdate(data)
}

const PermissionCheckbox = ({
  datastreams,
  dataStreamConsent,
  serviceId,
  serviceUrl,
  handleDataStreamChange,
  handlePermissionUpdate,
  disabled}) => {
    return (
      <div>
        {datastreams.map(dstream => (
          <CheckboxField
            key={dstream.sts_id}
            dstream={dstream}
            onChange={handleDataStreamChange}
            checked={getCheckedState(dstream.sts_id, dataStreamConsent)}
          />
        ))}
        <BottomButton
          title={"Update permission"}
          onClick={() => permissionHandler(serviceId, dataStreamConsent, serviceUrl, handlePermissionUpdate)}
          disabled={!disabled}
        />
      </div>
    )
}

export default PermissionCheckbox;
