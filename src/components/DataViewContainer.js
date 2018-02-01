import React from 'react';
import { ShotChart } from './ShotChart';
import { CountSlider } from "./CountSlider";
import _ from 'lodash';
import { Radio, Row, Col, Switch } from 'antd';

const RadioGroup = Radio.Group;

export class DataViewContainer extends React.Component {
    //LCA of count slider and shot chart and can render this both
    state = {
        minCount: 2,
        chartType: 'hexbin', //initial as hexbin
        displayToolTips: true, //toolto[s initial true
    }
    //when count onchange, rerender shotchart using LCA put function as a state
    //when state change triger rerender
    //decounce here
    onCountSliderChange = (count) => {
        this.setState({ minCount: Number(count) || 2 }); //in case input a not number
    }

    onChartTypeChange = (e) => {
        this.setState({ chartType: e.target.value });
    }

    onTooltipChange = (displayToolTips) => {
        this.setState({ displayToolTips });
    }

    render() {
        return (
            <div className="data-view">
                <ShotChart
                    playerId={this.props.playerId}
                    minCount={this.state.minCount}
                    chartType={this.state.chartType}
                    displayToolTips={this.state.displayToolTips}
                />
                <div className="filters">
                    {this.state.chartType === 'hexbin'?
                        <CountSlider
                            minCount={this.state.minCount}
                            onCountSliderChange={_.debounce(this.onCountSliderChange, 500)}
                        /> : null
                    }
                    <Row className="chart-type-radio">
                        <Col span={12} offset={3}>
                            <RadioGroup onChange={this.onChartTypeChange} value={this.state.chartType}>
                                <Radio value="hexbin">Hexbin</Radio>
                                <Radio value="scatter">Scatter</Radio>
                            </RadioGroup>
                        </Col>
                        <Col span={6}>
                            Tooltip:{' '}
                            <Switch
                                checkedChildren="On"
                                unCheckedChildren="Off"
                                defaultChecked
                                onChange={this.onTooltipChange}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
