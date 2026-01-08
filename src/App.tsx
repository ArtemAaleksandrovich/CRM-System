import TodoListPage from './pages/TodoListPage/TodoListPage.tsx'
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import {Route, Routes} from "react-router-dom";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import {Flex} from "antd";

function App() {
  return (
      <Flex>
          <Sidebar/>
          <Routes>
              <Route path="/" element={<TodoListPage/>} />
              <Route path="/profile" element={<ProfilePage/>} />
          </Routes>
      </Flex>
  )
}

export default App
