import { DateSelector } from "../DateSelector/DateSelector"
import "./SearchStayWithDate.css";
import { useDate,useCategory } from "../../context";
import { useState,useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export const SearchStayWithDate = () => {
    const { destination,guests,isSearchResultOpen, dateDispatch } = useDate();
  const [hotels, setHotels] = useState([]);
    const { hotelCategory } = useCategory();
    
    const navigate = useNavigate();
    
    useEffect(() => {
        (async () => {
          try {
            const { data } = await axios.get(`https://travellapp.cyclic.app/api/hotels?category=${hotelCategory}`);
     
           setHotels(data);
          } catch (err) {
            console.log(err);
          }
        })()
      }, [hotelCategory])

    const handleDestinationChange = (event) => {
        dateDispatch({
            type: "DESTINATION",
            payload:event.target.value,
        })
    } 

    const handleSearchResultClick = (address) => {
        dateDispatch({
            type: "DESTINATION",
            payload:address,
        })
    }

    const handleGuestChange = (event) => { 
        dateDispatch({
            type: "GUEST",
            payload:event.target.value,
        })

    }

    const handleDestinationFocus = () => {
        dateDispatch({
            type:"SHOW_SEARCH_RESULT",
        })
    }

    const handleSearchButtonClick = () => {
        dateDispatch({
            type:"CLOSE_SEARCH_MODAL",
        })
        navigate(`/hotels/${destination}`)
        
    }

    const destinationOptions = hotels.filter(
        ({ address, city, state, country }) =>
          address.toLowerCase().includes(destination.toLowerCase()) ||
          city.toLowerCase().includes(destination.toLowerCase()) ||
          state.toLowerCase().includes(destination.toLowerCase()) ||
          country.toLowerCase().includes(destination.toLowerCase())
      );
    return (
        <div className="destination-container">
            <div className="destination-options d-flex align-center absolute">
                <div className="location-container">
                    <label className="label">Where</label>
                    <input 
                        value={destination}
                        onChange={handleDestinationChange}
                        onFocus={handleDestinationFocus}
                        className="input search-dest"
                        placeholder="Search Destination"
                        autoFocus                   
                    />
                </div>
                <div className="location-container">
                    <label className="label">Check In</label>
                    <DateSelector  checkInType="in"/>
                </div>
                <div className="location-container">
                    <label className="label">Check Out</label>
                    <DateSelector  checkInType="out"/>
                </div>
                <div className="location-container">
                <label className="label">No. of Guests</label>
                    <input
                        value={guests}
                        className="input search-dest"
                        placeholder="Add guests"
                        onChange={handleGuestChange} />

                </div>
                <div className="search-container d-flex align-center cursor" onClick={handleSearchButtonClick}>
                    <span className="material-icons-outlined">
                        search
                    </span>
                    <span>Search</span>
                </div>
            </div>
            {
                isSearchResultOpen &&
                <div className="search-result-container absolute">
                        {destinationOptions &&
                            destinationOptions.map(({ address, city }) => (
                                <p className="p cursor-pointer"
                                    onClick={() => handleSearchResultClick(address)}>
                            {address},{city}
                        </p>
                    ))}
            </div>
            }
           
        </div>
    )
}