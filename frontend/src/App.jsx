import { ToastContainer } from 'react-toastify';
import { Container } from 'react-bootstrap';
import Layout from './layout/layout';
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <>
    <ToastContainer/>
   <Container className='my-2'>
    <Layout/>
    </Container>
    </>
  )
}

export default App