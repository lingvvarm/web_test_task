import { useState } from 'react'
import InitPage from './InitPage'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Profile from './Profile'
import CreateAuction from './CreateAuction'
import AuctionInfo from './AuctionInfo'
import AllAuctions from './AllAuctions'
import EditAuction from './EditAuction'
import '../styles/App.scss'

function App() {
  const [onPage, setOnPage] = useState('init');
  const [userData, setUserData] = useState({});
  const [currentAuction, setCurrentAuction] = useState(null);
  const [calledFrom, setCalledFrom] = useState(null);
  const [currentEditedAuction, setCurrentEditedAuction] = useState(null);


  return (
    <div className={`app-container-${onPage}`}>
    {onPage === 'init' && <InitPage setOnPage={setOnPage}/>}
    {onPage === 'signUp' && <SignUp setOnPage={setOnPage} setUserData={setUserData}/>}
    {onPage === 'signIn' && <SignIn setOnPage={setOnPage} setUserData={setUserData}/>}
    {onPage === 'profile' && <Profile userData={userData} setUserData={setUserData} setOnPage={setOnPage} setCurrentAuction={setCurrentAuction} setCalledFrom={setCalledFrom} 
    setCurrentEditedAuction={setCurrentEditedAuction}/>}
    {onPage === 'createAuction' && <CreateAuction setOnPage={setOnPage} userData={userData}/>}
    {onPage === 'auctionInfo' && <AuctionInfo setOnPage={setOnPage} auction_id={currentAuction} called_from={calledFrom} userData={userData}/>}
    {onPage === 'allAuctions' && <AllAuctions setOnPage={setOnPage} setCurrentAuction={setCurrentAuction} setCalledFrom={setCalledFrom}/>}
    {onPage === 'editAuction' && <EditAuction setOnPage={setOnPage} auction_id={currentEditedAuction} userData={userData}/>}
    </div>
  )
}

export default App;
