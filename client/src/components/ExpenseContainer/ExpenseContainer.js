import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Layout from '../Layout/Layout';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import MuiAlert from '@material-ui/lab/Alert';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

import InfoCard from '../InfoCard/InfoCard';
import DataTable from '../DataTable/DataTable';
import ExpenditureCategory from '../utility/ExpenditureCategory.json';
import PieChart from '../Chart/PieChart';

import "./ExpenseContainer.scss";

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

class ExpenseContainer extends Component {
    state = {
        isAuthenticated: false,
        userDetails: null,
        category: {
            text: '',
            value: ''
        },
        lastItemId: 0,
        deleteRows: []
    }

    componentDidMount() {
        const userID = window.location.search.split('=')[1];
        axios
            .get(`http://localhost:8080/input/getuserinfo?id=${userID}`, { withCredentials: true })
            .then(res => {
                const userDetails = JSON.parse(res.data);

                this.setState({
                    isAuthenticated: true,
                    lastItemId: userDetails.expenditure.length > 0 ? userDetails.expenditure[userDetails.expenditure.length - 1].id : 0,
                    userDetails
                });
            })
            .catch((err) => {
                console.log(err)
                this.props.history.push('/login');
            });
    }

    getMonth() {
        return new Date().toLocaleString('en-us', { month: 'long' });
    }

    getYear() {
        return new Date().getFullYear();
    }

    handleRowSelection = deleteRows => {
        this.setState({
            deleteRows: deleteRows.selectionModel
        });
    }

    handleCategoryChange = (event) => {
        this.setState({
            category: {
                text: event.currentTarget.textContent,
                value: event.target.value
            }
        })
    }

    // Add bill
    handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target, currYear = this.getYear(), currMonth = this.getMonth();
        let { userDetails, lastItemId, category } = this.state, existingExpenditure = userDetails.expenditure;

        existingExpenditure.push({
            id: lastItemId + 1,
            year: currYear,
            month: currMonth,
            category: category.text,
            amount: parseInt(form.amount.value)
        });

        const postPayLoad = {
            email: userDetails.email,
            income: form.income.value === "" ? 0 : parseInt(form.income.value),
            expenditure: existingExpenditure
        },
            id = this.state.userDetails.id;

        axios
            .post('http://localhost:8080/input/addexpense', {
                data: JSON.stringify(postPayLoad),
            })
            .then(res => {
                const newUserData = JSON.parse(res.data);
                this.setState({
                    lastItemId: newUserData.expenditure.length > 0 ? newUserData.expenditure[newUserData.expenditure.length - 1].id : 0,
                    userDetails: newUserData
                });
            })
            .catch(err => {
                console.log(err)
            })
    }

    deleteExpenses = () => {
        const { userDetails, deleteRows } = this.state,
            deletePayLoad = {
                email: userDetails.email,
                deletedRows: deleteRows
            }

        axios
            .delete('http://localhost:8080/input/deleteexpense', { data: deletePayLoad })
            .then(res => {
                const newUserData = JSON.parse(res.data);
                this.setState({
                    lastItemId: newUserData.expenditure.length > 0 ? newUserData.expenditure[newUserData.expenditure.length - 1].id : 0,
                    userDetails: newUserData,
                    deleteRows: []
                });
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { userDetails, deleteRows } = this.state,
            currYear = this.getYear(),
            currMonth = this.getMonth(),
            filteredDetails = userDetails ? userDetails.expenditure.filter(spendLine => spendLine.year == currYear && spendLine.month == currMonth) : [],
            income = userDetails ? userDetails.income : 0,
            expenses = filteredDetails.length > 0
                ? filteredDetails.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)
                : 0,
            savings = income - expenses,
            userName = userDetails ? userDetails.userName : "",
            pieChartData = [
                { value: income, name: 'Income' },
                { value: expenses, name: 'Expenses' },
                { value: savings, name: 'Savings' }
            ];

        return (
            <Layout>
                <div className="breadCrumb">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" href="/">
                            Home
                        </Link>
                        <Typography color="textPrimary">Budget</Typography>
                    </Breadcrumbs>
                </div>

                <Typography variant="h3" component="h2" gutterBottom>
                    Expenditure for {this.getMonth()}, {this.getYear()}
                </Typography>

                <Grid container direction="column" spacing={3}>
                    <Grid container item xs={12}>
                        <h3>Hi <strong>{userName}{'  '}</strong>
                            <StyledBadge
                                overlap="circle"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                variant="dot"
                            >
                                <Avatar alt={userName} src="/static/images/avatar/1.jpg" />
                            </StyledBadge>
                        </h3>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={3}>
                                <InfoCard
                                    text="Income"
                                    value={`$${income}`}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <InfoCard
                                    text="Total expences"
                                    value={`$${expenses}`}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <InfoCard
                                    text="Savings"
                                    value={`$${savings}`}
                                />
                            </Grid>
                        </Grid>
                        {
                            savings < 0 &&
                            <p>
                                <Alert severity="warning">Careful ! you have already spent more than you earned</Alert>
                            </p>
                        }
                    </Grid>

                    <Grid item xs={10}>
                        <form onSubmit={this.handleSubmit}>
                            <div className='mar-bottom'>
                                <Typography variant="h5" component="h3" gutterBottom>Add monthly income</Typography>

                                <Grid container>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel htmlFor="income">Income</InputLabel>
                                            <OutlinedInput
                                                id="income"
                                                name="income"
                                                placeholder="Enter your monthly income"
                                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                                labelWidth={60}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </div>

                            <div className='mar-bottom'>
                                <Typography variant="h5" component="h3" gutterBottom>Add expenses</Typography>

                                <Grid container spacing={3}>
                                    <Grid item xs={6} sm={4}>
                                        <TextField
                                            id="category"
                                            select
                                            label="Select category"
                                            value={this.state.category.value}
                                            name='category'
                                            onChange={this.handleCategoryChange}
                                            helperText="Please select your expenditure category"
                                            variant="outlined"
                                            fullWidth
                                            required
                                        >
                                            {ExpenditureCategory.category.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={6} sm={4}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel htmlFor="income">Amount</InputLabel>
                                            <OutlinedInput
                                                id="amount"
                                                name="amount"
                                                placeholder="Enter the amount"
                                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                                labelWidth={60}
                                                required
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </div>
                            <p>
                                <Button type="submit" variant="contained" color="primary">Add bill</Button>
                            </p>
                        </form>

                        {/* Show expenses */}
                        {
                            userDetails && userDetails.expenditure &&
                            <div>
                                <Typography variant="h5" component="h3" gutterBottom>All expenses</Typography>
                                <DataTable rows={userDetails.expenditure} handleRowSelection={this.handleRowSelection} />
                                {
                                    deleteRows.length > 0 &&
                                    <p>
                                        <Button type="submit" variant="contained" color="primary" onClick={this.deleteExpenses}>Delete record</Button>
                                    </p>
                                }
                            </div>
                        }
                    </Grid>
                    <PieChart data={pieChartData} />
                </Grid>
            </Layout>
        );
    }
}

export default ExpenseContainer;