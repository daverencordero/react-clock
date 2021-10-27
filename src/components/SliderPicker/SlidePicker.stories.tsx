import React from 'react';
import {useSlidePicker, UseSlidePickerProps} from './SliderPicker';
import {Story} from "@storybook/react";

export default {
    title: 'Utils/SlidePicker',
    component: useSlidePicker
}

const Template: Story<UseSlidePickerProps> = (args) => {
    const {itemList = []} = args;

    const {
        slidePicker
    } = useSlidePicker({
        itemList
    });

    return (
        <div>
            {slidePicker}
        </div>
    );
}
export const Base = Template.bind({});
Base.args = {
    itemList: [1,2,3,4]
} as UseSlidePickerProps