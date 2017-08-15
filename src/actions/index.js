let id = 0;

export const addUser = (name, surname, email, password) => ({
   type: 'ADD_USER',
   id: id += 1,
   name,
   surname,
   email,
   password
});
