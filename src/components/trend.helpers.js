// Geometry helpers adapted from react-trend 1.2.5 by Unsplash (MIT): https://github.com/unsplash/react-trend

export function normalize(value, min, max, scaleMin = 0, scaleMax = 1) {
    // A flat data set is drawn along the bottom.
    if (min === max) {
        return scaleMin;
    }
    return scaleMin + ((value - min) * (scaleMax - scaleMin)) / (max - min);
}

// A loop instead of Math.min(...data), which throws a RangeError on very large data sets.
export function getBounds(data) {
    let min = Infinity;
    let max = -Infinity;
    for (const value of data) {
        if (value < min) min = value;
        if (value > max) max = value;
    }
    return { min, max };
}

export function normalizeDataset(data, { minX, maxX, minY, maxY }) {
    const { min, max } = getBounds(data);
    const points = data.map((value, index) => ({
        x: normalize(index, 0, data.length - 1, minX, maxX),
        y: normalize(value, min, max, minY, maxY)
    }));
    // A path with a height of 0 cannot show a gradient, so nudge a flat line by a hair.
    if (min === max) {
        points[0].y += 0.0001;
    }
    return points;
}

function moveTo(to, from, radius) {
    const vector = { x: to.x - from.x, y: to.y - from.y };
    const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    return { x: from.x + (vector.x / length) * radius, y: from.y + (vector.y / length) * radius };
}

function getDistanceBetween(p1, p2) {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}

function checkForCollinearPoints(p1, p2, p3) {
    return (p1.y - p2.y) * (p1.x - p3.x) === (p1.y - p3.y) * (p1.x - p2.x);
}

export function buildLinearPath(points) {
    return points.map(({ x, y }, index) => `${index === 0 ? "M" : "L"} ${x},${y}`).join("\n");
}

export function buildSmoothPath(points, radius) {
    const [first, ...others] = points;
    return others.reduce((path, point, index) => {
        const next = others[index + 1];
        const prev = others[index - 1] || first;
        if (!next || checkForCollinearPoints(prev, point, next)) {
            return `${path}\nL ${point.x},${point.y}`;
        }
        const threshold = Math.min(getDistanceBetween(prev, point), getDistanceBetween(next, point));
        const radiusForPoint = threshold / 2 < radius ? threshold / 2 : radius;
        const before = moveTo(prev, point, radiusForPoint);
        const after = moveTo(next, point, radiusForPoint);
        return [path, `L ${before.x},${before.y}`, `S ${point.x},${point.y} ${after.x},${after.y}`].join("\n");
    }, `M ${first.x},${first.y}`);
}

const EASING_KEYWORDS = ["linear", "ease", "ease-in", "ease-out", "ease-in-out", "step-start", "step-end"];
const NUMBER = "-?(\\d+\\.?\\d*|\\.\\d+)";
const CUBIC_BEZIER = new RegExp(
    `^cubic-bezier\\(\\s*${NUMBER}\\s*,\\s*${NUMBER}\\s*,\\s*${NUMBER}\\s*,\\s*${NUMBER}\\s*\\)$`
);
const STEPS = /^steps\(\s*\d+\s*(,\s*(jump-start|jump-end|jump-none|jump-both|start|end)\s*)?\)$/;
const LINEAR_FN = /^linear\(\s*[\d\s.,%-]+\)$/;

// True for the CSS easing functions auto draw accepts.
export function isValidEasing(easing) {
    const value = (easing || "").trim().toLowerCase();
    return EASING_KEYWORDS.includes(value) || CUBIC_BEZIER.test(value) || STEPS.test(value) || LINEAR_FN.test(value);
}
