import { isValidEasing } from "./components/trend.helpers";

// A gradient only counts from two colors; with one color the line color is used.
const hasGradient = values => Boolean(values.gradientObject && values.gradientObject.length > 1);

/**
 * Hides properties that have no effect with the current configuration.
 * @param {object} values
 * @param {object[]} defaultProperties
 * @returns {object[]}
 */
export function getProperties(values, defaultProperties) {
    if (!values.autoDraw) {
        hideProperties(defaultProperties, ["autoDrawDuration", "autoDrawEasing", "redrawOnChange"]);
    }
    if (!values.smooth) {
        hideProperties(defaultProperties, ["radius"]);
    }
    if (hasGradient(values)) {
        hideProperties(defaultProperties, ["stroke"]);
    }
    return defaultProperties;
}

/**
 * @param {object} values
 * @returns {object[]} problems shown in Studio Pro
 */
export function check(values) {
    const errors = [];
    if (values.gradientObject && values.gradientObject.length === 1) {
        errors.push({
            property: "gradientObject",
            severity: "warning",
            message:
                "A gradient needs at least two colors. With one color the gradient is ignored and Line color is used."
        });
    }
    if (values.autoDraw && values.strokeDasharray && values.strokeDasharray.trim()) {
        errors.push({
            property: "strokeDasharray",
            severity: "warning",
            message:
                "Auto draw uses the dash pattern for its animation, so the dash pattern only shows after the line is drawn."
        });
    }
    if (values.autoDraw && values.autoDrawDuration !== null && values.autoDrawDuration <= 0) {
        errors.push({ property: "autoDrawDuration", message: "Duration must be greater than 0." });
    }
    if (values.autoDraw && values.autoDrawEasing && !isValidEasing(values.autoDrawEasing)) {
        errors.push({
            property: "autoDrawEasing",
            message:
                "Use a CSS easing function: linear, ease, ease-in, ease-out, ease-in-out, cubic-bezier(x1, y1, x2, y2), steps(n) or linear(...)."
        });
    }
    if (values.strokeWidth !== null && Number(values.strokeWidth) <= 0) {
        errors.push({
            property: "strokeWidth",
            message: "Stroke width must be greater than 0, or the line is invisible."
        });
    }
    if (values.strokeOpacity !== null && (Number(values.strokeOpacity) < 0 || Number(values.strokeOpacity) > 1)) {
        errors.push({ property: "strokeOpacity", message: "Opacity must be between 0 and 1." });
    }
    ["width", "height", "padding", "radius"].forEach(key => {
        if (values[key] !== null && values[key] < 0) {
            errors.push({ property: key, message: "This value cannot be negative." });
        }
    });
    return errors;
}

/**
 * @param {object} values
 * @returns {string}
 */
export function getCustomCaption(values) {
    const parts = ["Trend"];
    if (values.smooth) {
        parts.push("smooth");
    }
    if (values.autoDraw) {
        parts.push("auto draw");
    }
    if (hasGradient(values)) {
        parts.push("gradient");
    }
    return parts.join(", ");
}

function hideProperties(groups, keys) {
    groups.forEach(group => {
        if (group.properties) {
            group.properties = group.properties.filter(property => !keys.includes(property.key));
        }
        if (group.propertyGroups) {
            hideProperties(group.propertyGroups, keys);
        }
    });
}
