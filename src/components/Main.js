import React from 'react';
import nba from 'nba';
import { ShotChart } from './ShotChart';
import { Profile } from "./Profile";

export class Main extends React.Component {
    //LCA shortchart and profile
    //因为球员名字变化后要triger render 所以要设成state
    state = {
        playerId: nba.findPlayer('Stephen Curry').playerId,
        playerInfo: {},
    }

    componentDidMount() {
        nba.stats.playerInfo({ PlayerID: this.state.playerId }).then((info) => {
            const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
            console.log(playerInfo);
            this.setState({
                playerInfo: playerInfo,
            });
        });
    }
    //把playerid传入shot chart
    render() {
        return (
            <div className="main">
                <Profile playerId={this.state.playerId} playerInfo={this.state.playerInfo}/>
                <ShotChart playerId={this.state.playerId}/>
            </div>
        );
    }
}
