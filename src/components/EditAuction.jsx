import { useEffect, useState } from "react"
import { delete_image, read_auction, update_auction, upload_image } from "../api/auctionApi"
import ControlledInput from "./ControlledInput"
import ImageInput from "./ImageInput"
import '../styles/EditAuction.scss'

function EditAuction({ setOnPage, auction_id, userData }) {
    const [currForm, setCurrForm] = useState(null);
    const [imageDeleted, setImageDeleted] = useState(false);
    const [newImages, setNewImages] = useState([]);
    const [primal_start_bid, setPrimalStartBid] = useState(0);

    useEffect(() => {
        read_auction(auction_id).then(info => {
            console.log('INFO');
            console.log(info);
            setCurrForm(info);
            setPrimalStartBid(info.start_bid);
            setImageDeleted(false);
        });
    }, [auction_id, imageDeleted]);

    return (
        <>
            {currForm !== null ? (
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
                        <p className="create-header">Edit your auction</p>
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
                            <div className="images-block">
                                {currForm.images.map((elem) => {
                                    return (
                                    <div key={elem.id} className="image-block">
                                        <img src={elem.image} alt="image" />
                                        <button type='button' onClick={() => {
                                            delete_image(userData.tokens.access, elem.id);
                                            setImageDeleted(true);
                                        }}>Delete</button>
                                    </div>
                                    )
                                })}
                            </div>
                            <div className="new-images-block">
                                <p className="add-new-images-text">Add new images</p>
                                <p className="images-advice">Overall maximum photos: 4. Formats: jpg, jpeg, png</p>
                                <ImageInput auctionImages={newImages} setAuctionImages={setNewImages}/>
                            </div>
                        </form>
                        <div className="create-btns-block">
                            <button className="create-btn" type="button" onClick={() => {
                                    if (currForm.bids.length > 0) {
                                        if (primal_start_bid !== currForm.start_bid) {
                                            setCurrForm({...currForm, start_bid: primal_start_bid});
                                            alert("You can't edit start bid in auction with participants");
                                            return;
                                        }
                                    }
                                    update_auction(userData.tokens.access, currForm, auction_id);
                                    newImages.map(async function(image) {
                                        const image_sent = await upload_image(userData.tokens.access, image, auction_id);
                                    });
                                    setOnPage('profile');
                                }}>Save</button>
                            <button className="create-btn" type='button' onClick={() => setOnPage('profile')}>Back</button>
                        </div>
                    </div>
                </>
            ): (
                <p>Loading...</p>
            )}
        </>
    );
}

export default EditAuction;
