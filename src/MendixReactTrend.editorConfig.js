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
    if (values.gradientObject && values.gradientObject.length > 0) {
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
            message: "A gradient needs at least two colors. With one color, use Line color instead."
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
    if (values.gradientObject && values.gradientObject.length > 1) {
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
