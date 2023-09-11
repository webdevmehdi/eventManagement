export default {
  keys: ["Tache 1", "Tache 2", "Tache 3"],
  margin: {
    top: 50,
    right: 130,
    bottom: 50,
    left: 60,
  },
  defs: [
    {
      id: "dots",
      type: "patternDots",
      background: "inherit",
      color: "red",
      size: 4,
      padding: 1,
      stagger: true,
    },
  ],
  fill: [
    {
      match: {
        id: "Tache 1",
      },
      id: "dots",
    },
    {
      match: {
        id: "Tache 2",
      },
      id: "lines",
    },
    {
      match: {
        id: "Tache 3",
      },
      id: "lines",
    },
  ],
  axisBottom: {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: "taches",
    legendPosition: "middle",
    legendOffset: 32,
  },
  axisLeft: {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: "hours",
    legendPosition: "middle",
    legendOffset: -40,
  },
  legends: [
    {
      dataFrom: "keys",
      anchor: "bottom-right",
      direction: "column",
      justify: false,
      translateX: 120,
      translateY: 0,
      itemsSpacing: 2,
      itemWidth: 100,
      itemHeight: 20,
      itemDirection: "left-to-right",
      itemOpacity: 0.85,
      symbolSize: 20,
      effects: [
        {
          on: "hover",
          style: {
            itemOpacity: 1,
          },
        },
      ],
    },
  ],
};
