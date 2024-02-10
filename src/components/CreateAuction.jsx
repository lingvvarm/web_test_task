import { useState } from "react";
import ControlledInput from "./ControlledInput";
import ImageInput from "./ImageInput";
import '../styles/CreateAuction.scss'
import { create_auction, read_auction, delete_auction, profile, upload_image, delete_image } from "../api/auctionApi";

function CreateAuction({ setOnPage, userData }) {
    const [currForm, setCurrForm] = useState({title: '', description: '', start_bid: '', bid_step: ''});
    const [auctionImages, setAuctionImages] = useState([]);

    async function create_auction_and_images() {
        const auction = await create_auction(currForm, userData.tokens.access);
        const auction_id = auction.id;
        auctionImages.map(async function(image) {
            const image_sent = await upload_image(userData.tokens.access, image, auction_id);
        });
    }

    return (
        <>
         <nav className='main-nav'>
                <div className="nav-btns">
                    <button className='nav-btn' type='button' onClick={() => {setOnPage('init')}}>About auction</button>
                    <button className='nav-btn' type='button' onClick={() => {setOnPage('allAuctions')}}>All lots</button>
                </div>
                <div className="profile-btns">
                {userData.username ? (
                    <p className="profile-btn">{userData.username}</p>
                ) : (
                    <button className='profile-btn' type='button' onClick={() => {setOnPage('signUp')}}>Register</button> / <button className='profile-btn' type='button' onClick={() => {setOnPage('signIn')}}>Login</button>
                )}
                {/* <button className='profile-btn' type='button' onClick={() => {setOnPage('signUp')}}>Register</button> / <button className='profile-btn' type='button' onClick={() => {setOnPage('signIn')}}>Login</button> */}
                </div>
            </nav>
        <div className="form-block">
            <p className="create-header">Create your lot</p>
            <form>
                <div className="create-inputs">
                    <div className="first-block">
                        <p className="input-label">Title</p>
                        <ControlledInput placeholder="Famous painting" maxLength={50} name='title' currForm={currForm} setCurrForm={setCurrForm} type='text' />
                        <p className="input-label">Description</p>
                        <ControlledInput placeholder="Ethereal Forest Glow" maxLength={50} name='description' currForm={currForm} setCurrForm={setCurrForm} type='text' />
                    </div>
                    <div className="second-block">
                        <p className="input-label">Start Bid</p>
                        <ControlledInput placeholder="100" maxLength={50} name='start_bid' currForm={currForm} setCurrForm={setCurrForm} type='text' />
                        <p className="input-label">Bid Step</p>
                        <ControlledInput placeholder="10" maxLength={50} name='bid_step' currForm={currForm} setCurrForm={setCurrForm} type='text' />
                    </div>
                </div>
                
            </form>
            <p className="images-advice">Maximum photos: 4. Formats: jpg, jpeg, png</p>
            <ImageInput auctionImages={auctionImages} setAuctionImages={setAuctionImages}/>
            <div className="create-btns-block">
                <button className="create-btn" type="button" onClick={() => {
                        create_auction_and_images();
                        setOnPage('profile');
                    }}>Create</button>
                <button className="create-btn" type='button' onClick={() => setOnPage('profile')}>Back</button>
            </div>
        </div>
        </>
    )
}

export default CreateAuction;