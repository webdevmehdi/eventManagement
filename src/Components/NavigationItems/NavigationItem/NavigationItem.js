import React from "react";
import "./NavigationItem.css";
const NavigationItem = ({ Icon, title }) => {
  return (
    <div className="Navigation__item">
     <Icon className="Navigation__item_icon"/>
   <h2 className="navigation_item_title"> {title}</h2>
      
    </div>
  );
};

export default NavigationItem;


/* className="Navigation__item_icon" */