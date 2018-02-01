import React from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

export class CountSlider extends React.Component {
    state = {
        inputValue: 2,
    }
    //when count onchange, rerender shotchart using LCA put function as a state
    onChange = (value) => {
        // from dataview container
        //because it is not relate to prev state
        //so just send object
        this.setState({
            inputValue: value,
        });
        this.props.onCountSliderChange(value)
    }
    //offset to push left
    render() {
        return (
            <Row>
                <Col span={12} offset={3}>
                    <Slider
                        min={1}
                        max={10}
                        onChange={this.onChange}
                        value={this.state.inputValue} />
                </Col>
                <Col span={4}>
                    <InputNumber
                        min={1}
                        max={10}
                        style={{ marginLeft: 16 }}
                        value={this.state.inputValue}
                        onChange={this.onChange}
                    />
                </Col>
            </Row>
        );
    }
}
