import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function MarkerIcon() {
    return (
        <Svg width={42} height={42} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#edf6f9" fill="#ade8f4" strokeWidth={1}>
            <Path d="M11.262 17.675 12 17l-.738.675zm1.476 0 .005-.005.012-.014.045-.05.166-.186a38.19 38.19 0 0 0 2.348-2.957c.642-.9 1.3-1.92 1.801-2.933.49-.99.885-2.079.885-3.086C18 4.871 15.382 2 12 2S6 4.87 6 8.444c0 1.007.395 2.096.885 3.086.501 1.013 1.16 2.033 1.8 2.933a38.153 38.153 0 0 0 2.515 3.143l.045.05.012.014.005.005a1 1 0 0 0 1.476 0zM12 17l.738.674L12 17zm0-11a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </Svg>
    );
}
