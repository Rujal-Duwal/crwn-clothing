import React from 'react'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.copmonent'

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

import './sign-up.styles.scss'

class SignUp extends React.Component {
    constructor() {
        super()

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmedPassword: ''

        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { displayName, email, password, confirmedPassword } = this.state;

        if (password !== confirmedPassword) {
            alert("password don't match")
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            await createUserProfileDocument(user, { displayName })
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmedPassword: ''
            })
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className="sign-up">
                <h2 className='title'>I do not have a account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput type='text' name='displayName' value={this.state.displayName} onChange={this.handleChange} label='Display Name' required />
                    <FormInput type='email' name='email' value={this.state.email} onChange={this.handleChange} label='Email' required />
                    <FormInput type='password' name='password' value={this.state.password} onChange={this.handleChange} label='password' required />
                    <FormInput type='password' name='confirmedPassword' value={this.state.confirmedPassword} onChange={this.handleChange} label='Confirm Password' required />
                    <CustomButton type='submit'>Sign Up</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp