import { createElement, useEffect, useState } from "react";
import Trend from 'react-trend';

export function HelloWorldSample({ trendList, trendValue, gradientObject, autoDraw_, autoDrawDuration_, autoDrawEasing_, smooth_, radius_, padding_, height_, strokeWidth_, strokeLineCap_ }) {

    const [trendDataUS, setTrendDataUS] = useState([]);

    useEffect(() => {
        if  (trendList && trendList.status === 'available' && trendList.items)
            setTrendDataUS(trendList.items.map((item) => {
                return parseInt(trendValue.get(item).displayValue);
            }));
    }, [trendList]);

    if  (trendDataUS && trendDataUS.length > 0)
        return <Trend
            smooth={smooth_}
            radius={radius_}    
            autoDraw={autoDraw_} 
            autoDrawDuration={autoDrawDuration_} 
            autoDrawEasing={autoDrawEasing_}
            data={trendDataUS}
            gradient={gradientObject.map((item) => {return item.color})}
            strokeWidth={strokeWidth_}
            strokeLinecap={strokeLineCap_}
            padding={padding_}
            height={height_}
        />

    return <div></div>
}
