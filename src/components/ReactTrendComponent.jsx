import { createElement, useEffect, useState } from "react";
import Trend from 'react-trend';

export function ReactTrendComponent({ trendList, trendValue, gradientObject, autoDraw, autoDrawDuration, autoDrawEasing, smooth, radius, padding, height, strokeWidth, strokeLineCap }) {

    const [trendDataUS, setTrendDataUS] = useState([]);

    useEffect(() => {
        if  (trendList && trendList.status === 'available' && trendList.items)
            setTrendDataUS(trendList.items.map((item) => {
                return parseInt(trendValue.get(item).displayValue);
            }));
    }, [trendList]);

    if  (trendDataUS && trendDataUS.length > 0)
        return <Trend
            smooth={smooth}
            radius={radius}    
            autoDraw={autoDraw} 
            autoDrawDuration={autoDrawDuration} 
            autoDrawEasing={autoDrawEasing}
            data={trendDataUS}
            gradient={gradientObject.map((item) => {return item.color})}
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLineCap}
            padding={padding}
            height={height}
        />

    return <div></div>
}
