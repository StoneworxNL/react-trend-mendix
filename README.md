## Data Spreadsheet Mendix Pluggable Widget
A Mendix widget to show trend charts based on https://github.com/unsplash/react-trend. 

<img alt="Mendix Pluggable Widget Data Spreadsheet Logo" src="https://github.com/joaodelopes/data-spreadsheet-mendix/blob/main/images/logo.png" width="65px"/>

Quoting the [Unsplash's README](https://github.com/unsplash/react-trend?tab=readme-ov-file#react-trend), "Graphing tools are often complex, abstract, and heavy. They require domain-specific knowledge, and a significant time investment. But what if you just need a spark line that shows a trend? (...) These are very simple and elegant visualizations, and they should not require a bloated graphing library to produce."

Now, it is possible to easily build these simple trend graphs (similar to the ones shown by Github, for instance) in your Mendix application.

## Features
Easily show trending charts. Custom settings include:

*   Gradient or Solid Color;
*   Height/Padding;
*   Autodraw (Enable/Duration/Easing)
*   Stroke/Smoothing (Stroke Width, Stroke Line Cap, Smoothing Enabled, Radius)


## Usage
1. Add a dataview that returns an objec (root) associated with a list of objects (that contain the trend values).
2. Inside the dataview, add the Trend widget.
3. Custumize it.

### Configuration Screenshots
<img alt="Toolbox Screenshot" src="https://github.com/joaodelopes/mendix-react-trend/blob/main/images/toolbox.png" width="50px"/>
<img alt="Page Setup Screenshot" src="https://github.com/joaodelopes/mendix-react-trend/blob/main/images/pagesetup.png" width="500px"/>
<img alt="Studio Pro" src="https://github.com/joaodelopes/mendix-react-trend/blob/main/images/studiopro1.png" width="500px"/>
<img alt="Studio Pro" src="https://github.com/joaodelopes/mendix-react-trend/blob/main/images/configgeneral.png" width="300px"/>
<img alt="Studio Pro" src="https://github.com/joaodelopes/mendix-react-trend/blob/main/images/strokesmoothing.png" width="300px"/>
<img alt="Studio Pro" src="https://github.com/joaodelopes/mendix-react-trend/blob/main/images/autodraw.png" width="300px"/>

<!-- ![Usage in Mendix Studio Pro (General)](https://github.com/joaodelopes/data-spreadsheet-mendix/blob/main/images/studiopro0.png)

### Export Settings
![Usage in Mendix Studio Pro (Export Settings)](https://github.com/joaodelopes/data-spreadsheet-mendix/blob/main/images/studiopro1.png) -->


## Demo project
- [Mendix app running on the cloud](https://reacttrend-sandbox.mxapps.io/index.html)
- [Mendix demo module (.mpk)](https://github.com/joaodelopes/mendix-react-trend/tree/main/demo)

![Trend Demo](https://github.com/joaodelopes/mendix-react-trend/blob/main/images/app.png)
<!-- - [Marketplace widget](https://marketplace.mendix.com/link/component/237438) -->
<!-- - [Mendix demo scss (.scss)](https://github.com/joaodelopes/block-note-mendix/blob/main/demo/demo.scss) -->

## Issues, suggestions and feature requests

*   No known issues at the moment. If you have improvement suggestions, feel free to contact us.


## About Stoneworx

<img alt="From https://www.stoneworx.nl/o" src="https://cdn.prod.website-files.com/66991b9fc069c88aec093fd1/66b242753e65840128c97ab9_imagehero-p-800.png" width="50px"/>

We started our company as friends and will always remain a club of people that likes doing business in a friendly matter. A group of entrepreneurial, smart and highly experienced Mendix professionals.  

On a daily basis, we create software applications that simplify our clients’ business processes by using the Mendix low code platform. It is our mission is to turn complex ideas into simple solutions for medium to corporate-sized businesses, in any industry.