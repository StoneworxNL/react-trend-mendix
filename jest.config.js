// The widget tools' Jest setup, with Babel instead of SWC: the SWC native binary refuses to load on
// Windows machines whose profile folders grant extra ACLs, while Babel works everywhere.
const base = require("@mendix/pluggable-widgets-tools/test-config/jest.config.js");

module.exports = {
    ...base,
    collectCoverage: false,
    transform: {
        ...Object.fromEntries(Object.entries(base.transform).filter(([pattern]) => !pattern.includes("sx?"))),
        "^.+\\.jsx?$": [
            "babel-jest",
            {
                presets: [
                    ["@babel/preset-env", { targets: { node: "current" } }],
                    ["@babel/preset-react", { runtime: "automatic" }]
                ]
            }
        ]
    }
};
