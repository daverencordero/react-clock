import React from 'react';
import {SlidePicker, SliderPickerProps} from './SliderPicker';
import {Meta, Story} from "@storybook/react";

export default {
    title: 'Utils/SlidePicker',
    component: SlidePicker,
    decorators: [
        (Story: Story<Partial<SliderPickerProps>>) => (
            <div style={{
                margin: '2rem',
                display: 'inline-block',
                boxShadow: '0 0.15rem 0.5rem -0.25rem rgba(0,0,0,0.35)'
            }}>
                <Story />
            </div>
        ),
    ],
} as Meta

const Template: Story<SliderPickerProps> = (args) => <SlidePicker {...args}/>

export const Base = Template.bind({});
Base.args = {
    itemList: [1,2,3,4],
    initialShiftIndex: 0
} as SliderPickerProps


export const ShiftOne = Template.bind({});
ShiftOne.args = {
    itemList: [1,2,3,4],
    initialShiftIndex: 1
} as SliderPickerProps

export const ShiftNegativeOne = Template.bind({});
ShiftNegativeOne.args = {
    itemList: [1,2,3,4],
    initialShiftIndex: -1
} as SliderPickerProps