const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWonByEachTeam = require("./ipl/matchesWonByEachTeam");
const extraRunsConcededByEachTeam = require("./ipl/extraRunsConcededByEachTeam");
const topTenEconomicalBowler = require("./ipl/topTenEconomicalBowler");
const matchesWonByEachTeamPerVenue = require("./ipl/matchesWonByEachTeamPerVenue");

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";

function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then((matches) => {
      csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then((deliveries) => {
          let result1 = matchesPlayedPerYear(matches);
          let result2 = matchesWonByEachTeam(matches);
          let result3 = extraRunsConcededByEachTeam(deliveries, matches);

          let result4 = topTenEconomicalBowler(deliveries, matches);
          let result5 = matchesWonByEachTeamPerVenue(matches);
          //console.log(matchesWonByEachTeamPerVenue(matches));
          saveMatchesPlayedPerYear(result1, result2, result3, result4, result5);
        });
    });
}

function saveMatchesPlayedPerYear(result1, result2, result3, result4, result5) {
  const jsonData = {
    matchesPlayedPerYear: result1,
    matchesWonByEachTeam: result2,
    extraRunsConcededByEachTeam: result3,
    topTenEconomicalBowler: result4,
    matchesWonByEachTeamPerVenue: result5,
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", (err) => {
    if (err) {
      console.error(err);
    }
  });
}

main();
