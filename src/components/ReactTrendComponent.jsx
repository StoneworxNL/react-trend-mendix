import { createElement } from "react";
import classNames from "classnames";
import { Trend } from "./Trend";

// Turns widget property values into Trend props. Shared by the runtime widget and the Studio Pro preview.
export function ReactTrendComponent({
    className,
    style,
    data,
    stroke,
    gradient,
    strokeOpacity,
    width,
    height,
    padding,
    autoDraw,
    autoDrawDuration,
    autoDrawEasing,
    redrawKey,
    strokeWidth,
    strokeLineCap,
    strokeLineJoin,
    strokeDasharray,
    smooth,
    radius,
    ariaLabel
}) {
    const colors = (gradient || []).map(color => (color || "").trim()).filter(Boolean);
    const a11yProps = ariaLabel
        ? { role: "img", "aria-label": ariaLabel }
        : { "aria-hidden": true, focusable: "false" };

    // A line needs at least two points.
    if (!data || data.length < 2) {
        return (
            <div className={classNames("widget-react-trend", "widget-react-trend--empty", className)} style={style} />
        );
    }

    return (
        <div className={classNames("widget-react-trend", className)} style={style}>
            <Trend
                key={autoDraw ? redrawKey : undefined}
                data={data}
                // A gradient needs two colors; with fewer the line color is used.
                gradient={colors.length > 1 ? colors : undefined}
                stroke={stroke && stroke.trim() ? stroke.trim() : "currentColor"}
                strokeOpacity={toNumber(strokeOpacity, 1)}
                width={positive(width)}
                height={positive(height)}
                padding={toNumber(padding, 8)}
                autoDraw={autoDraw}
                autoDrawDuration={toNumber(autoDrawDuration, 2000)}
                autoDrawEasing={autoDrawEasing || "ease"}
                strokeWidth={toNumber(strokeWidth, 1.1)}
                strokeLinecap={strokeLineCap}
                strokeLinejoin={strokeLineJoin}
                strokeDasharray={strokeDasharray && strokeDasharray.trim() ? strokeDasharray.trim() : undefined}
                smooth={smooth}
                radius={toNumber(radius, 8)}
                {...a11yProps}
            />
        </div>
    );
}

// Decimal widget properties arrive as Big.js objects, integers as numbers.
export function toNumber(value, fallback) {
    if (value === null || value === undefined || value === "") {
        return fallback;
    }
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
}

function positive(value) {
    const number = toNumber(value, 0);
    return number > 0 ? number : undefined;
}
