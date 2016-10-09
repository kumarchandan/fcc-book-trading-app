// components/Login.react.js

import FlatButton from 'material-ui/FlatButton'
import Formsy from 'formsy-react'
import FormsyText from 'formsy-material-ui/lib/FormsyText'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import UserActions from '../actions/UserActions'
import UserStore from '../stores/UserStore'
import Snackbar from 'material-ui/Snackbar'

// Styles
const styles = {
    paperStyle: {
        margin: 'auto',
        padding: 20,
        textAlign: 'center'
    },
    submitStyle: {
        marginTop: 32
    }
}

//
function getUserStore() {
    return {
        canSubmit: false,
        msg: UserStore.getMsg()
    }
}

//
var Login = React.createClass({
    //
    contextTypes: {
        router: React.PropTypes.object
    },
    //
    getInitialState: function() {
        return getUserStore()
    },
    _onChange: function() {
        this.setState(getUserStore())
    },
    errorMessages: {
        emailError: 'not a valid email yet!'
    },
    enableSubmitButton: function() {
        this.setState({
            canSubmit: true
        })
    },
    disableSubmitButton: function() {
        this.setState({
            canSubmit: false
        })
    },
    submitForm: function(data) {
        UserActions.login(data)
    },
    notifyFormError: function(data) {
        console.error('Form Error', data)
    },
    componentDidMount: function() {
        UserStore.addChangeListener(this._onChange)
    },
    componentDidUpdate: function(prevProps, prevState) {
        if(this.state.msg.severity === 'S') {
            this.context.router.push('/books')
        }
    },
    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChange)
    },
    //
    render: function() {
        //
        let { emailError } = this.errorMessages
        //
        return (
            <div>
                <Paper style={styles.paperStyle}>
                    <h3>Login</h3>
                    <Formsy.Form onValid={this.enableSubmitButton} onInvalid={this.disableSubmitButton} onValidSubmit={this.submitForm} onInvalidSubmit={this.notifyFormError} >
                            <FormsyText name='email' hintText='email' ref={ (ref) => this.email = ref } validations={{
                                isEmail: true,
                                maxLength: 50
                            }} validationErrors={{
                                isEmail: emailError,
                                maxLength: 'Your email went more than 50 characters! ;)'
                            }} required />
                            <br />
                            <FormsyText name='password' hintText='password' ref={ (ref) => this.password = ref } type='password' required />
                            <br />
                            <RaisedButton type='submit' primary={true} label='Submit' style={styles.submitStyle} disabled={!this.state.canSubmit} />
                            <br />
                            <br />
                            Not registered? <Link to='/signup'><FlatButton label='SignUp' primary={true} /></Link>
                        </Formsy.Form>
                </Paper>
                <Snackbar open={this.state.msg.text === ''? false: true} message={this.state.msg.text} autoHideDuration={3000} />
            </div>
        )
    }
})

module.exports = Login