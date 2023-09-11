import React from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import BarChart from "../Charts/BarChart/BarChart";
import "./GridChart.css";
import MyResponsivePie from "../Charts/PieCharts/PieChart";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Avatar } from "@material-ui/core";
import Hoc from "../UI/HOC/Hoc";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class GridChart extends React.Component {
  constructor(props) {
    super(props);
  /*   this.state = {
      currentBreakpoint: { lg: 1200, md: 868, sm: 768, xs: 480, xxs: 320 },
      compactType: "vertical",
      cols: { lg: 3, md: 4, sm: 4, xs: 4, xxs: 4 },
    }; */
  }

  render() {
    return (
      <>
       {/*  <ResponsiveReactGridLayout
          breakpoints={this.state.currentBreakpoint}
          cols={this.state.cols}
        > */}
{/*           <div className='chartPie' data-grid={{ x: 1, y: 2, w: 4, h: 2.5 }} key={1}>
 */}            <MyResponsivePie />
{/*           </div>
 */}        {/* </ResponsiveReactGridLayout> */}
      </>
    );
  }
}

/* ShowcaseLayout.defaultProps = {
  className: "layout",
  rowHeight: 30,
  onLayoutChange: function() {},
  cols: { lg: 4, md: 2, sm: 1, xs: 2, xxs: 2 },
  initialLayout: { x: 0, y: 0, w: 2, h: 3, i: 1 },
};    {/*   <div
            style={{ backgroundColor: "gray" }}
            data-grid={{ x: 0, y: 0, w: 1, h: 2 }}
            key={1}
          >
            <span>hello</span>
          </div> */
/*      <div
            style={{ backgroundColor: "gray" }}
            data-grid={{ x: 0, y: 1, w: 2, h: 2 }}
            key={2}
          >
            
            <BarChart />
          </div> */
