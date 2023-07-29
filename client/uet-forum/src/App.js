import './App.css';
import Home from './components/home/Home'
import Header from './components/header/Header'
import { useParams } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import MainThread from './components/main-thread/MainThread';
import SubThread from './components/sub-thread/SubThread';

export function Post() {
  const params = useParams();
  return (
    <h1>
      Post {params.postID}
    </h1>
  )
}

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/p/:postID' element={<Post />} />
        <Route path='/mt/:threadID' element={<MainThread />} />
        <Route path='/st/:threadID' element={<SubThread />} />
      </Routes>
    </Router>
  );
}


