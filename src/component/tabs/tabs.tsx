import React, { useState } from 'react';
import './tabs.css'; // Import stylesheet
import { TabModal } from 'modal/index';

interface Tab {
  id: number;
  title: string;
}
const Tabs: React.FC<TabModal> = (props) => {

  const RowListComponent = props.RowList;

  const [tabs, setTabs] = useState<Tab[]>([
    { id: 1, title: 'ReactJS' },
    { id: 2, title: 'JS'},
  ]);

  const [activeTab, setActiveTab] = useState<number>(tabs[0].id);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  const tabcontent = tabs.find((element) => element.id === activeTab)?.title ?? ''

  return (
    <div className="tabs-container">
      <ul className="tab-list">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`tab-item ${tab.id === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.title}
          </li>
        ))}
      </ul>
      <div className='line'></div>
      <div className="tab-content-container">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-content ${tab.id === activeTab ? 'active' : ''}`}
          >
            {RowListComponent && <RowListComponent tabKey={tabcontent}/>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
