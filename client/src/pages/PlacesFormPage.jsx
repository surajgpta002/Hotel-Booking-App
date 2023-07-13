import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import PhotosUploader from "../PhotosUploader";
import Perks from "./Perks";
import { useEffect, useState } from "react";
import axios from "axios";
// import { set } from "mongoose";


export default function PlacesFormPage() {
    const { id } = useParams();
    const [title, setitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setcheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {

        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setcheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });

    }, [id]);

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price,
        };

        if (id) {
            //update
            await axios.put('/places', {
                id, ...placeData

            });
            setRedirect(true);

        } else {
            //new places
            await axios.post('/places', placeData);
            setRedirect(true);
        }

    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace} >

                {preInput('Title', 'Title for your place should be short and catcy in the advertisment')}
                <input type="text" value={title} onChange={ev => setitle(ev.target.value)} placeholder="title , for example: My lovley Apartment" />

                {preInput('Address', 'Address to this place')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />


                {preInput('Photos', 'more = better')}

                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />


                {preInput('Description', 'description of the place')}
                <textarea name="" id="" cols="20" rows="5" value={description} onChange={ev => setDescription(ev.target.value)} />

                {preInput('Perks', 'Select all the perks')}

                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks} />

                </div>

                {preInput('Extra info', 'house rules, etc')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />

                {preInput('Check in&out times', 'add check in and out times, remember to have some window for cleaning the room between guest')}

                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">

                    <div>
                        <h3 className="mt-2 -mb-1">Check in times</h3>
                        <input type="text" placeholder="14" value={checkIn} onChange={ev => setcheckIn(ev.target.value)} />
                    </div>

                    <div>
                        <h3 className="mt-2 -mb-1">Check out times</h3>
                        <input type="text" placeholder="11" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                    </div>

                    <div>
                        <h3 className="mt-2 -mb-1">Max number of guest</h3>
                        <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} />
                    </div>

                    <div>
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                        <input type="number" value={price} onChange={ev => setPrice(ev.target.value)} />
                    </div>

                </div>

                <button className="primary my-4">Save</button>


            </form>
        </div>
    )
}