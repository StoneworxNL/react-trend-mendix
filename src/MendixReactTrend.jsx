import { createElement } from "react";

import { HelloWorldSample } from "./components/HelloWorldSample";
import "./ui/MendixReactTrend.css";

export function MendixReactTrend({ trendList, trendValue, gradientObject, autoDraw, autoDrawDuration, autoDrawEasing, smooth, radius, padding, height, strokeWidth, strokeLineCap }) {
    return <HelloWorldSample 
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
