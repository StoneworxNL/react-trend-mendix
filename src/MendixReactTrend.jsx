import { createElement } from "react";

import { HelloWorldSample } from "./components/HelloWorldSample";
import "./ui/MendixReactTrend.css";

export function MendixReactTrend({ trendList, trendValue, gradientObject }) {
    return <HelloWorldSample 
        trendList={trendList} 
        trendValue={trendValue}
        gradientObject={gradientObject}
    />;
}
