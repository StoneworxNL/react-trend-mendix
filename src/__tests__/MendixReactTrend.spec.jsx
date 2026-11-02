import { render } from "@testing-library/react";
import { MendixReactTrend } from "../MendixReactTrend";
import { ReactTrendComponent, toNumber } from "../components/ReactTrendComponent";

const listValue = (values, status = "available") => {
    const items = values.map((value, index) => ({ id: String(index), value }));
    return { status, items };
};
const attribute = { get: item => ({ value: item.value }) };

const renderWidget = (props = {}) =>
    render(
        <MendixReactTrend
            class="my-class"
            trendList={listValue([1, 2.5, 3])}
            trendValue={attribute}
            gradientObject={[]}
            {...props}
        />
    );

describe("MendixReactTrend", () => {
    it("draws a line from the attribute values", () => {
        const { container } = renderWidget();
        expect(container.querySelector("path").getAttribute("d")).toContain("L");
        expect(container.querySelector(".widget-react-trend")).toHaveClass("my-class");
    });

    it("keeps the line while the data source reloads", () => {
        const { container, rerender } = renderWidget();
        rerender(
            <MendixReactTrend
                trendList={listValue([1, 2.5, 3], "loading")}
                trendValue={attribute}
                gradientObject={[]}
            />
        );
        expect(container.querySelector("path")).not.toBeNull();
    });

    it("skips empty values and renders an empty container below two points", () => {
        const { container } = renderWidget({ trendList: listValue([4, undefined]) });
        expect(container.querySelector("svg")).toBeNull();
        expect(container.querySelector(".widget-react-trend--empty")).not.toBeNull();
    });
});

describe("ReactTrendComponent", () => {
    const data = [1, 3, 2];

    it("uses the line color when the gradient has one color", () => {
        const { container } = render(<ReactTrendComponent data={data} gradient={["red"]} stroke="#007693" />);
        expect(container.querySelector("linearGradient")).toBeNull();
        expect(container.querySelector("svg")).toHaveAttribute("stroke", "#007693");
    });

    it("draws a gradient from two colors", () => {
        const { container } = render(<ReactTrendComponent data={data} gradient={["red", "blue"]} />);
        expect(container.querySelectorAll("stop")).toHaveLength(2);
        expect(container.querySelector("path").getAttribute("stroke")).toMatch(/^url\(#/);
    });

    it("falls back to the current text color", () => {
        const { container } = render(<ReactTrendComponent data={data} />);
        expect(container.querySelector("svg")).toHaveAttribute("stroke", "currentColor");
    });

    it("labels the chart for screen readers, or hides it", () => {
        const labelled = render(<ReactTrendComponent data={data} ariaLabel="Revenue going up" />);
        expect(labelled.container.querySelector("svg")).toHaveAttribute("aria-label", "Revenue going up");
        const hidden = render(<ReactTrendComponent data={data} />);
        expect(hidden.container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    });

    it("does not add style tags for auto draw", () => {
        const before = document.head.querySelectorAll("style").length;
        render(<ReactTrendComponent data={data} autoDraw autoDrawEasing="ease } body { display: none" />);
        expect(document.head.querySelectorAll("style")).toHaveLength(before);
    });
});

describe("toNumber", () => {
    it("converts Big-like values and falls back on empty input", () => {
        expect(toNumber({ toString: () => "1.25", valueOf: () => 1.25 }, 0)).toBe(1.25);
        expect(toNumber(undefined, 8)).toBe(8);
        expect(toNumber("abc", 2)).toBe(2);
    });
});
