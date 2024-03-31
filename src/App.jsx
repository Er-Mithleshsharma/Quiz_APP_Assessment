import{ createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from "./Components/Main"
import Quiz from './Components/Quiz'
import Result from './Components/Result'
import { Provider } from 'react-redux'
import appstore from './utils/appstore'
const router = createBrowserRouter([
  {
    path : '/',
    element : <Main></Main>
  },
  {
    path : '/quiz',
    element :<Quiz/>
  },
  {
    path : '/result',
    element : <Result />
  },
])

function App() {
  return (
    <Provider store={appstore}>
      <RouterProvider router={router} />
      </Provider>
  );
}


export default App;