import React, {useState} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Layout from '../Layout/Layout';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

const BASE_URL = process.env.SERVICE_BASE_URL || 'http://localhost:8080';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '35ch',
        },
        '& .MuiButton-root': {
            marginLeft: theme.spacing(2),
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        }
    },
}));

const Login = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        axios({
            method: "POST",
            data: {
                email: form.email.value,
                password: form.password.value
            },
            withCredentials: true,
            url: `${BASE_URL}/login`
        })
            .then(res => {
                console.log(res.data)
                const id = JSON.parse(res.data).id;
                props.history.push('/input?id=' + id);
            })
            .catch(err => {
                console.log(err);
                setIsAuthenticated(false);
            })
    }

    const classes = useStyles();

    return (
        <Layout>
            <Grid
                container
                justify='flex-start'
                spacing={2}
                direction="column"
                alignItems="center"
            >
                <Typography variant="h2" component="h2" gutterBottom>
                    Welcome back
                </Typography>
                <Typography variant="h5" component="p" gutterBottom>
                    Enter your credentials and enjoy Budgetery
                </Typography>

                {
                    !isAuthenticated &&
                    <Alert variant="filled" severity="error">
                        Invalid Username or password
                    </Alert>
                }
                
                <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField
                            id="email"
                            type="email"
                            label="Email address"
                            placeholder="Enter your email address"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
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
                        Login
                    </Button>
                    <p>
                        Don't have an account?
                            <Button variant="contained" color="secondary" href="/signup">
                            Sign up
                        </Button>
                    </p>
                </form>
            </Grid>
        </Layout>
    );
}

export default Login;