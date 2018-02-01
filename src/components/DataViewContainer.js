import React from 'react';
import { ShotChart } from './ShotChart';
import { CountSlider } from "./CountSlider";
import _ from 'lodash';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

export class DataViewContainer extends React.Component {
    //LCA of count slider and shot chart and can render this both
    state = {
        minCount: 2,
    }
    //when count onchange, rerender shotchart using LCA put function as a state
    //when state change triger rerender
    onCountSliderChange = (count) => {
        this.setState({ minCount: Number(count) || 2 });
    }

    render() {
        return (
            <div className="data-view">
                <ShotChart playerId={this.props.playerId} minCount={this.state.minCount}/>
                <div className="filters">
                    <CountSlider
                        minCount={this.state.minCount}
                        onCountSliderChange={_.debounce(this.onCountSliderChange, 500)}/>
                </div>
            </div>
        );
    }
}
