import React , {useState , useEffect} from 'react';
import axios from 'axios'
import styles from '../components/location.css'

const LocationSelector = ({ handleLocationChange  , handleModalClose , setLocation}) => {
  
  let [userLocationSearch , setUserLocationSearch] = useState("")
  let [locationSuggestion , setLocationSuggestion] = useState([])  

  useEffect(()=>{
    axios.get(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${userLocationSearch}&types=`)
    .then((res)=>{
        if(res.data.data)
            {
                setLocationSuggestion(res.data.data)
            }
        })
    },[userLocationSearch])
    return (
    <div style={{ textAlign: "center" }}>
      <input
        placeholder='search locations' 
        value = {userLocationSearch}
        onChange={(e)=>{setUserLocationSearch(e.target.value)}}
        name="locations" />
      <br />
      <br />
      {userLocationSearch != "" ?  locationSuggestion.map((item , i)=>{
            return <label>
            <input type="radio" className="location-name"
             onClick={()=>{
                axios.get(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${item.place_id}`)
                .then((res)=>{
                    let locationData = res.data.data[0].geometry.location
                    setLocation({
                        lat : locationData.lat,
                        long : locationData.lng
                    })
                    setLocationSuggestion([])
                })
             }}
             name="locations" />
            {item.description}<br/><br/>
          </label>
    
      }) : " "}
      <br/><br/>
      <button type="button" class="locationbtn" onClick={handleModalClose}>Change Location</button>
    </div>
  );
};

export default LocationSelector;
