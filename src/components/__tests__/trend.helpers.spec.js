import { buildLinearPath, getBounds, isValidEasing, normalize, normalizeDataset } from "../trend.helpers";

describe("trend helpers", () => {
    it("normalizes a value to a new scale", () => {
        expect(normalize(5, 0, 10, 0, 100)).toBe(50);
    });

    it("draws a flat data set along the bottom", () => {
        expect(normalize(3, 3, 3, 10, 20)).toBe(10);
    });

    it("finds bounds of very large data sets without a RangeError", () => {
        const data = Array.from({ length: 300000 }, (_, i) => i % 1000);
        expect(getBounds(data)).toEqual({ min: 0, max: 999 });
    });

    it("spreads points evenly and flips the y axis", () => {
        const points = normalizeDataset([0, 10], { minX: 0, maxX: 100, minY: 50, maxY: 0 });
        expect(points).toEqual([
            { x: 0, y: 50 },
            { x: 100, y: 0 }
        ]);
    });

    it("nudges a flat line so a gradient still shows", () => {
        const points = normalizeDataset([4, 4, 4], { minX: 0, maxX: 10, minY: 10, maxY: 0 });
        expect(points[0].y).not.toBe(points[1].y);
    });

    it("builds a linear path", () => {
        expect(
            buildLinearPath([
                { x: 0, y: 1 },
                { x: 2, y: 3 }
            ])
        ).toBe("M 0,1\nL 2,3");
    });

    it.each([
        "ease",
        "linear",
        "ease-in-out",
        "cubic-bezier(0.65, 0, 0.35, 1)",
        "steps(4, end)",
        "linear(0, 0.25 75%, 1)"
    ])("accepts the easing %s", easing => expect(isValidEasing(easing)).toBe(true));

    it.each(["", "fast", "ease; color: red", "cubic-bezier(1, 2)", "ease } body { display: none"])(
        "rejects the easing %s",
        easing => expect(isValidEasing(easing)).toBe(false)
    );
});
