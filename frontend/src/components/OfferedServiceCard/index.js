import React, { Component } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

import './offeredservicecard.styles.css';
import Icons from '../../assets/Icons';

class OfferedServiceCard extends Component {
  state = {
    expanded: false
  };

  handleExpandClick = () => {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  };

  render() {
    const { image, name, description, price, benefit } = this.props;
    const { expanded } = this.state;
    const showMoreIconExpandedClass =
      expanded && 'col3__show-more-icon-clicked';

    return (
      <div className="offered-service-card">
        <div className="offered-service-card__row1">
          <div className="offered-service-card__col1">
            <img src={image} className="col1__img" alt="service" />
          </div>

          <div className="offered-service-card__col2">
            <p className="headline offered-service-card__text">{name}</p>
            <p className="body-text offered-service-card__text">
              {description}
            </p>
          </div>

          <div className="offered-service-card__col3">
            <IconButton
              className={`col3__show-more-icon ${showMoreIconExpandedClass}`}
              onClick={this.handleExpandClick}
              aria-expanded={expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </div>

        <div className="offered-service-card__row2">
          <div className="offered-service-card__col1" />
          <div className="offered-service-card__col2">
            <table className="row2__col2__table">
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
                  <b>{benefit}%</b>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default OfferedServiceCard;
