/* import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import data from "./BarChartdata";
import "./Barchart.css";
import config from "./config";
class BarChart extends React.Component {
  render() {
    return (
      <div className="barchart">
        <ResponsiveBar
          data={data}
          keys={config.keys}
          indexBy="country"
          margin={config.margin}
          padding={0.3}
          colors="nivo"
          colorBy="id"
          defs={config.defs}
          fill={config.fill}
          borderColor="inherit:darker(1.6)"
          axisTop={null}
          axisRight={null}
          axisBottom={config.axisBottom}
          axisLeft={config.axisLeft}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="inherit:darker(1.6)"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          legends={config.legends}
        />
      </div>
    );
  }
}

export default BarChart;
 */