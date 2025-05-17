import { createElement, useEffect, useState } from "react";
import Trend from 'react-trend';

export function HelloWorldSample({ trendList, trendValue }) {

    const [trendDataUS, setTrendDataUS] = useState([]);

    useEffect(() => {
        debugger;
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
            gradient={['#00c6ff', '#F0F', '#FF0']}
            radius={6.8}
            strokeWidth={2}
            strokeLinecap={'square'}
            />
    return <div>Loading...</div>
}
