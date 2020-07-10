import React from 'react';

import './UsersList.css';
import  '../../shared/components/UIElements/Card.css';
import Card from '../../shared/components/UIElements/Card';
import UserItem from './UserItem';

const UserList =(props) =>{
  if(props.items.length===0){
      return <div className='center'>
          <Card>
          <h2>No user found.</h2>
          </Card>
          
      </div>
  }
  else {
    return (
        <ul className='users-list'>
        {props.items.map((user)=>{
            return (
                <UserItem 
                key ={user.id}
                id ={user.id}
                image ={user.image}
                name= {user.name}
                placeCount ={user.places}
                />
            )  
        })}
    
      </ul>
      )
  }
 


}

export default UserList;