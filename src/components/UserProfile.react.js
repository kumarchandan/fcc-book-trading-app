// components/UserProfile.react.js

import Formsy from 'formsy-react'
import FormsyText from 'formsy-material-ui/lib/FormsyText'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import UserActions from '../actions/UserActions'
import UserStore from '../stores/UserStore'

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
        msg: UserStore.getRegisterMsg(),
        userProfile: UserStore.getUserProfile(),
    }
}

var UserProfile = React.createClass({
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
        urlError: "Please provide a valid URL!",
        wordError: "Only words please!"
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
        //
        console.log(JSON.stringify(data))
        //
        UserActions.updateUserProfile(data)
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
        let { urlError, wordError } = this.errorMessages
        //
        return (
            <div>
                <Paper style={styles.paperStyle}>
                    <h3>Profile Details</h3>
                    <Formsy.Form onValid={this.enableSubmitButton} onInvalid={this.disableSubmitButton} onValidSubmit={this.submitForm} onInvalidSubmit={this.notifyFormError}>
                        <FormsyText name='username' value={this.state.userProfile.username} disabled={true} />
                        <br />
                        <FormsyText name='email' value={this.state.userProfile.email} disabled={true}/>
                        <br />
                        <FormsyText name='displayName'
                            ref={ (ref) => this.displayName = ref }
                            floatingLabelText="Display Name"
                            validations={{
                                isWords: true,
                                maxLength: 50
                            }}
                            validationErrors={{
                                isWords: wordError,
                                maxLength: 'more than 50 char not allowed'
                            }}
                        />
                        <br />
                        <FormsyText name='street'
                            ref={ (ref) => this.street = ref }
                            floatingLabelText="Street"
                            validations={{
                                maxLength: 50
                            }}
                            validationError='more than 50 char not allowed' />
                        <br />
                        <FormsyText name='city'
                            ref={ (ref) => this.city = ref }
                            floatingLabelText="City"
                            validations={{
                                maxLength: 50
                            }}
                            validationError='more than 50 char not allowed' />
                        <br />
                        <FormsyText name='state'
                            ref={ (ref) => this.stateName = ref }
                            floatingLabelText="State"
                            validations={{
                                maxLength: 50
                            }}
                            validationError='more than 50 char not allowed' />
                        <br />
                        <FormsyText name='country'
                            ref={ (ref) => this.country = ref }
                            floatingLabelText="Country"
                            validations={{
                                maxLength: 50
                            }}
                            validationError='more than 50 char not allowed' />
                        <br />
                        <FormsyText
                            name='profilePic'
                            hintText="http://www.example.com"
                            floatingLabelText="URL"
                            ref={ (ref) => this.profilePic = ref }
                            validations='isUrl'
                            validationError={urlError} />
                        <br />
                        <RaisedButton type='submit' primary={true} label='Submit' style={styles.submitStyle} disabled={!this.state.canSubmit} />
                    </Formsy.Form>
                </Paper>
                <Snackbar open={this.state.msg.text === ''? false: true} message={this.state.msg.text} autoHideDuration={3000} />
            </div>
        )
    }
})

//
module.exports = UserProfile