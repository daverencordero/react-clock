import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from "react";
import "./SlidePicker.scss";
import _ from "lodash";
import {useSprings, animated} from 'react-spring';
import {useDrag} from "@use-gesture/react";
import useMeasure from "react-use-measure";

const {abs, floor} = Math;

export interface SliderPickerProps {
    itemList: any[];
    initialShiftIndex?: number;
}

export const SlidePicker: FC<SliderPickerProps> = (props) => {
    const {
        itemList,
        initialShiftIndex = 0
    } = props;

    const [_itemList, _setItemList] = useState<(string|number|boolean)[]>(itemList);
    const [_shiftIndex, _setShiftIndex] = useState<number>(initialShiftIndex);

    const itemListLength = useMemo(()=>_.size(_itemList), [_itemList]);

    const [ref, {height: itemHeight}] = useMeasure();

    const [itemSprings, itemSpringApi] = useSprings(itemListLength, index => ({
        from: {y: index * itemHeight},
        y: index * itemHeight
    }), [itemHeight])

    const dragBind = useDrag((dragState) => {
        const {offset, down} = dragState;
        const [,y] = offset;

        if(down)
        console.log(`y: ${y} h: ${itemHeight} yh: ${y / itemHeight}`)
    }, {
        axis: "y"
    });

    const _shiftItemList = useCallback(() => {
        if(_shiftIndex === 0) return;
        const shiftFunc: ('shift'|'pop') = _shiftIndex < 0
            ? 'shift'
            : 'pop'
        const absAmount = floor(abs(_shiftIndex));
        _.range(absAmount).forEach(()=>{
            _setItemList(prevItemList => {
                const list = [...prevItemList];
                const splitItem = list[shiftFunc]() as number;
                return shiftFunc === 'shift'
                    ? [...list, splitItem]
                    : [splitItem, ...list]
            })
        })
    }, [_shiftIndex]);

    useEffect(()=>{
        _shiftItemList()
    }, [_shiftItemList]);

    return(
        <div className={'slide-picker'} {...dragBind()}>
            {itemSprings.map(({y}, index) => (
                <animated.div
                    key={index}
                    ref={!index ? ref : null}
                    className={'slide-picker-item'}
                    style={{y}}>
                    {_itemList[index]}
                </animated.div>
            ))}
        </div>
    )
}

function useSpring(arg0: {}) {
    throw new Error("Function not implemented.");
}
