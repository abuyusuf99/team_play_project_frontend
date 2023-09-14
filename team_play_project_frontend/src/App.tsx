import { Route, Routes } from "react-router";
import Header from "./components/Comments/Header";
import HomePage from "./components/Comments/HomePage";
import style from './css/app.module.css'
import AddPost from "./components/AddPosts/AddPost";
//comment for commit

function App() {

  return (
    <div className={style.app}>
    <Header/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path="/addPost" element={<AddPost/>}/>
     
    </Routes>
    </div>
  )
}

export default App
