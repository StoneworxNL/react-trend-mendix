import { check, getCustomCaption, getProperties } from "../MendixReactTrend.editorConfig";

const defaults = {
    gradientObject: [],
    autoDraw: false,
    autoDrawDuration: 2000,
    autoDrawEasing: "ease",
    smooth: false,
    strokeWidth: "1.1",
    strokeOpacity: "1",
    strokeDasharray: "",
    width: 0,
    height: 0,
    padding: 8,
    radius: 8
};
const properties = () => [
    {
        caption: "General",
        propertyGroups: [{ caption: "Color", properties: [{ key: "stroke" }, { key: "gradientObject" }] }]
    }
];
const keys = groups => groups.flatMap(g => g.propertyGroups.flatMap(pg => pg.properties.map(p => p.key)));

describe("editorConfig", () => {
    it("keeps Line color visible with a one-color gradient", () => {
        const values = { ...defaults, gradientObject: [{ color: "red" }] };
        expect(keys(getProperties(values, properties()))).toContain("stroke");
        expect(getCustomCaption(values)).toBe("Trend");
    });

    it("hides Line color from two gradient colors", () => {
        const values = { ...defaults, gradientObject: [{ color: "red" }, { color: "blue" }] };
        expect(keys(getProperties(values, properties()))).not.toContain("stroke");
        expect(getCustomCaption(values)).toBe("Trend, gradient");
    });

    it("flags an invalid easing and a zero stroke width", () => {
        const problems = check({ ...defaults, autoDraw: true, autoDrawEasing: "ease; color: red", strokeWidth: "0" });
        expect(problems.map(p => p.property)).toEqual(expect.arrayContaining(["autoDrawEasing", "strokeWidth"]));
    });

    it("reports nothing for the defaults", () => {
        expect(check(defaults)).toEqual([]);
    });
});
