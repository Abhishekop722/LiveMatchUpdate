import React, { Component } from "react";
import axios from "axios";
import cron, { CronJob } from "cron";
import Score from "./Score";
import classes from "./App.css";
import Teams from "./Teams";

class CricAPI extends Component {
  state = {
    score: "",
    stat: "",
    team1: ``,
    team2: ``,
    firstRun: true
  };

  componentDidMount() {
    if (this.state.firstRun) {
      axios
        .get(
          "https://cricapi.com/api/cricketScore?apikey=ArPh3wmOLGgKDv0mfa7grHuxYjq1&unique_id=1144511"
        )
        .then(response => {
          console.log(response.data);
          this.setState({
            score: response.data.score,
            stat: response.data.stat,
            team1: response.data["team-1"],
            team2: response.data["team-2"],
            firstRun: false
          });
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .finally(function() {
          // always executed
        });
    }
    new CronJob(
      "*/5 * * * *",
      () => {
        console.log("You will see this message every 2nd minute");
        axios
          .get(
            "https://cricapi.com/api/cricketScore?apikey=ArPh3wmOLGgKDv0mfa7grHuxYjq1&unique_id=1144511"
          )
          .then(response => {
            console.log(response.data);
            this.setState({
              score: response.data.score,
              stat: response.data.stat,
              team1: response.data["team-1"],
              team2: response.data["team-2"]
            });
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          })
          .finally(function() {
            // always executed
          });
      },
      null,
      true
    );
  }

  render() {
    return (
      <div className={classes.Image}>
        <div className={classes.App}>
          <h1 style={{ paddingTop: 25 }}>Cricket World Cup</h1>
          <Teams teamOne={this.state.team1} teamTwo={this.state.team2} />
          <Score
            newScoreTeam1={this.state.score.split("v").shift()}
            newScoreTeam2={this.state.score.split("v").pop()}
            newStat={this.state.stat}
          />
        </div>
      </div>
    );
  }
}

export default CricAPI;
