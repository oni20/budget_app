import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Layout from '../Layout/Layout';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './SignUp.scss';

const BASE_URL = process.env.SERVICE_BASE_URL || 'http://localhost:8080';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '30px',
        '& .MuiTypography-root': {
            marginBottom: theme.spacing(3)
        },
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '35ch',
        },
        '& .MuiButton-root': {
            marginLeft: theme.spacing(1),
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        }
    },
}));

const SignUp = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;

        axios
            .post(`${BASE_URL}/signup`, {
                userName: form.userName.value,
                email: form.email.value,
                password: form.password.value
            })
            .then(res => {
                let { data } = res;
                if (data === 'duplicate_email') {
                    alert('This email is already subscribed. Please use different email to open an account');
                    form.reset();
                } else {
                    props.history.push('/login')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const classes = useStyles();

    return (
        <Layout>
            <Grid
                container
                justify='flex-start'
                direction="column"
                alignItems="center"
                spacing={3}>
                <Typography variant="h2" component="h2" gutterBottom>
                    Get started with Budgetery
                </Typography>
                <Typography variant="h5" component="p" gutterBottom>
                    Create an account and enjoy Budgetery
                </Typography>

                <form onSubmit={handleSubmit} className={classes.root} autoComplete="off">
                    <div className="form__section">
                        <TextField
                            id="userName"
                            name="userName"
                            type="text"
                            label="User name"
                            placeholder="Enter User Name"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            required
                        />
                    </div>

                    <div className="form__section ">
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email address"
                            placeholder="Enter email"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            required
                        />
                    </div>

                    <div className="form__section ">
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="Enter password"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            required
                        />
                    </div>
                    <Button type="submit" variant="contained" color="primary" size="large">
                        Sign up
                        </Button>
                    <p>
                        Already have an account?
                            <Button variant="contained" color="secondary" href="/login">
                            Log in
                        </Button>
                    </p>
                </form>
            </Grid>
        </Layout>
    );
}

export default SignUp;