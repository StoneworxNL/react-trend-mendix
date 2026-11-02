import { createElement } from "react";
import { ReactTrendComponent } from "./components/ReactTrendComponent";

// Sample line shown in Studio Pro design mode, where no data is available.
const SAMPLE_DATA = [0, 10, 5, 22, 3.6, 11, 18, 14, 26, 20, 30, 24, 35];

export function preview({
    class: className,
    stroke,
    gradientObject,
    strokeOpacity,
    width,
    height,
    padding,
    strokeWidth,
    strokeLineCap,
    strokeLineJoin,
    strokeDasharray,
    smooth,
    radius
}) {
    return (
        <ReactTrendComponent
            className={className}
            data={SAMPLE_DATA}
            stroke={stroke}
            gradient={(gradientObject || []).map(item => item.color)}
            strokeOpacity={strokeOpacity}
            width={width}
            height={height}
            padding={padding}
            autoDraw={false}
            strokeWidth={strokeWidth}
            strokeLineCap={strokeLineCap}
            strokeLineJoin={strokeLineJoin}
            strokeDasharray={strokeDasharray}
            smooth={smooth}
            radius={radius}
        />
    );
}

export function getPreviewCss() {
    return require("./ui/MendixReactTrend.css");
}
