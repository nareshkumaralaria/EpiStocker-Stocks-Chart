import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div className='about'>
            <Container style={{ display: "flex", flexDirection: "Column" }}>
                <Typography variant='h5'>How to use</Typography>

                <ol>
                    <li><Typography variant='body1'>Go to <Link to='/'>https://epistocker.netlify.app/</Link></Typography></li>
                    <li><Typography variant='body1'>Click  on Get Started</Typography></li>
                    <li><Typography variant='body1'>Choose an Exchange from dropdown
                        <br /> <span>Note: It's a free API so please choose 'NASDAQ' for getting data</span>
                    </Typography></li>
                    <li><Typography variant='body1'>Choose a Stock from dropdown eg. Apple Inc</Typography></li>
                    <li><Typography variant='body1'>Now chart is created, You can play with the chart filters, chart will change according to selected filter</Typography></li>
                </ol>


                <Typography variant='h5'>Q.) Why choose React.js as front-end framework.</Typography>
                <ol>
                    <li>
                        <Typography variant='body1'>Reusable Components
                            <br />One of the main benefits of using React JS is its potential to reuse components.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant='body1'>It helps to build rich user interfaces
                            <br />React allows building such high-quality, rich user interfaces through its declarative components.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant='body1'>It allows writing custom components
                            <br />React comes with JSX, an optional syntax extension, which makes it possible to write your own components.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant='body1'>It offers fast rendering
                            <br />React.js provides a virtual DOM feature. Virtual DOM, as the name suggests, is the virtual representation of DOM that allows testing all changes to the virtual DOM first to calculate risks with each modification.
                        </Typography>
                    </li>
                </ol>


                <Typography variant='h5'>Q.) Why choose "Twelve Data" API.</Typography>
                <ol>
                    <li>
                        <Typography variant='body1'>Twelve Data’s provides stock, forex, ETF, indices, fundamentals, various spreadsheets add-ins, and everything in between.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant='body1'>250+ Exchanges are supported, across the world.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant='body1'>90+ Countries from where data comes from.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant='body1'>easy-to-use
                        </Typography>
                    </li>
                </ol>


                <Typography variant='h5' style={{ marginTop: "24px" }}>Q.) Why choose "Material-UI".</Typography>
                <ol>
                    <li>
                        <Typography variant='body1'>Large library of components
                        </Typography>
                    </li>
                    <li>
                        <Typography variant='body1'>Aligns with Material Design by Google
                        </Typography>
                    </li>
                    <li>
                        <Typography variant='body1'>Access of a fully customizable theme
                        </Typography>
                    </li>
                </ol>

            </Container>
        </div>
    )
}

export default About