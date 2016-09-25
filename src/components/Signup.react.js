// components/Signup.react.js

import Formsy from 'formsy-react'
import FormsyText from 'formsy-material-ui/lib/FormsyText'
import Paper from 'material-ui/Paper'
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
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
        msg: UserStore.getRegisterMsg()
    }
}

//
var Signup = React.createClass({
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
        console.log(JSON.stringify(data))
        UserActions.registerUser(data)
    },
    notifyFormError: function(data) {
        console.error('Form Error', data)
    },
    componentDidMount: function() {
        UserStore.addChangeListener(this._onChange)
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
                    <h3>SignUp</h3>
                    <Formsy.Form onValid={this.enableSubmitButton} onInvalid={this.disableSubmitButton} onValidSubmit={this.submitForm} onInvalidSubmit={this.notifyFormError} >
                        <FormsyText name='username' hintText='username' ref={ (ref) => this.username = ref } validations={{
                            maxLength: 10
                        }} validationError='You can not have a username with more than 10 characters' required />
                        <br />
                        <FormsyText name='email' hintText='email' ref={ (ref) => this.email = ref } validations={{
                            isEmail: true,
                            maxLength: 50
                        }} validationErrors={{
                            isEmail: emailError,
                            maxLength: 'You can not have an email with more than 50 characters'
                        }} required />
                        <br />
                        <FormsyText name='password' hintText='password' ref={ (ref) => this.password = ref } type='password' required />
                        <br />
                        <FormsyText name='repassword' hintText='repeat password' ref={ (ref) => this.repassword = ref } type='password' validations={{
                            compare: function(values, value) {
                                return values.password === value ? true: false
                            }
                        }} validationError='Are you testing app or you are just dumb! does not match with password field' required />
                        <br />
                        <RaisedButton type='submit' primary={true} label='Submit' style={styles.submitStyle} disabled={!this.state.canSubmit} />
                    </Formsy.Form>
                </Paper>
                <Snackbar open={this.state.msg === ''? false: true} message={this.state.msg} autoHideDuration={3000} />
            </div>
        )
    }
})

module.exports = Signup