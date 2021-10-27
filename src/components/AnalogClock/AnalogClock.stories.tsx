import React from 'react';
import {AnalogClock, AnalogClockProps} from "./AnalogClock";
import {Story} from "@storybook/react";

export default {
    title: 'ReactClock/AnalogClock',
    component: AnalogClock,
    decorators: [
        (Story: Story<any>) => (
            <div style={{ margin: '3em' }}>
                <Story />
            </div>
        ),
    ],
}

const Template: Story<AnalogClockProps> = (args) => <AnalogClock {...args}/>

export const Base = Template.bind({});
Base.args = {}