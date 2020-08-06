function fetchAndVisualizeData() {
  fetch("./data.json")
    .then((r) => r.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

function visualizeData(data) {
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  visualizeMatchesWonByEachTeam(data.matchesWonByEachTeam);
  visualizeExtraRunsConcededByEachTeam(data.extraRunsConcededByEachTeam);
  visualizeTenEconomicalBowlers(data.topTenEconomicalBowler);
  visualizeMatchesWonByEachTeamPerVenue(data.matchesWonByEachTeamPerVenue);
  return;
}

//Matches played per year
function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const seriesData = [];
  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }
  console.log(seriesData, "played per year");
  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column",
    },
    title: {
      text: "Matches Played Per Year",
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches",
      },
    },
    series: [
      {
        name: "Years",
        data: seriesData,
      },
    ],
  });
}

//Matches won by each team per year

function visualizeMatchesWonByEachTeam(matchesWonByEachTeam) {
  let years = Object.keys(matchesWonByEachTeam);
  let teams = Object.keys(matchesWonByEachTeam[years[0]]);

  let seriesData = [];

  for (team in teams) {
    data = {
      name: teams[team],
      temp: [],
    };
    for (let year in years) {
      if (
        matchesWonByEachTeam[years[year]] &&
        matchesWonByEachTeam[years[year]][teams[team]]
      ) {
        data.temp.push(matchesWonByEachTeam[years[year]][teams[team]]);
      } else {
        data.temp.push(0);
      }
    }
    seriesData.push(data);
  }
  // for (let year in matchesWonByEachTeam) {
  //   temp = [];
  //   for (let team in matchesWonByEachTeam[year]) {
  //     if (matchesWonByEachTeam[year][team]) {
  //       temp.push([team, matchesWonByEachTeam[year][team]]);
  //     } else {
  //       temp.push(0);
  //     }
  //   }
  //   seriesData.push({ year: year, data: temp });
  // }
  console.log(seriesData, "series");
  //checking
  Highcharts.chart("matches-won-by-each-team", {
    chart: {
      type: "column",
    },
    title: {
      text: "Matches won by each team over all the years",
    },
    subtitle: {
      text: "Source: ipl.com",
    },
    xAxis: {
      categories: years,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches Won",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: seriesData,
  });

  ///checking end
  // Highcharts.chart("matches-won-by-each-team", {
  //   chart: {
  //     type: "column",
  //   },
  //   title: {
  //     text: "Matches won by each team over all the years",
  //   },
  //   subtitle: {
  //     text:
  //       'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
  //   },
  //   xAxis: {
  //     categories: years,
  //   },
  //   yAxis: {
  //     min: 0,
  //     title: {
  //       text: "Matches",
  //     },
  //     stackLabels: {
  //       enabled: true,
  //     },
  //   },
  //   plotOptions: {
  //     column: {
  //       stacking: "normal",
  //       dataLabels: {
  //         enabled: true,
  //       },
  //     },
  //   },
  //   series: seriesData,
  // });
}

// Extra runs conceded by each team

function visualizeExtraRunsConcededByEachTeam(extraRunsConcededByEachTeam) {
  let seriesData = [];
  for (let key in extraRunsConcededByEachTeam) {
    seriesData.push([key, extraRunsConcededByEachTeam[key]]);
  }
  console.log(seriesData);
  Highcharts.chart("extra-runs-conceded-by-each-team", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
    },
    title: {
      text: "Extra Runs Conceded<br>by Each Team<br>2016",
      align: "center",
      verticalAlign: "middle",
      y: 75,
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -90,
          style: {
            fontWeight: "bold",
            color: "grey",
          },
        },
        startAngle: -90,
        endAngle: 90,
        center: ["50%", "75%"],
        size: "150%",
      },
    },
    series: [
      {
        type: "pie",
        name: "Browser share",
        innerSize: "75%",
        data: seriesData,
      },
    ],
  });
}

// top 10 economical bowler

function visualizeTenEconomicalBowlers(topTenEconomicalBowler) {
  let seriesData = [];
  for (let player in topTenEconomicalBowler) {
    seriesData.push([player, topTenEconomicalBowler[player].economuRate]);
  }
  seriesData = seriesData.slice(0, 10);

  console.log(seriesData, "economical player");
  Highcharts.chart("Top-Ten-Economic-Bowlers", {
    chart: {
      type: "column",
    },
    title: {
      text: "Top Ten Economical Bowler",
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economic Rate",
      },
    },
    series: [
      {
        name: "Bowler",
        data: seriesData,
      },
    ],
  });
}
// Matches won by each team per venue
function visualizeMatchesWonByEachTeamPerVenue(matchesWonByEachTeamPerVenue) {
  let venues = Object.keys(matchesWonByEachTeamPerVenue);
  console.log(venues);
  //let team = Object.keys(matchesWonByEachTeamPerVenue[venue[0]]);
  //console.log(team, "team");
  let seriesData = [];
  for (let venue in matchesWonByEachTeamPerVenue) {
    let temp = [];
    for (let team in matchesWonByEachTeamPerVenue[venue]) {
      temp.push([team, matchesWonByEachTeamPerVenue[venue][team]]);
    }
    seriesData.push({ name: venue, data: temp });
  }
  console.log(seriesData);

  Highcharts.chart("Matches-Won-By-Each-Team-Per-Venue", {
    chart: {
      type: "column",
    },
    title: {
      text: "Matches Won by each team per venue",
    },
    subtitle: {
      text: "Source: ipl.com",
    },
    xAxis: {
      categories: venues,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches Played",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.02,
        borderWidth: 0,
      },
    },
    series: seriesData,
  });
}
