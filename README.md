## Trend Chart Mendix Pluggable Widget
A Mendix widget to show trend charts based on https://github.com/unsplash/react-trend. 

<img alt="Toolbox Screenshot" src="https://github.com/StoneworxNL/react-trend-mendix/blob/main/images/logo.png" width="50px"/>

Quoting the [Unsplash's README](https://github.com/unsplash/react-trend?tab=readme-ov-file#react-trend), "Graphing tools are often complex, abstract, and heavy. They require domain-specific knowledge, and a significant time investment. But what if you just need a spark line that shows a trend? (...) These are very simple and elegant visualizations, and they should not require a bloated graphing library to produce."

Now, it is possible to easily build these simple trend graphs (similar to the ones shown by Github, for instance) in your Mendix application.

## Features
Easily show trending charts. Custom settings include:

*   Gradient or Solid Color;
*   Height/Padding;
*   Autodraw (Enable/Duration/Easing)
*   Stroke/Smoothing (Stroke Width, Stroke Line Cap, Smoothing Enabled, Radius)


## Usage
Feel free to check the [demo (.mpk)](https://github.com/StoneworxNL/mendix-react-trend/tree/main/demo) for a better understanding.

1. Add a dataview that returns an object (root) associated with a list of objects (that contain the trend values).
2. Inside the dataview, add the Trend widget.
3. Custumize it.

### Configuration Screenshots

#### Toolbox
<img alt="Toolbox Screenshot" src="https://github.com/StoneworxNL/react-trend-mendix/blob/main/images/toolbox.png" width="150px"/>

#### Page Setup
<img alt="Page Setup Screenshot" src="https://github.com/StoneworxNL/react-trend-mendix/blob/main/images/pagesetup.png" width="300px"/>

#### Domain Model (Demo)
<img alt="Domain Model Demo" src="https://github.com/StoneworxNL/react-trend-mendix/blob/main/images/domainmodel.png" width="400px"/>

#### Studio Pro
![Studio Pro Screenshot](https://github.com/StoneworxNL/react-trend-mendix/blob/main/images/studiopro1.png)

#### Widget's General Settings
<img alt="Widget's General Settings" src="https://github.com/StoneworxNL/react-trend-mendix/blob/main/images/configgeneral.png" width="500px"/>

#### Widget's Auto-Draw Settings
<img alt="Widget's Auto-Draw Settings" src="https://github.com/StoneworxNL/react-trend-mendix/blob/main/images/autodraw.png" width="500px"/>

#### Widget's Stroke/Smoothing Settings
<img alt="Widget's Stroke/Smoothing Settings" src="https://github.com/StoneworxNL/react-trend-mendix/blob/main/images/strokesmoothing.png" width="500px"/>

## Demo Project
- [Mendix app running on the cloud](https://reacttrend-sandbox.mxapps.io/index.html)
- [Mendix demo module (.mpk)](https://github.com/StoneworxNL/react-trend-mendix/tree/main/demo)

![Trend Demo](https://github.com/StoneworxNL/react-trend-mendix/blob/main/images/app.png)
<!-- - [Marketplace widget](https://marketplace.mendix.com/link/component/237438) -->
<!-- - [Mendix demo scss (.scss)](https://github.com/StoneworxNL/block-note-mendix/blob/main/demo/demo.scss) -->

## Issues, Suggestions and Feature Requests

*   No known issues at the moment. If you have improvement suggestions, feel free to contact us.
