import React from 'react';
import { connect } from 'react-redux';
import './Form.css';
import { addUser } from '../../actions/index';
import PropTypes from 'prop-types';

class Form extends React.Component {
    state = {
        name: '',
        surname: '',
        email: '',
        password: '',
        showErrorMessage: false,
        showSuccessMessage: false
    };

    resetFields = () => (
        this.setState({
            name: '',
            surname: '',
            email: '',
            password: '',
        })
    );

    showError = () => (
        this.setState({
            showErrorMessage: true,
            showSuccessMessage: false,
        })
    );

    showSuccess = () => (
        this.setState({
            showSuccessMessage: true,
            showErrorMessage: false,
        })
    );

    handleSubmit = () =>  {
        const name = this.state.name;
        const surname = this.state.surname;
        const email = this.state.email;
        const password = this.state.password;

        if(name !== '' && surname !== '' && email !== '' && password !== '') {
            this.props.addUser(name, surname, email, password);
            this.resetFields();
            this.showSuccess();
        } else {
            this.showError();
        }
    };

    handleChange(e) {
        switch(e.target.placeholder) {
            case 'Name':
                this.setState({name: e.target.value});
                break;
            case 'Surname':
                this.setState({surname: e.target.value});
                break;
            case 'e-mail':
                this.setState({email: e.target.value});
                break;
            case 'Password':
                this.setState({password: e.target.value});
                break;
            default:
                return this.state;
        }
    };

    render() {
        const error = this.state.showErrorMessage;
        const success = this.state.showSuccessMessage;
        return (
                <div>
                    <form
                        className="form"
                        onSubmit = {(e) => {
                            e.preventDefault();
                        }}
                    >
                        <input
                            value={this.state.name}
                            onChange={(e) => {this.handleChange(e)}}
                            className='form-input'
                            type="text"
                            placeholder='Name'
                        />
                        <input
                            value={this.state.surname}
                            onChange={(e) => {this.handleChange(e)}}
                            className='form-input'
                            type="text"
                            placeholder='Surname'
                        />
                        <input
                            value={this.state.email}
                            onChange={(e) => {this.handleChange(e)}}
                            className='form-input'
                            type="text"
                            placeholder='e-mail'
                        />
                        <input
                            value={this.state.password}
                            onChange={(e) => {this.handleChange(e)}}
                            className='form-input'
                            type="password"
                            placeholder='Password'/>
                        <input
                            onClick = {this.handleSubmit}
                            className='form-button'
                            type="submit"
                            value='Регистрация'
                        />
                    </form>
                    <span
                        className="error-message"
                        style={{ display: error ? 'block' : 'none'}}
                    > Заполните все поля пожалуйста </span>
                    <span
                        className="success-message"
                        style={{ display: success ? 'block' : 'none'}}
                    > Спасибо за регистрацию </span>
                </div>
        )
    }
}

const mapStateToProps = (store) => ({
    users: store,
});

const mapDispatchToProps = (dispatch) => ({
    addUser: (name, surname, email, password) => dispatch(addUser(name, surname, email, password)),
});


Form.propTypes = {
    users: PropTypes.array.isRequired,
    addUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
