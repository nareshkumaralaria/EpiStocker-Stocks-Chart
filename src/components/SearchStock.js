import { Alert, Autocomplete, Backdrop, CircularProgress, Skeleton, Tab, Tabs, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const SearchStock = () => {

    // All required variables/states are created using UseState
    const chartFilters = ["1day", "1week", "1month"];
    const [Stock, setStock] = useState([]);
    const [SelectedChartFilter, setSelectedChartFilter] = useState(0);
    const [StockData, setStockData] = useState([]);
    const [SelectedStockName, setSelectedStockName] = useState("");
    const [loading, setLoading] = useState(true);
    const [TimeSeries, setTimeSeries] = useState({});
    const [ExchangesData, setExchangesData] = useState([]);
    const [SelectedExchangeName, setSelectedExchangeName] = useState(null);
    const [Error, setError] = useState(false);
    const [BadRequest, setBadRequest] = useState(false);
    const [LimitedAccessError, setLimitedAccessError] = useState(false);
    let SelectedStockSymbol = "";
    let metaData, xValues, yValues;

    // rapid api key and host api key receiving from env file
    let rapidAPI = process.env.REACT_APP_RAPID_API_KEY;
    let rapidHostAPI = process.env.REACT_APP_RAPID_API_HOST;

    console.log("rapidAPI", rapidAPI, "rapidHostAPI", rapidHostAPI);

    // Extracting data from 'time series' objects. This data will help us to make the chart. We extracting x-coordinates (date and time) and y-coordinates (open price in give date time)
    if (!(Object.keys(TimeSeries).length === 0 && TimeSeries.constructor === Object)) {
        metaData = TimeSeries.meta?.symbol;
        xValues = TimeSeries?.values?.map((item) => item.datetime).reverse();
        yValues = TimeSeries?.values?.map((item) => item.open).reverse();
    }

    // Header object that contains rapidapi key and host key.
    const headers = {
        'X-RapidAPI-Key': rapidAPI,
        'X-RapidAPI-Host': rapidHostAPI,
    }

    // options object for line chart that contains some css styles
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                grid: {
                    display: true,
                    color: 'rgba(255,255,255,0.09)',
                },
                ticks: {
                    color: "rgba(255,255,255,0.6)"
                }
            },
            y: {
                grid: {
                    display: true,
                    color: 'rgba(255,255,255,0.09)',
                },
                ticks: {
                    color: "rgba(255,255,255,0.6)"
                }
            },
        },
    };

    // data object for line chart that conatins xy-coordinates values and some css styles.
    const data = {
        labels: xValues,
        datasets: [
            {
                label: metaData !== undefined ? metaData : "Company Name",
                data: yValues,
                borderColor: '#8CE16E',
                backgroundColor: 'transparent',
                pointBorderColor: "transparent",
                pointBorderWidth: 4,
                tension: 0.5,
            }
        ],
    };

    // this function remove Duplicate Objects from an object array.
    function removeDuplicatesObj(arr) {
        return arr.filter((v, i, a) => a.findIndex(v2 => v2.name === v.name) === i);
    }

    // this function remove duplicate items from an array
    function removeDuplicates(arr) {
        return arr?.filter((item,
            index) => arr.indexOf(item) === index);
    }

    // this function gets the Exchange data from the server.
    const getExchanges = async () => {
        try {
            const response = await axios.get("https://twelve-data1.p.rapidapi.com/exchanges", {
                params: { format: 'json' },
                headers: headers,
            })
            // filtering exchange data
            setExchangesData(removeDuplicatesObj(response.data.data));
            // changing loading state
            setLoading(false);
            // changing bad request error
            setBadRequest(false);

        } catch (error) {
            // console.log("getExchanges", error);
            // if api failed => changing bad request error
            if (error.response.status === 429) {
                setBadRequest(true);
            }
        }
    }

    // This function gets the stock data from the server for the selected exchange.
    const getStockList = async () => {
        try {
            const response = await axios.get("https://twelve-data1.p.rapidapi.com/stocks",
                {
                    headers: headers,
                    // user slected exchange symbol used here for getting stocks list
                    params: { exchange: SelectedExchangeName.name, format: 'json' },
                }
            )
            setStock(response.data);
            // removing duplicate stocks items
            let stk = removeDuplicates(response.data.data?.map((item) => item.name));
            setStockData(stk);
            setBadRequest(false);

        } catch (error) {
            // console.log("getStockListError", error);
            // if api failed => changing bad request error
            if (error.response.status === 429) {
                setBadRequest(true);
            }
        }
    }

    // Extracting selected stock symbol from SelectedStockName object so we can get the time series data
    if (SelectedStockName !== "" && SelectedStockName !== null) {
        let SelectedStockData = removeDuplicates(Stock.data?.filter((item) => item.name === SelectedStockName));
        SelectedStockSymbol = SelectedStockData[0]?.symbol;
    }

    // This function gets the time series data from the server for the selected stock.
    const getTimeSeries = async () => {
        try {
            const response = await axios.get("https://twelve-data1.p.rapidapi.com/time_series", {
                headers: headers,
                // selected stock symbol and time interval filter used here for getting time series data
                params: { symbol: SelectedStockSymbol, interval: chartFilters[SelectedChartFilter], outputsize: '30', format: 'json' },
            })

            setTimeSeries(response.data);
            setLimitedAccessError(false);
            setBadRequest(false);

            // if selected stock is not in Basic Plan (free plan) the updating limited access error and showing user to not data available warning
            if (response.data.code === 400) {
                setLimitedAccessError(true);
            }

        } catch (error) {
            // console.log("getTimeSeriesError", error);
            // if api failed => changing bad request error
            if (error.response.status === 429) {
                setBadRequest(true);
            }
        }
    }

    // This useEffect will be called on page load
    useEffect(() => {
        getExchanges();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // This useEffect will be called when user select or change the exchange from the dropdown
    useEffect(() => {
        if (SelectedExchangeName !== null) {
            getStockList();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SelectedExchangeName])

    // This useEffect will be called when user select or change the stock from the dropdown and change or update the filter value
    useEffect(() => {
        if (SelectedStockSymbol !== "" && SelectedStockSymbol !== undefined)
            getTimeSeries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SelectedChartFilter, SelectedStockSymbol])


    const handleClose = () => {
        setError(false);
    }

    // opening loading icon and closing after 2 second
    const buttonClick = () => {
        setTimeout(() => {
            handleClose();
        }, 2000);
        setError(true);
    }

    return (
        <div className='SearchStock'>
            {
                loading ?
                    // when page load, show the skeleton UI
                    <Container>
                        <Box>
                            <Skeleton sx={{ bgcolor: 'rgba(255,255,255,0.15)', transform: "scale(1, 0.8)" }} height={50} />
                            <Skeleton sx={{ bgcolor: 'rgba(255,255,255,0.15)', transform: "scale(1, 0.8)" }} height={100} />
                            <Skeleton sx={{ bgcolor: 'rgba(255,255,255,0.15)', transform: "scale(1, 0.8)" }} height={360} />
                        </Box>
                    </Container>
                    : <Container>
                        <Typography
                            variant='h5'
                            gutterBottom
                            style={{ marginTop: "16px", fontWeight: "600" }}
                            sx={{ textAlign: { xs: 'center', sm: 'left' } }} >
                            Search for stock
                        </Typography>
                        <Box
                            component="div"
                            style={{ display: "flex" }}
                            sx={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center' } }}>

                            {/* Exchange list Dropdown */}
                            <Autocomplete
                                id="exchange-list"
                                className='stock'
                                size="small"
                                sx={{ width: 300, margin: "10px 0", marginRight: { xs: '0px', sm: "24px" } }}
                                style={{ color: "white" }}
                                options={ExchangesData}
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, SelectedExchangeName) => option === SelectedExchangeName}
                                autoHighlight
                                renderOption={(props, option) => (
                                    <Box key={option.code} {...props}>
                                        {option.country} - {option.name}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField {...params} label="Exchange name" />
                                )}
                                onChange={(event, newValue) => {
                                    setSelectedExchangeName(newValue);
                                    buttonClick();
                                }}
                            />

                            {/* Stocks list dropdown */}
                            < Autocomplete
                                id="stock-list"
                                className='stock'
                                size="small"
                                sx={{ width: 300, margin: "10px 0", marginLeft: { xs: '0px', sm: "24px" } }}
                                options={StockData}
                                autoHighlight
                                renderInput={(params) => (
                                    <TextField {...params} label="Company name" />
                                )}
                                onChange={(event, newValue) => {
                                    setSelectedStockName(newValue);
                                    buttonClick();
                                }}
                            />
                        </Box>
                        {
                            // When API failed show the bad request error
                            BadRequest ?
                                <Alert severity="error">
                                    Bad Request - Reload App
                                </Alert>
                                : ""
                        }

                        {
                            // if selected stock is not in Basic Plan (free plan) showing warning to user that not data available
                            LimitedAccessError && SelectedStockName !== "" && SelectedStockName !== null ?
                                <Alert severity="warning">
                                    No data Available
                                </Alert>
                                : ""
                        }

                        {
                            // if selected Exchange have no stock list
                            StockData?.length === 0 && SelectedExchangeName !== null && SelectedExchangeName !== "" ?
                                <Alert severity="warning">
                                    No Stocks Available
                                </Alert>
                                : ""
                        }

                        {
                            // for showing loading icon when user do an action
                            Error ?
                                <Backdrop
                                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                    open={Error}
                                >
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                                : ""
                        }

                        {/* line chart */}
                        <div id="canvas-container">
                            <Line options={options} data={data} />
                        </div>

                        {/* chart Filter options */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', margin: "20px 0" }}>
                            <Tabs value={SelectedChartFilter} onChange={(event, newValue) => setSelectedChartFilter(newValue)} className="multi-tabs" >
                                <Tab onClick={(event) => { event.preventDefault(); buttonClick(); }} label="1 day" />
                                <Tab onClick={(event) => { event.preventDefault(); buttonClick(); }} label="1 week" />
                                <Tab onClick={(event) => { event.preventDefault(); buttonClick(); }} label="1 month" />
                            </Tabs>
                        </Box>
                    </Container>
            }

        </div>
    )
}

export default SearchStock