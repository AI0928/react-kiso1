import './App.css'
import { Route, Routes, useNavigate } from "react-router-dom";
import { PostCreate } from './components/PostCreate';
import { ViewPost } from './components/ViewPost';

function App() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="App">
        <button onClick={() => {
          navigate('/')
        }}>データ一覧</button>
        <button onClick={() => {
          navigate('/threads/new')
        }}>新規作成</button>

        <Routes>
          <Route path="/" element={<ViewPost />} />
          <Route path="/threads/new" element={<PostCreate />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
