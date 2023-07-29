import './App.css';
import Home from './components/home/Home'
import Header from './components/header/Header'
import Post from './components/post/Post';
import { useParams } from 'react-router-dom';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import MainThread from './components/main-thread/MainThread';
import SubThread from './components/sub-thread/SubThread';
import UserProfile from './components/user/UserProfile';
import ViewUserProfile from './components/user/ViewUserProfile';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/mt/:threadID' element={<MainThread />} />
        <Route path='/st/:threadID' element={<SubThread />} />
        <Route path='/p/:threadID' element={<Post />} />
        <Route path ='/user' element = {<UserProfile/>} />
        <Route path ='/user/:userID' element = {<ViewUserProfile/>} />

      </Routes>
    </Router>
  );
}


