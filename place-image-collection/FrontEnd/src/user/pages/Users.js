import React,{useEffect,useState} from 'react';
import UsersList from '../components/UsersList'; 
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from "../../shared/hooks/http-hook";
 const Users =() =>{
    //  const [isLoading,setIsLoading]= useState(false);
    //  const [error,setError]= useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
     const [loadedUsers,setLoadedUsers]= useState()
useEffect(()=>{
    //don't make useEffect callback function as async
    //useEffect never want to return promise so use IIFE
    //for fetch by default its a GET req so no need to declare
     const fetchUsers= async()=>{
        try{
            const responseData = await sendRequest('http://localhost:5000/api/users');
            setLoadedUsers(responseData.users);
            
        }
        catch(err){
           }

     }
     fetchUsers();
},[sendRequest])



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
     <ErrorModal error={error} onClear={clearError}/>
      {isLoading && <div className='center'>
          <LoadingSpinner/>
          </div> } 
     {!isLoading && loadedUsers && <UsersList 
     items = {loadedUsers} />}
     </>
     )
 }

 export default Users;