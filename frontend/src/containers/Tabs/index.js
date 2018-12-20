import React, { Component } from 'react';
import './tabs.styles.css';
import Icons from '../../assets/Icons';
import HomePage from '../Home';

const tabOptions = [
  {
    name: 'home',
    component: () => <HomePage />,
    icon: Icons.Home_Icon,
    activeIcon: Icons.Home_Icon_Active
  },
  {
    name: 'subscriptions',
    component: () => <h1>SUBSCRIPTIONS</h1>,
    icon: Icons.Subscription_Icon,
    activeIcon: Icons.Subscription_Icon_Active
  },
  {
    name: 'sensors',
    component: () => <h1>SENSORS</h1>,
    icon: Icons.Sensors_Icon,
    activeIcon: Icons.Sensors_Icon_Active
  },
  {
    name: 'about',
    component: () => <h1>ABOUT</h1>,
    icon: Icons.About_Icon,
    activeIcon: Icons.About_Icon_Active
  }
];

class Tabs extends Component {
  state = {
    activeTab: tabOptions[0]
  };

  onTabChange = selectedTab => {
    this.setState({ activeTab: selectedTab });
  };

  render() {
    const { activeTab } = this.state;

    return (
      <div className="tabs-page">
        <div className="tabs-page__page">{activeTab.component()}</div>

        <BottomTabNavigator
          tabs={tabOptions}
          activeTab={activeTab}
          onTabChange={this.onTabChange}
        />
      </div>
    );
  }
}

const BottomTabNavigator = ({ tabs, activeTab, onTabChange }) => (
  <div className="bottom-tab-navigator">
    {tabs.map(t => (
      <div className="icon-container" key={t.name}>
        <img
          className="icon-container__img"
          src={activeTab.name === t.name ? t.activeIcon : t.icon}
          onClick={() => onTabChange(t)}
          alt={t.name}
          onKeyDown={() => this.onTabChange(t)}
        />
      </div>
    ))}
  </div>
);

export default Tabs;
