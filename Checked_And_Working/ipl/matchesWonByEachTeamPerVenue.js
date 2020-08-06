function matchesWonByEachTeamPerVenue(matches) {
    const result = {};
    for (let match of matches) {
      const venue = match.venue;
      const winner = match.winner;
      if(!result[venue]){
          result[venue]={}
      }if(result[venue][winner]){
        result[venue][winner]+=1
      }else{
        result[venue][winner]=1
      }
     
   
  }
  return result;
}
  
  module.exports = matchesWonByEachTeamPerVenue;