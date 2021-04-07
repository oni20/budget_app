import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
        //'linear-gradient(45deg, #fd005a 30%, #e8becd 90%)'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white'
    },
    moneyVal: {
        marginBottom: 5,
        fontWeight: 'bold',
        color: 'white'
    },
});

export default function SimpleCard(props) {
    const classes = useStyles();
    const { text, value } = props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {text}
                </Typography>
                
                <Typography className={classes.moneyVal} variant="h4" component="p">
                    {value}
                </Typography>
            </CardContent>
            
        </Card>
    );
}