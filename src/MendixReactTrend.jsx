import { createElement } from "react";

import { ReactTrendComponent } from "./components/ReactTrendComponent";
import "./ui/MendixReactTrend.css";

export function MendixReactTrend({ trendList, trendValue, gradientObject, autoDraw, autoDrawDuration, autoDrawEasing, smooth, radius, padding, height, strokeWidth, strokeLineCap }) {
    return <ReactTrendComponent 
        trendList={trendList} 
        trendValue={trendValue}
        gradientObject={gradientObject}
        autoDraw={autoDraw}
        autoDrawDuration={autoDrawDuration}
        autoDrawEasing={autoDrawEasing}
        smooth={smooth}
        radius={radius}
        padding={padding}
        height={height}
        strokeWidth={strokeWidth}
        strokeLineCap={strokeLineCap}
    />;
}
