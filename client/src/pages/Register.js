import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Auth from "../utils/user";
import { Redirect } from "react-router";
import classNames from 'classnames'

const styles = theme => ({
    //Style goes here
    register: {
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
        [theme.breakpoints.down('sm')]: {
            height: '100%',
          },
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
        height: '50px'
    }, 
    head: {
        justify:'center',
        margin: '10px'
    },
    googleIcon: {
        display: "inline-block",
        verticalAlign: "middle",
        margin: "8px 8px 8px 8px",
        width: "18px",
        height: "18px",
    },
    line: {
        width: '100%', 
        textAlign: 'center', 
        borderBottom: '1px solid white', 
        lineHeight: '0.1em',
        margin: '10px 0 20px'
     },
     lineText: { 
         color: 'white',
         padding: '0 10px',
         backgroundColor: "rgb(46, 50, 68)",
         fontFamily: "Roboto, Helvetica, Arial, sans-serif"
     },
    breakPoints: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
          },
    },
})

class Register extends Component {
    state = {
        password: '',
        newURL: '',
        email: '',
        name: '',
        currentAccount: {},
        registered: false
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleChange = prop => event => {
        this.setState({
            [prop]: event.target.value,
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log(this.state);
        if ((this.state.password != null && this.state.email != null)) {
            if (this.state.currentAccount != null) {
                console.log('updating google account')
                var account = this.state.currentAccount;
                account.password = this.state.password;
                account.photoURL = this.state.newURL;
                account.role = 'Preparer';
                Auth.updateUser(account)
                    .then(res => {
                        localStorage.setItem('user', JSON.stringify(res.data));
                        this.setState({ currentAccount: JSON.parse(localStorage.getItem('user')) });
                        this.state.registered = true;
                        this.forceUpdate();
                    })
            } else {
                console.log('creating new account')
                var account = {
                    password: this.state.password,
                    photoURL: this.state.newURL,
                    name: this.state.name,
                    email: this.state.email,
                    role : 'Preparer'
                }
                console.log(account)
                Auth.authUser(account)
                    .then(res => {
                        localStorage.setItem('user', JSON.stringify(res.data));
                        this.setState({ currentAccount: JSON.parse(localStorage.getItem('user')) });
                        this.state.registered = true;
                        this.forceUpdate();
                    })
            }
        }

        console.log('accepted');
    };

    constructor(props) {
        super(props);
        this.handleLoad = this.handleLoad.bind(this);
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }

    handleLoad = _ => {
        console.log(JSON.parse(localStorage.getItem('user')))
        this.setState({ currentAccount: JSON.parse(localStorage.getItem('user')) })
        console.log(this.state)
        if (this.state.currentAccount) {
            this.setState({
                newURL: this.state.currentAccount.photoURL,
                name: this.state.currentAccount.name,
                email: this.state.currentAccount.email
            })
        }
    }

    render() {

        const { classes } = this.props;

        return (
            <React.Fragment>
                {this.state.registered ? <Redirect to={{ pathname: '/' }} /> :
                    <Grid
                        container
                        className={classes.register}
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '100vh' }}
                    >
                        <Grid item className={classes.card} md={4}>
                        
                            <Paper square={true} className={classes.root + " " + classes.form} elevation={10}>
                            
                                <Typography style={{alignSelf: 'flex-end'}} color='inherit' variant="h5" component="h5">Register</Typography>
                                <form className={classes.container}>
                                    <TextField
                                        id="Email-input"
                                        label="Email"
                                        className={classes.textField}
                                        type="Username"
                                        name="username"
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.userName}
                                        onChange={this.handleChange('email')}
                                        InputLabelProps={{
                                            classes: {
                                                root: classes.cssLabel,
                                                focused: classes.cssFocused,
                                            },
                                        }}
                                        InputProps={{
                                            classes: {
                                                input: classes.whiteText,
                                                root: classes.cssOutlinedInput,
                                                focused: classes.cssFocused,
                                                notchedOutline: classes.notchedOutline,
                                            }
                                        }}
                                    />
                                    <TextField
                                        id="outlined-adornment-password"
                                        className={classNames(classes.margin, classes.textField)}
                                        variant="outlined"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        label="Password"
                                        value={this.state.password}
                                        onChange={this.handleChange('password')}
                                        InputLabelProps={{
                                            classes: {
                                                root: classes.cssLabel,
                                                focused: classes.cssFocused,
                                            },
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="Toggle password visibility"
                                                        onClick={this.handleClickShowPassword}
                                                        className={classes.whiteText}
                                                    >
                                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            classes: {
                                                input: classes.whiteText,
                                                root: classes.cssOutlinedInput,
                                                focused: classes.cssFocused,
                                                notchedOutline: classes.notchedOutline,
                                            },
                                        }}
                                    />
                                    <TextField
                                        id="Name-input"
                                        label="Full Name"
                                        className={classes.textField}
                                        type="Name"
                                        name="name"
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.currentAccount ? this.state.currentAccount.name : this.state.name}
                                        onChange={this.handleChange('name')}
                                        InputLabelProps={{
                                            classes: {
                                                root: classes.cssLabel,
                                                focused: classes.cssFocused,
                                            },
                                        }}
                                        InputProps={{
                                            classes: {
                                                input: classes.whiteText,
                                                root: classes.cssOutlinedInput,
                                                focused: classes.cssFocused,
                                                notchedOutline: classes.notchedOutline,
                                            }
                                        }}
                                    />

                                    <TextField
                                        id="photo-input"
                                        label="Photo URL"
                                        className={classes.textField}
                                        type="Text"
                                        name="url"
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.newURL}
                                        onChange={this.handleChange('newURL')}
                                        InputLabelProps={{
                                            classes: {
                                                root: classes.cssLabel,
                                                focused: classes.cssFocused,
                                            },
                                        }}
                                        InputProps={{
                                            classes: {
                                                input: classes.whiteText,
                                                root: classes.cssOutlinedInput,
                                                focused: classes.cssFocused,
                                                notchedOutline: classes.notchedOutline,
                                            }
                                        }}
                                    />

                                    <Grid container justify="center">
                                        <Button type='submit' onClick={this.handleFormSubmit} variant="outlined" className={classes.button}>
                                            Register
                                        </Button>
                                    </Grid>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                }

            </React.Fragment>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);