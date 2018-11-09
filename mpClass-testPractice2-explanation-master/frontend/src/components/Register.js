import React, { Component } from "react";
import 'bulma/css/bulma.css';
import * as EmailValidator from 'email-validator';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailValue: '',
            passwordValue: '',
            confirmPasswordValue: '',
            hasError: false,
            errorType: 0,
        }
        this.handleOnClick = this.handleOnClick.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this)
    }

    handleOnClick() {
        const data = {
            email: this.state.emailValue,
            password: this.state.passwordValue,
        }
        if((data.password != this.state.confirmPasswordValue) || data.password == "" || this.state.confirmPasswordValue == "") {
            this.setState({hasError: true, errorType : 1})
        } else if(!EmailValidator.validate(data.email)) {
            this.setState({hasError: true, errorType : 2})
        } else {
            axios.post("http://localhost:3001/register", data).then(res => {
                if(res.data.status) {
                    this.props.history.push('/')
                } else {
                    this.setState({hasError: true, errorType : 3})
                    this.setState({passwordValue: ""})
                    this.setState({confirmPasswordValue: ""})
                }
            })
        }
    }

    handleEmailChange = (event) => {this.setState({emailValue: event.target.value}); }
    handlePasswordChange = (event) => {this.setState({passwordValue: event.target.value}); }
    handleConfirmPasswordChange = (event) => {this.setState({confirmPasswordValue: event.target.value})}

    errorText = () => {
        if(this.state.errorType == 1) {
            return <div className="notification is-danger"> Please fill in all fields</div>
        } else if (this.state.errorType ==2){
            return <div className="notification is-danger"> Invalid email format</div>
        } else {
            return <div className="notification is-danger"> email is already exist</div>
        }
    }
    render() {
        return (
        <div id="root">
            <section class="section hero is-fullheight has-background-white-ter">
                <div class="hero-body">
                    <div class="container">
                        <div class="columns is-mobile is-centered">
                            <div class="column is-two-fifths">
                                <div class="box">
                                    <div class="media-content">
                                        <h1 class="title">Register</h1>
                                        {this.state.hasError && this.errorText()}
                                        <div class="field">
                                            <div class="control">
                                                <input class="input is-large"  value={this.state.emailValue} type="text" onChange={this.handleEmailChange} placeholder="email"/>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="control">
                                                <input class="input is-large" value={this.state.passwordValue} type="password" onChange={this.handlePasswordChange} placeholder="password"/>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="control">
                                            <input class="input is-large" value={this.state.confirmPasswordValue} type="password" onChange={this.handleConfirmPasswordChange} placeholder="Confirm Password"/>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="control">
                                            <button class="button is-fullwidth is-info is-large" onClick={this.handleOnClick}>Register</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        )
    }
}

export default Register;