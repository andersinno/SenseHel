import React, { Component } from 'react';
import classNames from 'classnames';
import Slide from '@material-ui/core/Slide/Slide';
import Collapse from '@material-ui/core/Collapse/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade/Fade';

import './card.styles.css';

const styles = theme => ({
  expand: {
    float: 'right',
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

class Card extends Component {
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
      AdditionalSummaryRow,
      CollapsibleComponent,
      classes
    } = this.props;
    const { expanded } = this.state;

    return (
      <div className="card">
        <div className="card__row">
          <div className="card__col1">
            <img src={image} className="service-logo" alt="service" />
          </div>

          <div className="card__col2">
            <p className="headline card__text">{name}</p>

            <Fade in={!expanded} timeout={200} unmountOnExit>
              <p className="body-text card__text">{description}</p>
            </Fade>
          </div>

          <div className="card__col3">
            <IconButton
              className={classNames(classes.expand, {
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
          <div className="card__row">
            <div className="card__col1" />
            <div className="card__col2">{AdditionalSummaryRow}</div>

            <div className="card__col3" />
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
            {CollapsibleComponent}
          </Slide>
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles)(Card);
