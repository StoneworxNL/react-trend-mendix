import { createElement } from "react";

import { HelloWorldSample } from "./components/HelloWorldSample";
import "./ui/MendixReactTrend.css";

export function MendixReactTrend({ trendList, trendValue }) {
    return <HelloWorldSample 
        trendList={trendList} 
        trendValue={trendValue}
    />;
}
