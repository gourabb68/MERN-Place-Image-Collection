import React from 'react';

import './PlaceList.css';
import PlaceItem from './PlaceItem';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button'

const PlaceList = props=> {
    if(props.items.length === 0){
        return (
        <div className="place-list center">
            <Card>
                <h2>No Places Found. May create one?</h2>
              <Button to='/place/new'>Share Place</Button>
            </Card>
        </div>
        )
    }
    return (
     <ul className="place-list">
         {console.log('list '+props.id)}
         {props.items.map((place)=>{
             return (
             <PlaceItem 
             key={place.id}
             id={place.id}
             image={place.imageUrl}
             title={place.title}
             description= {place.description}
             address={place.address}
             creatorId={place.creator}
             coordinates={place.location}
             />
             )
         })}
     </ul>
    )
};

export default PlaceList;