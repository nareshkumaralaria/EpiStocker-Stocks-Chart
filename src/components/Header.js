import { FormControlLabel, FormGroup, Snackbar, Switch, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

    // The 'open' state is used to showing the 'Coming Soon' message.
    const [open, setOpen] = useState(false);

    // this function toggles the 'open' state and show the snackbar component
    const handleClick = () => {
        setOpen(true);
    };

    // this function toggles the 'open' state and close the snackbar component
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className='header'>
            <Container style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="logo">
                    <Link to='/'>
                        <img src={process.env.PUBLIC_URL + "/assets/logo.svg"} alt="" /></Link>
                    <Link to='/'> <Typography sx={{ display: { xs: 'none', sm: 'block' } }} variant="h5" gutterBottom>Stocker</Typography>
                    </Link>
                </div>
                <div className='menu'>
                    <Link to='/'>
                        <Typography variant="body1" gutterBottom>Home</Typography>
                    </Link>
                    <Typography variant="body1" gutterBottom>About</Typography>
                </div>
                <FormGroup sx={{ display: { xs: 'none', md: 'block' } }} onClick={handleClick}>
                    <FormControlLabel style={{ marginRight: "0px" }} control={<Switch defaultChecked disabled />} label="Dark mode" />
                </FormGroup>
            </Container>

            {/* Used the "Snackbar" component from 'Material UI' to show a 'Coming Soon' message whenever the user wants to switch from dark mode to light mode. */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Coming Soon"
            // style={{ textAlign: 'center' }}
            />
        </div>
    )
}

export default Header