import React, {ReactNode, useCallback, useEffect, useState} from "react";
import _ from "lodash";
import Styles from "../AnalogClock/AnalogClock.module.scss";

const {abs, floor} = Math;

export interface UseSlidePickerValues {
    slidePicker: ReactNode,
    setShiftIndex: React.Dispatch<React.SetStateAction<number>>
}

export interface UseSlidePickerProps {
    itemList: any[]
}

export const useSlidePicker = (props: UseSlidePickerProps) => {
    const {
        itemList
    } = props;

    const [_itemList, _setItemList] = useState<(string|number|boolean)[]>(itemList);
    const [_shiftIndex, _setShiftIndex] = useState<number>(0);

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

    const slidePicker =
        <div className={Styles.SlidePicker}>
            {_itemList.map((item) =>
                <div className={Styles.SlidePicker_Item}>
                    {item}
                </div>)}
        </div>

    return {
        slidePicker,
        setShiftIndex: _setShiftIndex
    } as UseSlidePickerValues
}