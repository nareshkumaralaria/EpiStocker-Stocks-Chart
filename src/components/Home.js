import { Button, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    // Used the 'Material UI' component to build the home page. Components Used: Button, Typography, Container
    return (
        <div className='Home'>
            <Container style={{ height: "100%" }}>
                <div className="home-div">
                    <Typography variant='h4' gutterBottom>
                        Stay Up To Date <br />
                        With <span> Financial Markets </span>
                    </Typography>
                    <Typography variant='body1' sx={{ width: { sm: '100%', md: '40%' } }}>
                        We help you to track every information that you need
                        in order to make money from financial markets.
                    </Typography>

                    <div className='button-div'>
                        <Link to='/searchstock'>
                            <Button variant="contained" size="large">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Home