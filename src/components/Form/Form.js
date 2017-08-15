import React from 'react';
import { connect } from 'react-redux';
import './Form.css';
import { addUser } from '../../actions/index';
class Form extends React.Component {

    state = {
        registred: false
    };

    resetFields = () => {
        this.name.value = '';
        this.surname.value = '';
        this.email.value = '';
        this.password.value = '';
    };

    sayThanks = () => (
        this.setState((prevState) => ({
            registred: !prevState.registred
        }))
    );

    handleSubmit = () =>  {
        const name = this.name.value;
        const surname = this.surname.value;
        const email = this.email.value;
        const password = this.password.value;
        this.props.addUser(name, surname, email, password);
        this.resetFields();
        this.sayThanks();
    }

    checkUser = () => {
        this.props.checkUser()
    };

    render() {
        const sayThanks = this.state.registred;
        return (
            sayThanks
                ?
                <h1>Спасибо за регистрацию</h1>
                :
                <div>
                    <form className="form" onSubmit = {(e) => {
                        e.preventDefault();
                    }}>
                        <input ref={(input) => this.name = input} className='form-input' type="text" placeholder='Имя'/>
                        <input ref={(input) => this.surname = input} className='form-input' type="text" placeholder='Фамилия'/>
                        <input ref={(input) => this.email = input} className='form-input' type="text" placeholder='e-mail'/>
                        <input ref={(input) => this.password = input} className='form-input' type="password" placeholder='Пароль'/>
                        <input onClick = {this.handleSubmit} className='form-button' type="submit" value='Регистрация' />
                    </form>
                </div>
        )
    }
}

const mapStateToProps = (store) => ({
    users: store
});

const mapDispatchToProps = (dispatch) => ({
    addUser: (name, surname, email, password) => dispatch(addUser(name, surname, email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);