export default function reducer(state = [], action) {
    switch(action.type) {
        case 'ADD_USER':
            return [
                        ...state, {
                            id: action.id,
                            name: action.name,
                            surname: action.surname,
                            email: action.email,
                            password: action.password
                        }
                    ];
        default:
            return state;
    }
}