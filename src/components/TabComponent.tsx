import React, {useState} from "react";

export const NavTabs = (tabData, activeTab, setActiveTab) => {
  return (
    <ul className="nav nav-tabs" id="infoTab" role="tablist">
      {tabData.map((item, index) => (
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${index === activeTab && "active"}`}
            id={`${item.tabName}-tab`}
            data-bs-toggle="tab"
            data-bs-target={`#${item.tabName}`}
            type="button"
            role="tab"
            aria-controls={item.tabName}
            aria-selected={index === activeTab ? "true" : "false"}
            onClick={() => setActiveTab(index)}
          >
            {item.tabName}
          </button>
        </li>
      ))}
    </ul>
  );
};

export const TabContent = (tabData, activeTab) => {
  return (
    <div className="tab-content" id="infoTabContent">
      {tabData.map((item, index) => (
        <div
          className={`tab-pane fade ${index === activeTab && "show active"}`}
          id={item.tabName}
          role="tabpanel"
          aria-labelledby={`${item.tabName}-tab-content`}
          tabindex="0"
        >
          {item.tabContent}
        </div>
      ))}
    </div>
  );
};

export default function TabComponent() {
  const [activeTab, setActiveTab] = useState(0);
  const tabData = [
    {
      tabName: "tab-1",
      content: "content-1",
    },
    {
      tabName: "tab-2",
      content: "content-2",
    },
    {
      tabName: "tab-3",
      content: "content-3",
    },
  ];

  return (
    <div className="tab-section d-flex flex-column">
      <NavTabs tabData={tabData} activeTab={activeTab} setActiveTab={setActiveTab} />
      <TabContent tabData={tabData} activeTab={activeTab} />
    </div>
  );
}
