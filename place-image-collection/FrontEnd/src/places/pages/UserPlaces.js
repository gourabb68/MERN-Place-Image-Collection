import React,{useEffect, useState,useContext} from 'react';
import {useParams} from 'react-router-dom';
import {useHttpClient} from '../../shared/hooks/http-hook';
import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {AuthContext} from '../../shared/components/context/auth-context';
// const DUMMY_PLACES =[
//     {
//         id: 'p1',
//         title: 'Empire State Building',
//         Description: 'One of the most famous ',
//         imageUrl: 'https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg',
//         address: '20 W 34th St, New York, NY 10001, United States',
//         location: {
//             lat: 40.7484405,
//             lng: -73.9878531
//         },
//         creator: 'u1'
        
//     },
//     {
//         id: 'p2',
//         title: 'Empire State Building',
//         Description: 'One of the most famous ',
//         imageUrl: 'https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg',
//         address: '20 W 34th St, New York, NY 10001, United States',
//         location: {
//             lat: 40.7484405,
//             lng: -73.9878531
//         },
//         creator: 'u2'
        
//     }
// ]

const UserPlaces = ()=> {
    // const auth =useContext(AuthContext);
    const [loadedPlaces,setLoadedPlaces]=useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const userId = useParams().userId;
    // console.log(auth.userId)
    // const loadedPlaces = DUMMY_PLACES.filter(places=> places.creator === userId )
    useEffect(()=>{
        const fetchPlaces =async()=>{
            try{
               const responseData= await sendRequest(`http://localhost:5000/api/places/user/${userId}`)
               setLoadedPlaces(responseData.places)
            }catch(err){

            }
            
        }
        fetchPlaces();
    },[sendRequest,userId]);

    const placeDeletedHandler =(deletePlaceId)=>{
        setLoadedPlaces(prevPlaces =>prevPlaces.filter(place => place.id !==deletePlaceId));
    }
    return (
        <>
        <ErrorModal error={error} onClear={clearError}/>
        {isLoading && (
            <div className='center'>
                <LoadingSpinner/>
            </div>
        )}
       {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />}
        </>
    )
};

export default UserPlaces;