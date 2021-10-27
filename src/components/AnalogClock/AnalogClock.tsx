import React, {FC} from 'react';
import Styles from './AnalogClock.module.scss';
import _ from 'lodash';


export interface AnalogClockProps {
    prefixCls: string;
    showClock: boolean;
    isArmyTime: boolean;
    clockBodyWidth: number;
    clockBodyHeight: number;
}

export const AnalogClock: FC<AnalogClockProps> = (props) => {
    const {
        prefixCls,
        showClock = true,
        isArmyTime = false,
        clockBodyWidth = 10,
        clockBodyHeight = 10
    } = props;

    const hours = isArmyTime
        ? _.range(0, 24)
        : _.range(1, 13);
    const minutesSeconds = _.range(0, 60);
    const period = ['am', 'pm'];

    const clockBodyStyles = {
        width: `${clockBodyWidth}rem`,
        height: `${clockBodyHeight}rem`
    }

    const analogClockWrapperProps = {
        className: _.compact([prefixCls, Styles.AnalogClock]).join(' ')
    }

    return(
        <div {...analogClockWrapperProps}>
            {showClock && <div
                style={clockBodyStyles}
                className={Styles.AnalogClock_ClockBody}>
            </div>}
            <div className={Styles.AnalogClock_TimePicker}>
                <div className={Styles.HoursList}>Hour</div>
                <div className={Styles.SecondsList}>Seconds</div>
            </div>
        </div>
    )
}