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


export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/mt/:threadID' element={<MainThread />} />
        <Route path='/st/:threadID' element={<SubThread />} />
        <Route path='/p/:threadID' element={<Post />} />
      </Routes>
    </Router>
  );
}


