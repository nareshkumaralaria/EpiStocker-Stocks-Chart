
# EpiStocker - Stocks Chart

EpiStocker show how a company's publicly traded shares are performing. These charts can show a company's stock performance over time periods ranging from several years/months to a few days.
## Authors

- [@nareshkumaralaria](https://github.com/nareshkumaralaria) (Naresh Kumar)


## Features

- Mobile Responsive
- Easy to use
- Time interval filters
- User friendly


## Live Link

For live preview you can visit this link
https://epistocker.netlify.app/
## Run Locally

Clone the project

```bash
  git clone https://github.com/nareshkumaralaria/EpiStocker-Stocks-Chart.git
```

Go to the project directory

```bash
  cd EpiStocker-Stocks-Chart
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Open http://localhost:3000 to view it in your browser.
## API Reference

[Twelve Data](https://twelvedata.com/) API has been used to get the Exchanges/stocks data.

#### Get all Exchange list

```http
  GET /exchanges
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get Stock list

```http
  GET /stocks
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `exchange`      | `string` | **Required**. Default: NASDAQ |

#### Get Time Series

```http
  GET /time_series
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `symbol`      | `string` | **Required**. Default: AMZN |
| `interval`      | `string` | **Required**. Default: 1day |
| `outputsize`      | `NUMBER` | **Optional**. Default: 30 |



## Dependencies used

**Client:** React, Material-UI, Axios, react-router-dom, react-chartjs-2

**API:** Twelve Data


## FAQ

#### Why choose React.js as front-end framework.

- *Reusable Components*

    One of the main benefits of using React JS is its potential 
    to reuse components.

- *It helps to build rich user interfaces*

    React allows building such high-quality, rich user 
    interfaces through its declarative components.

- *It allows writing custom components*

    React comes with JSX, an optional syntax extension, which 
    makes it possible to write your own components.

- *It offers fast rendering*

    React.js provides a virtual DOM feature. Virtual DOM, as the 
    name suggests, is the virtual representation of DOM that allows 
    testing all changes to the virtual DOM first to calculate 
    risks with each modification.

#### Why choose "Twelve Data" API.

-   Twelve Data’s provides stock, forex, ETF, indices, fundamentals, various spreadsheets add-ins, and everything in between.
-   250+ Exchanges are supported, across the world.
-   90+ Countries from where data comes from.
-   easy-to-use

#### Why choose "Material-UI".

-   Large library of components
-   Aligns with Material Design by Google
-   Access of a fully customizable theme
