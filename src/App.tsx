import Sidebar from "./components/Sidebar/Sidebar.tsx";
import {Flex} from "antd";
import TodoRouter from "./routes/TodoRouter.tsx";

function App() {
  return (
      <Flex>
          <Sidebar/>
          <TodoRouter/>
      </Flex>
  )
}

export default App
