import { Route, Routes } from "react-router";
import Header from "./components/Comments/Header";
import HomePage from "./pages/HomePage/HomePage";
import style from "./css/app.module.css";
import FullPost from "./pages/HomePage/FullPostPage";

function App() {
  return (
    <div className={style.app}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/fullpost/:postId" element={<FullPost />} />
      </Routes>
    </div>
  );
}

export default App;
