# Changelog

All notable changes to the React Trend widget are listed here.

## [1.1.0] - 2026-11-02

Requires Mendix 11 or newer.

### Added
- Line color (any CSS color; empty uses the current text color), line opacity and an explicit width.
- Line join and dash pattern.
- Redraw on data change: plays the auto draw animation again when the data changes.
- Accessibility description: read by screen readers. Without it the chart is hidden from them.
- Integer and Long attributes, next to Decimal.
- Studio Pro: a design mode preview, properties that hide when they have no effect, and checks for odd settings (one-color gradient, invalid easing, stroke width of 0, negative sizes).
- Unit tests.

### Changed
- The widget no longer needs a data view: use any list data source.
- react-trend is replaced by a small built-in rewrite. The auto draw animation now runs on the line itself, so nothing is added to the page's `<head>` anymore.
- A gradient needs at least two colors. With one color, Line color is used.
- Minimum Node.js for building is 22.18.

### Fixed
- Values were read from the formatted display value with `parseInt`, which cut off decimals and broke on thousand separators (for example "1.234,5"). Values now come from the attribute itself.
  **Upgrade note:** charts with decimal values change shape after the upgrade, because the decimals are now drawn.
- An empty gradient list made the line invisible.
- The CSS class and style set in Studio Pro were ignored.
- The chart blanked out and replayed its animation every time its data source reloaded.
- Empty values broke the line; they are now skipped.

## [1.0.2] - 2025

- First public version, based on react-trend 1.2.5.
