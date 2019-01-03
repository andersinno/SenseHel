import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const ConfirmDialog = ({
  title,
  description,
  open,
  handleClose,
  handleConfirm
}) => (
  <div>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <p className="subheader dark-text">{title}</p>
        <p className="body-text dark-text">{description}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Go Back</Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

ConfirmDialog.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired
};

ConfirmDialog.defaultProps = {
  title: 'Are you sure you want to continue with this action?',
  description: ''
};

export default ConfirmDialog;
