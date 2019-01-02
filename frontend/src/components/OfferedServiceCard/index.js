import React, { Component } from 'react';
import classnames from 'classnames';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade/Fade';

import './offeredservicecard.styles.css';
import Icons from '../../assets/Icons';
import MoreDetailView from './MoreDetailView';

const styles = theme => ({
  expand: {
    position: 'absolute',
    right: 0,
    margin: 5,
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
});

class OfferedServiceCard extends Component {
  state = {
    expanded: false
  };

  handleExpandClick = () => {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  };

  render() {
    const {
      image,
      name,
      description,
      price,
      benefit,
      requiredSensors,
      classes
    } = this.props;
    const { expanded } = this.state;

    return (
      <div className="offered-service-card">
        <div className="offered-service-card__row">
          <div className="offered-service-card__col1">
            <img src={image} className="col1__img" alt="service" />
          </div>

          <div className="offered-service-card__col2">
            <p className="headline offered-service-card__text">{name}</p>

            <Fade in={!expanded} timeout={200} unmountOnExit>
              <p className="body-text offered-service-card__text">
                {description}
              </p>
            </Fade>
          </div>

          <div className="offered-service-card__col3">
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </div>

        <Fade in={!expanded} timeout={200} unmountOnExit>
          <div className="offered-service-card__row">
            <div className="offered-service-card__col1" />
            <div className="offered-service-card__col2">
              <table className="row2__col2__table">
                <tbody>
                  <tr>
                    <th className="body-text">Price</th>
                    <th className="body-text">Benefit</th>
                  </tr>

                  <tr>
                    <td className="body-text">
                      <b>{price}</b>
                    </td>
                    <td className="body-text">
                      <img
                        className="benefit-col__body-text__icon"
                        src={Icons.Green_Arrow}
                        alt="green arrow"
                      />
                      <b>{benefit.short}%</b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="offered-service-card__col3" />
          </div>
        </Fade>

        <MoreDetailView
          expanded={expanded}
          description={description}
          benefit={benefit}
          price={price}
          requiredSensors={requiredSensors}
        />
      </div>
    );
  }
}

export default withStyles(styles)(OfferedServiceCard);
