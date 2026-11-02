import { createElement, useId, useLayoutEffect, useMemo, useRef } from "react";
import { buildLinearPath, buildSmoothPath, isValidEasing, normalizeDataset } from "./trend.helpers";

// A small rewrite of react-trend 1.2.5 by Unsplash (MIT): https://github.com/unsplash/react-trend
// The auto draw animation uses the Web Animations API on the path itself, so nothing is added to the
// document's <head> and nothing is left behind when the line remounts.
export function Trend({
    data,
    smooth,
    radius = 8,
    width,
    height,
    padding = 8,
    gradient,
    autoDraw,
    autoDrawDuration = 2000,
    autoDrawEasing = "ease",
    strokeDasharray,
    ...svgProps
}) {
    const pathRef = useRef(null);
    const gradientId = `react-trend-gradient-${useId().replace(/:/g, "")}`;

    const viewBoxWidth = width || 300;
    const viewBoxHeight = height || 75;

    const path = useMemo(() => {
        if (!data || data.length < 2) {
            return null;
        }
        const points = normalizeDataset(data, {
            minX: padding,
            maxX: viewBoxWidth - padding,
            // SVG y runs top to bottom, data runs bottom to top.
            minY: viewBoxHeight - padding,
            maxY: padding
        });
        return smooth ? buildSmoothPath(points, radius) : buildLinearPath(points);
    }, [data, smooth, radius, padding, viewBoxWidth, viewBoxHeight]);

    useLayoutEffect(() => {
        const element = pathRef.current;
        if (
            !autoDraw ||
            !element ||
            typeof element.animate !== "function" ||
            typeof element.getTotalLength !== "function"
        ) {
            return undefined;
        }
        const length = element.getTotalLength();
        let animation;
        try {
            animation = element.animate(
                [
                    { strokeDasharray: `${length}`, strokeDashoffset: `${length}` },
                    { strokeDasharray: `${length}`, strokeDashoffset: "0" }
                ],
                { duration: autoDrawDuration, easing: isValidEasing(autoDrawEasing) ? autoDrawEasing : "ease" }
            );
        } catch (e) {
            return undefined;
        }
        // Once drawn, the line falls back to its own dash pattern (if any).
        return () => animation.cancel();
        // The animation only plays when the line mounts; remounting (a new key) replays it.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!path) {
        return null;
    }

    const hasGradient = gradient && gradient.length > 1;

    return (
        <svg
            width={width || "100%"}
            height={height || "25%"}
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            {...svgProps}
        >
            {hasGradient && (
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                        {gradient
                            .slice()
                            .reverse()
                            .map((color, index) => (
                                <stop key={index} offset={index / (gradient.length - 1)} stopColor={color} />
                            ))}
                    </linearGradient>
                </defs>
            )}
            <path
                ref={pathRef}
                d={path}
                fill="none"
                stroke={hasGradient ? `url(#${gradientId})` : undefined}
                strokeDasharray={strokeDasharray}
            />
        </svg>
    );
}
