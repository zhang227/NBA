import React from 'react';
import nba from 'nba';
import { Profile } from './Profile';
import { DataViewContainer } from './DataViewContainer';
import {SearchBar} from './SearchBar'

export class Main extends React.Component {
    //LCA shortchart and profile
    //因为球员名字变化后要triger render 所以要设成state
    //state change也rerender
    state = {
        playerInfo: {},
    }

    handleSelectPlayer = (name) => {
        this.loadPlayerInfo(name);
    }


    componentDidMount() {
        this.loadPlayerInfo('Stephen Curry');
    }

    loadPlayerInfo = (playerName) => {
        const id = nba.findPlayer(playerName).playerId;
        //去state.nba.com拿info
        nba.stats.playerInfo({ PlayerID: id }).then((info) => {
            const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);//把两个object merge起来
            console.log(playerInfo);
            this.setState({
                playerInfo: playerInfo
            });
        });
    }
    //把playerid传入shot chart
    //把player info传入 profile triger rerender 下去之后变成props
    render() {
        return (
            <div className="main">
                <SearchBar handleSelectPlayer={this.handleSelectPlayer}/>
                <div className="player">
                    <Profile playerInfo={this.state.playerInfo}/>
                    <DataViewContainer playerId={this.state.playerInfo.playerId}/>
                </div>
            </div>
        );
    }
}
