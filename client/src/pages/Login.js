import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
// import API from "../utils/API";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import firebase, { auth, provider } from '../utils/firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Auth from "../utils/user";
import { Redirect } from "react-router";

const styles = theme => ({
    //Style goes here
    login: {
        height: '100vh',
        width: '100%',
        background: "rgb(4,4,32)",
        background: "linear-gradient(42deg, rgba(4,4,32,1) 0%, rgba(26,26,69,1) 32%, rgba(191,76,95,1) 59%, rgba(186,17,17,1) 100%)"
    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        height: "100%"
    },
    card: {
        height: "80%",
    },
    brand: {
        backgroundColor: "rgb(229, 115, 106)",
        color: 'rgb(236, 236, 238)',
        display: 'flex',
        flexWrap: 'wrap',
        alignSelf: 'center',
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        alignSelf: 'center',
        backgroundColor: "rgb(46, 50, 68)",
        color: 'rgb(109, 112, 123)'
    },
    flex: {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        flexWrap: 'wrap',
        display: 'flex',
        width: '100%',
        color: 'white'
    },
    whiteText: {
        color: 'white',
    },
    cssLabel: {
        color: 'white !important',
        '&$cssFocused': {
            color: 'white',
        },
    },
    cssFocused: {
        color: 'white',
        borderColor: 'white',
    },
    cssUnderline: {
        '&:after': {
            borderBottomColor: 'white',
            color: 'white',
            borderColor: 'white',
        },
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: 'white',
        },
    },
    notchedOutline: {
        borderColor: 'rgb(109, 112, 123) !important',
    },
    button: {
        color: 'white',
        margin: '10px'
    }
});

var local = localStorage.getItem('user')

class Login extends Component {
    state = {
        userName: '',
        password: '',
        showPassword: false,
        user: null
    }


    handleChange = prop => event => {
        this.setState({
            [prop]: event.target.value,
        });
    };

    handleFormSubmit = event => {
        event.preventDefault()
        console.log('Submit')
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    logout() {
        auth.signOut()
            .then(() => {
                // this.setState(({user: null}))
                localStorage.removeItem('user');
                local = null;
                window.location.reload();
            });
    }

    login() {
        auth.signInWithPopup(provider)
            .then((result) => {
                var temp = {
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL
                };
                console.log(temp);
                Auth.authUser(temp)
                .then(res => {
                    localStorage.setItem('user', JSON.stringify(res.data));
                    local = JSON.parse(localStorage.getItem('user'));
                    window.location.reload();
                })             
                // this.setState(({ user: result.user}))
            });
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.state.user = user
            }
        });
    }


    render() {

        const { classes } = this.props;

        return (
            <React.Fragment>
                <Grid
                    container
                    className={classes.login}
                    justify="center"
                    alignItems='center'
                >
                    <Grid item className={classes.card} md={4}>
                        <Paper square={true} className={classes.root + " " + classes.brand} elevation={10}>
                            <div className={classes.flex}>
                                <Typography color='inherit' variant="h1" component="h1">
                                    Logo Here
                    </Typography>
                                <Typography color='inherit' variant='h3' component="h3">
                                    Welcome to <br />
                                    Web Accountant
                    </Typography>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item className={classes.card} md={4}>
                        <Paper square={true} className={classes.root + " " + classes.form} elevation={10}>
                            <div className={classes.flex}>
                                {local ?
                                    <Redirect to='/'/>
                                    :
                                    <button onClick={this.login}>Log In</button>
                                }
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);


//The other login component


// <Typography color='inherit' variant="h5" component="h5">
//                     Sign In
//                     </Typography>
//                     <form className={classes.container} noValidate autoComplete="off">
//                         <TextField
//                         id="Username-input"
//                         label="Username"
//                         className={classes.textField}
//                         type="Username"
//                         name="username"
//                         margin="normal"
//                         variant="outlined"
//                         InputLabelProps={{
//                             classes: {
//                                 root: classes.cssLabel,
//                                 focused: classes.cssFocused,
//                             },
//                         }}
//                         InputProps={{
//                             classes: {
//                                 input: classes.whiteText,
//                                 root: classes.cssOutlinedInput,
//                                 focused: classes.cssFocused,
//                                 notchedOutline: classes.notchedOutline,
//                             }
//                         }}
//                         />
//                         <TextField
//                         id="outlined-adornment-password"
//                         className={classNames(classes.margin, classes.textField)}
//                         variant="outlined"
//                         type={this.state.showPassword ? 'text' : 'password'}
//                         label="Password"
//                         value={this.state.password}
//                         onChange={this.handleChange('password')}
//                         InputLabelProps={{
//                             classes: {
//                                 root: classes.cssLabel,
//                                 focused: classes.cssFocused,
//                             },
//                         }}
//                         InputProps={{
//                             endAdornment: (
//                             <InputAdornment position="end">
//                                 <IconButton
//                                 aria-label="Toggle password visibility"
//                                 onClick={this.handleClickShowPassword}
//                                 className={classes.whiteText}
//                                 >
//                                 {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
//                                 </IconButton>
//                             </InputAdornment>
//                             ),
//                             classes: {
//                                 input: classes.whiteText,
//                                 root: classes.cssOutlinedInput,
//                                 focused: classes.cssFocused,
//                                 notchedOutline: classes.notchedOutline,
//                               },
//                         }}
//                         />
//                         <Button type='submit' onClick={this.handleFormSubmit} variant="outlined" className={classes.button}>
//                             Log In
//                         </Button>
