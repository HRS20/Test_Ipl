function extraRunsConcededByEachTeam(deliveries, matches) {
  const result = {};
  //const result1={};
  for (let x of matches) {
    if (x.season === "2016") {
      for (let team of deliveries) {
        const bowling_team = team.bowling_team;
        const extra_runs = parseInt(team.extra_runs);
        if (x.id === team.match_id) {
          if (result[bowling_team]) {
            result[bowling_team] += extra_runs;
          } else {
            result[bowling_team] = extra_runs;
          }
        }
      }
    }
  }
  return result;
}
//   for (let team of deliveries) {
//     const batting_team = team.batting_team;
//     const extra_runs = parseInt(team.extra_runs);
//     if (result[batting_team]) {
//       result[batting_team] += extra_runs;
//     } else {
//       result[batting_team] = extra_runs;
//     }
//   }
//   return result;
// }

module.exports = extraRunsConcededByEachTeam;
