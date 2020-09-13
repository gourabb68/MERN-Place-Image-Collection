import React,{useEffect,useState} from 'react';
import UsersList from '../components/UsersList'; 
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

 const Users =() =>{
     const [isLoading,setIsLoading]= useState(false);
     const [error,setError]= useState();
     const [loadedUsers,setLoadedUsers]= useState()
useEffect(()=>{
    //don't make useEffect callback function as async
    //useEffect never want to return promise so use IIFE
    //for fetch by default its a GET req so no need to declare
     const sendRequest= async()=>{
        setIsLoading(true);
        try{
            const response = await fetch('http://localhost:5000/api/users');
            const responseData = await response.json();
            if(!response.ok){
                console.log(responseData)
              throw new Error(responseData.message)  
            }
            setLoadedUsers(responseData.users);
            setIsLoading(false);
        }
        catch(err){
            setIsLoading(false);
            setError(err.message)
            console.log(err)
        }

     }
     sendRequest();
},[])

const errorHandler = ()=>{
    setError(null)
}

    // const USER = [
    //     {
    //         id: 'u1',
    //         name: 'gourab',
    //         image: 'https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg',
    //         places: 1
    //     }
    // ];
     return (
     <>
     <ErrorModal error={error} onClear={errorHandler}/>
      {isLoading && <div className='center'>
          <LoadingSpinner/>
          </div> } 
     {!isLoading && loadedUsers && <UsersList 
     items = {loadedUsers} />}
     </>
     )
 }

 export default Users;