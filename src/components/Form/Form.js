import React from 'react';
import { connect } from 'react-redux';
import './Form.css';
import { addUser } from '../../actions/index';
class Form extends React.Component {
    state = {
        name: '',
        surname: '',
        email: '',
        password: '',
        registered: false,
    };

    resetFields = () => (
        this.setState({
            name: '',
            surname: '',
            email: '',
            password: '',
        })
    );

    sayThanks = () => (
        this.setState((prevState) => ({
            registered: !prevState.registered,
        }))
    );

    handleSubmit = () =>  {
        const name = this.state.name;
        const surname = this.state.surname;
        const email = this.state.email;
        const password = this.state.password;

        if(name !== '' && surname !== '' && email !== '' && password !== '') {
            this.props.addUser(name, surname, email, password);
            this.resetFields();
            this.sayThanks();
        } else {
           alert('Вы пытаетесь отправить форму с пустыми полями, пожалуйста заполните все поля.')
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
        const sayThanks = this.state.registered;
        return (
            sayThanks
                ?
                <h1>Спасибо за регистрацию</h1>
                :
                <div>
                    <form className="form" onSubmit = {(e) => {
                        e.preventDefault();
                    }}>
                        <input onChange={(e) => {this.handleChange(e)}} className='form-input' type="text" placeholder='Name'/>
                        <input onChange={(e) => {this.handleChange(e)}} className='form-input' type="text" placeholder='Surname'/>
                        <input onChange={(e) => {this.handleChange(e)}} className='form-input' type="text" placeholder='e-mail'/>
                        <input onChange={(e) => {this.handleChange(e)}} className='form-input' type="password" placeholder='Password'/>
                        <input onClick = {this.handleSubmit} className='form-button' type="submit" value='Регистрация' />
                    </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form);
