import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';

// Icons
import Icons from '../../assets/Icons';

const variantIcon = {
  success: Icons.Success,
  error: Icons.Failure
};

const styles1 = () => ({
  snackbarContent: {
    minHeight: 80
  },
  success: {
    backgroundColor: green[500]
  },
  error: {
    backgroundColor: '#df3a00'
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    width: 40,
    opacity: 0.9,
    marginRight: 20
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
});

function MySnackbarContent(props) {
  const { classes, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], classes.snackbarContent)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <img
            alt={variant}
            src={Icon}
            className={classNames(classes.icon, classes.iconVariant)}
          />
          <div>
            <p className="title left-aligned no-margin">
              <b>{message.title || message}</b>
            </p>
            {message.subtitle && (
              <p className="body-text no-margin">{message.subtitle}</p>
            )}
          </div>
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  message: PropTypes.oneOfType(
    PropTypes.string,
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['success', 'error']).isRequired
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const CustomizedSnackbar = ({ open, handleClose, variant, message }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left'
    }}
    open={open}
    autoHideDuration={5000}
    onClose={handleClose}
  >
    <MySnackbarContentWrapper
      onClose={handleClose}
      variant={variant}
      message={message}
    />
  </Snackbar>
);

CustomizedSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['success', 'error']).isRequired,
  message: PropTypes.node.isRequired
};

export default CustomizedSnackbar;
