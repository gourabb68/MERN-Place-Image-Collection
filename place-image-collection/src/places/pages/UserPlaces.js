import React from 'react';
import {useParams} from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES =[
    {
        id: 'p1',
        title: 'Empire State Building',
        Description: 'One of the most famous ',
        imageUrl: 'https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg',
        address: '20 W 34th St, New York, NY 10001, United States',
        location: {
            lat: 40.7484405,
            lng: -73.9878531
        },
        creator: 'u1'
        
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        Description: 'One of the most famous ',
        imageUrl: 'https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg',
        address: '20 W 34th St, New York, NY 10001, United States',
        location: {
            lat: 40.7484405,
            lng: -73.9878531
        },
        creator: 'u2'
        
    }
]

const UserPlaces = ()=> {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(places=> places.creator === userId )
    return (
        <PlaceList items={loadedPlaces} />
    )
};

export default UserPlaces;