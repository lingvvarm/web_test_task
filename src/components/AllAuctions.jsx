import { useState, useEffect } from 'react'
import { list_auctions } from '../api/auctionApi'
import '../styles/AllAuctions.scss'

function AllAuctions({ setOnPage, setCurrentAuction, setCalledFrom }) {
    const [allAuctionsList, setAllAuctionsList] = useState(null);

    useEffect(() => {
        list_auctions().then((list) => setAllAuctionsList(list));
    }, []);

    return (
        <>
        <div className="all-main-block">

            <nav className='all-main-nav'>
                <div className="all-nav-btns">
                    <button className='nav-btn' type='button' onClick={() => {setOnPage('init')}}>About auction</button>
                    <button className='nav-btn' type='button' onClick={() => {setOnPage('allAuctions')}}>All lots</button>
                </div>
                <div className="profile-btns">
                <button className='profile-btn' type='button' onClick={() => {setOnPage('signUp')}}>Register</button> / <button className='profile-btn' type='button' onClick={() => {setOnPage('signIn')}}>Login</button>
                </div>
            </nav>        
        <div className="all-auctions-box">
            {allAuctionsList ? (
                 <div className='auctions-container'>
                 {allAuctionsList.map((auction) => {
                     return (
                         <div className='auction-card' key={auction.id}>
                             {auction.images.length > 0 ? (
                                <img className='auction-img' src={auction.images[0].image} alt="img" />
                             ): (
                                // <p>No image provided</p>
                                <img className='auction-img' src='https://i.pinimg.com/736x/98/58/74/9858745cd157f2797065e639c5b3bf23.jpg' alt="img" />
                             )}
                             <div className="all-auction-text">
                                 <p className='auction-title'>{auction.title}</p>
                                 <p className='auction-desc'>{auction.description}</p>
                                 {/* <p className='auction-start-bid'>Start bid: {auction.start_bid}</p> */}
                                 <p className='auction-bid-step'>Bid step: {auction.bid_step}</p>
                                 <p className='auction-owner'>Owner: {auction.owner.username}</p>
                                 <button className='bet-btn' type='button' onClick={() => {
                                    setCurrentAuction(auction.id);
                                    setCalledFrom('allAuctions');
                                    setOnPage('auctionInfo');
                                }}>Place a bet</button>
                             </div>
                         </div>
                     )
                 })}
                </div>
            ): (
                <p>Loading</p>
            )}
        </div>
       </div>
        </>
    )
}

export default AllAuctions;