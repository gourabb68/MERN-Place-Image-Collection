import React from 'react';
import UsersList from '../components/UsersList'; 


 const Users =() =>{
    const USER = [
        {
            id: '123',
            name: 'gourab',
            image: 'https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg',
            places: 1
        }
    ];
     return <UsersList 
     items = {USER}
     />
 }

 export default Users;