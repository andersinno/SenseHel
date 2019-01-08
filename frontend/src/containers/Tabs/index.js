import React, { Component } from 'react';
import './tabs.styles.css';
import Icons from '../../assets/Icons';
import HomePage from '../Home';
import SubscriptionsPage from '../Subscriptions';
import SensorsPage from '../Sensors';
import AboutPage from '../About';

const tabOptions = [
  {
    name: 'home',
    component: changeTab => <HomePage changeTab={changeTab} />,
    icon: Icons.Home_Icon,
    activeIcon: Icons.Home_Icon_Active
  },
  {
    name: 'subscriptions',
    component: () => <SubscriptionsPage />,
    icon: Icons.Subscription_Icon,
    activeIcon: Icons.Subscription_Icon_Active
  },
  {
    name: 'sensors',
    component: () => <SensorsPage />,
    icon: Icons.Sensors_Icon,
    activeIcon: Icons.Sensors_Icon_Active
  },
  {
    name: 'about',
    component: () => <AboutPage />,
    icon: Icons.About_Icon,
    activeIcon: Icons.About_Icon_Active
  }
];

class Tabs extends Component {
  state = {
    activeTab: tabOptions[0]
  };

  onTabChange = selectedTabIndex => {
    const selectedTab = tabOptions[selectedTabIndex];
    this.setState({ activeTab: selectedTab });
  };

  render() {
    const { activeTab } = this.state;

    return (
      <div className="tabs-page">
        <div className="tabs-page__page">
          {activeTab.component(this.onTabChange)}
        </div>

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
    {tabs.map((t, i) => (
      <div className="icon-container" key={t.name}>
        <img
          className="icon-container__img"
          src={activeTab.name === t.name ? t.activeIcon : t.icon}
          onClick={() => onTabChange(i)}
          alt={t.name}
          onKeyDown={() => this.onTabChange(i)}
        />
      </div>
    ))}
  </div>
);

export default Tabs;
