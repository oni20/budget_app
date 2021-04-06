import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '1.625rem'
    }
}));

export default function SimpleContainer({ children }) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" className={classes.root}>
                <Typography component="div" style={{ height: '100vh' }}>
                    {children}
                </Typography>
            </Container>
        </React.Fragment>
    );
}