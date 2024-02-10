import { refresh_token } from "./authApi";

// const AUCTION_BASE_URL = 'http://127.0.0.1:8000/api/auction';

const AUCTION_BASE_URL = 'https://auctions-back-86d979548c3b.herokuapp.com/api/auction'

function objectToFormData(obj) {
    const formData = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return formData;
}

async function profile(access, username) {
    const apiUrl = AUCTION_BASE_URL + `/profile/${username}/`;
    try {
        const response = await fetch(apiUrl, {method: 'GET', headers: { 'Authorization': `Bearer ${access}`}});
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function create_auction(body, access) {
    const apiUrl = AUCTION_BASE_URL + '/auctions/';
    const requestBody = body;
    try {
        const response = await fetch(apiUrl, {method: 'POST', headers: { 'Authorization': `Bearer ${access}`,}, body: objectToFormData(requestBody)});
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function read_auction(auction_id) {
    const apiUrl = AUCTION_BASE_URL + `/auctions/${auction_id}/`;
    try {
        const response = await fetch(apiUrl, {method: 'GET'});
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function delete_auction(access, auction_id) {
    const apiUrl = AUCTION_BASE_URL + `/auctions/${auction_id}/`;
    try {
        const response = await fetch(apiUrl, {method: 'DELETE', headers: { 'Authorization': `Bearer ${access}`,}});
    } catch (error) {
        console.error('Error:', error);
    }
}

async function update_auction(access, auctionDataObj, auction_id) {
    const apiUrl = AUCTION_BASE_URL + `/auctions/${auction_id}/`;
    const formData = objectToFormData(auctionDataObj);
    formData.append('id', auction_id);
    try {
        const response = await fetch(apiUrl, {method: 'PUT', headers: { 'Authorization': `Bearer ${access}`,}, body: formData});
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function list_auctions() {
    const apiUrl = AUCTION_BASE_URL + `/auctions/`;
    try {
        const response = await fetch(apiUrl, {method: 'GET'});
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function upload_image(access, image, auction_id) {
    const apiUrl = AUCTION_BASE_URL + '/auction-images/';
    const formData = new FormData();
    formData.append('image', image);
    formData.append('auction', auction_id);
    try {
        const response = await fetch(apiUrl, {method: 'POST', headers: { 'Authorization': `Bearer ${access}`,}, body: formData});
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function delete_image(access, image_id) {
    const apiUrl = AUCTION_BASE_URL + `/auction-images/${image_id}/`;
    try {
        const response = await fetch(apiUrl, {method: 'DELETE', headers: { 'Authorization': `Bearer ${access}`,}});
    } catch (error) {
        console.error('Error:', error);
    }
}

async function make_bid(access, username, bid, auction_id) {
    const apiUrl = AUCTION_BASE_URL + '/bid/';
    const requestBody = {user: {username}, bid: Number(bid), auction: Number(auction_id)}
    try {
        const response = await fetch(apiUrl, {method: 'POST', headers: { 'Authorization': `Bearer ${access}`, 'content-type': 'application/json'}, body: JSON.stringify(requestBody)});
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export { profile, create_auction, read_auction, delete_auction, update_auction, list_auctions, upload_image, delete_image, make_bid };