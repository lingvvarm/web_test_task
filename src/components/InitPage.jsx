import { useState, useEffect } from 'react';
import { list_auctions } from '../api/auctionApi';

import '../styles/InitPage.scss'

function InitPage({ setOnPage }) {
    const [allAuctionsList, setAllAuctionsList] = useState(null);
    const [auctionsLoaded, setAuctionsLoaded] = useState(false);

    useEffect(() => {
        list_auctions()
            .then((list) => {
                setAllAuctionsList(list);
                setAuctionsLoaded(true);
            })
            .catch((error) => {
                console.error('Error fetching auctions:', error);
                setAuctionsLoaded(true);
            });
    }, []);

    return (
        <>
        <div className="main-block">
            <nav className='main-nav'>
                <div className="nav-btns">
                    <button className='nav-btn' type='button' onClick={() => {setOnPage('init')}}>About auction</button>
                    <button className='nav-btn' type='button' onClick={() => {setOnPage('allAuctions')}}>All lots</button>
                </div>
                <div className="profile-btns">
                <button className='profile-btn' type='button' onClick={() => {setOnPage('signUp')}}>Register</button> / <button className='profile-btn' type='button' onClick={() => {setOnPage('signIn')}}>Login</button>
                </div>
            </nav>
            <div className="main-hero">
                <h1 className="hero-header">Charity Auction</h1>
                <p className="hero-text">We are convinced that everyone can make the world a better place, and every small step in this direction is of great importance. Join us at our online charity auction, and together we will do more for those who need our help!</p>
                <div className="hero-buttons">
                    <button className='hero-btn' type="button">Place a bet</button>
                    <button className='hero-btn' type="button">Offer a lot</button>
                </div>
            </div>
        </div>
        <div className="main-about">
            <div className="about-header">About the auction</div>
            <div className="main-content">
                <div className="content-img-container">
                    <img className='content-img' src="https://i.pinimg.com/736x/98/58/74/9858745cd157f2797065e639c5b3bf23.jpg" alt="" />
                </div>
                <div className="content-desc">
                    <div className='content-desc-header'>Welcome to our online charity auction!</div>
                    <div className="content-desc-text">We are pleased to present you with the opportunity to participate in an event that not only makes the world a better place, but also gives you the opportunity to get interesting items and services while you help those who need our support.</div>
                    <div className="content-desc-text">Our auction is not just an opportunity to get unique items and experiences, it is also an opportunity to do a good deed. Participation in our event will allow you not only to win incredible items, but also to contribute to the implementation of charitable projects aimed at improving the lives of those in difficult situations.</div>
                </div>
            </div>
        </div>
        <div className="active-lots-block">
            <div className="active-lots-header-block">
                <div className="active-lots-header">Active lots</div>
            </div>
            <div className="lots-container">
            {auctionsLoaded ? (
                        allAuctionsList.map((auction, index) => {
                            if (index < 3) {
                                return (
                                    <div key={index} className="lot">
                                        <div className="lot-image">
                                            <img
                                                src={
                                                    auction.images.length > 0
                                                        ? auction.images[0].image
                                                        : 'https://pics.craiyon.com/2023-06-28/b0931868d81346b68f5964f0c393b2fe.webp'
                                                }
                                                alt="image"
                                                className="lot-image"
                                            ></img>
                                        </div>
                                        <div className="lot-text">
                                            <div className="lot-header">{auction.title}</div>
                                            <div className="lot-highest-bid-container">
                                                <div className="highest-bid-text">highest bid:</div>
                                                <div className="highest-bid-value">$1000</div>
                                            </div>
                                            <div className="lot-owner-container">
                                                <div className="lot-owner-text">owner:</div>
                                                <div className="lot-owner-value">{auction.owner.username}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })
                    ) : (
                        <div className="loading-text">Loading...</div>
                    )}
            </div>
        </div>
        </>
    )
}

export default InitPage;