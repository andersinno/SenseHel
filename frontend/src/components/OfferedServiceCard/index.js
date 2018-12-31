import React, { Component } from 'react';
import classnames from 'classnames';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse/Collapse';
import Slide from '@material-ui/core/Slide/Slide';
import Fade from '@material-ui/core/Fade/Fade';

import './offeredservicecard.styles.css';
import Icons from '../../assets/Icons';
import Images from '../../assets/Images';

const styles = theme => ({
  expand: {
    position: 'relative',
    right: 0,
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
          </div>
        </Fade>

        <Collapse in={expanded} timeout="auto" mountOnEnter unmountOnExit>
          <Slide
            direction="up"
            in={expanded}
            timeout={500}
            mountOnEnter
            unmountOnExit
          >
            <div>
              <div className="offered-service-card__row">
                <img
                  className="service-image"
                  src={Images.Placeholder_Long}
                  alt="placeholder"
                />
              </div>

              <div className="offered-service-card__row offered-service-card__row--detail">
                <p className="title offered-service-card__text row--detail__title">
                  DETAIL
                </p>
                <p className="body-text offered-service-card__text row--detail__description">
                  {description}
                </p>
              </div>

              <div className="offered-service-card__row offered-service-card__row--detail">
                <p className="title offered-service-card__text row--detail__title">
                  BENEFIT
                </p>
                <p className="body-text offered-service-card__text row--detail__description">{`${
                  benefit.long
                }`}</p>
              </div>

              <div className="offered-service-card__row offered-service-card__row--detail">
                <p className="title offered-service-card__text row--detail__title">
                  PRICE
                </p>
                <p className="body-text offered-service-card__text row--detail__description">
                  {price}
                </p>
              </div>

              <div className="offered-service-card__row offered-service-card__row--detail">
                <p className="title offered-service-card__text row--detail__title">
                  REQUIRED SENSORS
                </p>
                <p className="body-text offered-service-card__text row--detail__description">
                  {requiredSensors}
                </p>
              </div>
            </div>
          </Slide>
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles)(OfferedServiceCard);
