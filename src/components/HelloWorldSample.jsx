import { createElement, useEffect, useState } from "react";
import Trend from 'react-trend';

export function HelloWorldSample({ trendList, trendValue, gradientObject }) {

    const [trendDataUS, setTrendDataUS] = useState([]);

    useEffect(() => {
        if  (trendList && trendList.status === 'available' && trendList.items)
            setTrendDataUS(trendList.items.map((item) => {
                return parseInt(trendValue.get(item).displayValue);
            }));
    }, [trendList]);

    if  (trendDataUS && trendDataUS.length > 0)
        return <Trend
            smooth
            autoDraw
            autoDrawDuration={3000}
            autoDrawEasing="ease-out"
            data={trendDataUS}
            gradient={gradientObject.map((item) => {return item.color})}
            radius={6.8}
            strokeWidth={2}
            strokeLinecap={'square'}
        />

    return <div></div>
}
