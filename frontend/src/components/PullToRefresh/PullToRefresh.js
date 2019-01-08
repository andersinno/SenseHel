/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';

export class PullToRefresh extends React.Component {
  container;

  containerRef(container) {
    this.container = container;
  }

  pullDown;

  pullDownRef(pullDown) {
    this.pullDown = pullDown;
    const maxPullDownDistance =
      this.pullDown &&
      this.pullDown.firstChild &&
      this.pullDown.firstChild.getBoundingClientRect
        ? this.pullDown.firstChild.getBoundingClientRect().height
        : 0;
    this.setState({ maxPullDownDistance });
  }

  dragging = false;

  startY = 0;

  currentY = 0;

  constructor(props) {
    super(props);
    this.state = {
      pullToRefreshThresholdBreached: false,
      maxPullDownDistance: 0,
      onRefreshing: false
    };

    this.containerRef = this.containerRef.bind(this);
    this.pullDownRef = this.pullDownRef.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  componentDidMount() {
    if (!this.container) {
      return;
    }

    this.container.addEventListener('touchstart', this.onTouchStart);
    this.container.addEventListener('touchmove', this.onTouchMove);
    this.container.addEventListener('touchend', this.onEnd);
    this.container.addEventListener('mousedown', this.onTouchStart);
    this.container.addEventListener('mousemove', this.onTouchMove);
    this.container.addEventListener('mouseup', this.onEnd);
  }

  componentWillUnmount() {
    if (!this.container) {
      return;
    }

    this.container.removeEventListener('touchstart', this.onTouchStart);
    this.container.removeEventListener('touchmove', this.onTouchMove);
    this.container.removeEventListener('touchend', this.onEnd);
    this.container.removeEventListener('mousedown', this.onTouchStart);
    this.container.removeEventListener('mousemove', this.onTouchMove);
    this.container.removeEventListener('mouseup', this.onEnd);
  }

  onTouchStart(e) {
    const { triggerHeight = 40 } = this.props;
    this.startY = e.pageY || e.touches[0].pageY;
    this.currentY = this.startY;
    const top =
      this.container.getBoundingClientRect().top ||
      this.container.getBoundingClientRect().y ||
      0;
    if (this.startY - top > triggerHeight) {
      return;
    }

    this.dragging = true;
    this.container.style.transition = 'transform 0.2s cubic-bezier(0,0,0.31,1)';
    this.pullDown.style.transition = 'transform 0.2s cubic-bezier(0,0,0.31,1)';
  }

  onTouchMove(e) {
    if (!this.dragging) {
      return;
    }

    this.currentY = e.pageY || e.touches[0].pageY;
    if (this.currentY < this.startY) {
      return;
    }

    e.preventDefault();

    if (this.currentY - this.startY >= this.props.pullDownThreshold) {
      this.setState({
        pullToRefreshThresholdBreached: true
      });
    }

    if (this.currentY - this.startY > this.state.maxPullDownDistance) {
      return;
    }

    this.container.style.overflow = 'visible';
    this.container.style.transform = `translate(0px, ${this.currentY -
      this.startY}px)`;
  }

  onEnd() {
    this.dragging = false;
    this.startY = 0;
    this.currentY = 0;

    if (!this.state.pullToRefreshThresholdBreached) {
      this.initContainer();
      return;
    }

    this.container.style.overflow = 'visible';
    this.container.style.transform = `translate(0px, ${
      this.props.pullDownThreshold
    }px)`;
    this.setState(
      {
        onRefreshing: true
      },
      () => {
        this.props.onRefresh().then(() => {
          this.initContainer();
          setTimeout(() => {
            this.setState({
              onRefreshing: false,
              pullToRefreshThresholdBreached: false
            });
          }, 200);
        });
      }
    );
  }

  initContainer() {
    requestAnimationFrame(() => {
      if (this.container) {
        this.container.style.overflow = 'auto';
        this.container.style.transform = 'none';
      }
    });
  }

  renderPullDownContent() {
    const { releaseContent, pullDownContent, refreshContent } = this.props;
    const { onRefreshing, pullToRefreshThresholdBreached } = this.state;
    const content = onRefreshing
      ? refreshContent
      : pullToRefreshThresholdBreached
      ? releaseContent
      : pullDownContent;
    const contentStyle = {
      position: 'absolute',
      overflow: 'hidden',
      left: 0,
      right: 0,
      top: 0
    };
    return (
      <div style={contentStyle} ref={this.pullDownRef}>
        {content}
      </div>
    );
  }

  render() {
    const { backgroundColor, children } = this.props;
    const containerStyle = {
      height: '100%',
      WebkitOverflowScrolling: 'touch',
      position: 'relative',
      zIndex: 1
    };

    if (backgroundColor) {
      containerStyle.backgroundColor = backgroundColor;
    }

    return (
      <div style={containerStyle}>
        {this.renderPullDownContent()}
        <div ref={this.containerRef} style={containerStyle}>
          {children}
        </div>
      </div>
    );
  }
}

PullToRefresh.propTypes = {
  pullDownContent: PropTypes.node.isRequired,
  releaseContent: PropTypes.node.isRequired,
  refreshContent: PropTypes.node.isRequired,
  pullDownThreshold: PropTypes.number.isRequired,
  onRefresh: PropTypes.func.isRequired,
  triggerHeight: PropTypes.string,
  backgroundColor: PropTypes.string
};

PullToRefresh.defaultProps = {
  triggerHeight: '200px',
  backgroundColor: 'white'
};
