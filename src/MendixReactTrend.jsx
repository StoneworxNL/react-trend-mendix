import { createElement, useMemo } from "react";
import { ReactTrendComponent } from "./components/ReactTrendComponent";
import "./ui/MendixReactTrend.css";

export function MendixReactTrend({
    class: className,
    style,
    trendList,
    trendValue,
    stroke,
    gradientObject,
    strokeOpacity,
    width,
    height,
    padding,
    autoDraw,
    autoDrawDuration,
    autoDrawEasing,
    redrawOnChange,
    strokeWidth,
    strokeLineCap,
    strokeLineJoin,
    strokeDasharray,
    smooth,
    radius,
    ariaLabel
}) {
    // While a reload is "loading" Mendix keeps the previous items; keep showing them so the chart
    // does not blank out and replay its animation on every refresh.
    const items = trendList && trendList.status !== "unavailable" ? trendList.items : undefined;

    const data = useMemo(() => {
        if (!items || !trendValue) {
            return [];
        }
        return items
            .map(item => trendValue.get(item).value)
            .filter(value => value !== undefined && value !== null)
            .map(value => Number(value))
            .filter(Number.isFinite);
    }, [items, trendValue]);

    // Changing the key remounts the line, which replays the auto draw animation.
    const redrawKey = redrawOnChange ? data.join(",") : "static";

    return (
        <ReactTrendComponent
            className={className}
            style={style}
            data={data}
            stroke={stroke}
            gradient={(gradientObject || []).map(item => item.color)}
            strokeOpacity={strokeOpacity}
            width={width}
            height={height}
            padding={padding}
            autoDraw={autoDraw}
            autoDrawDuration={autoDrawDuration}
            autoDrawEasing={autoDrawEasing}
            redrawKey={redrawKey}
            strokeWidth={strokeWidth}
            strokeLineCap={strokeLineCap}
            strokeLineJoin={strokeLineJoin}
            strokeDasharray={strokeDasharray}
            smooth={smooth}
            radius={radius}
            ariaLabel={ariaLabel && ariaLabel.status === "available" ? ariaLabel.value : undefined}
        />
    );
}
