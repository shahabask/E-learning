import  {ToastContainer} from 'react-toastify';
// import { Container } from 'react-bootstrap';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Layout from './layout/layout';
import 'react-toastify/dist/ReactToastify.css'
function App() {

  const initialOptions = {
    clientId: 'AbDu3j7FOwj2ZSeEXxlQnBlIqh5gJbaWwe3LJWSgoK157FYjWAbkQpgw8nN4VcllfHi9TpftGk66z0sz',
    currency: "USD",
    intent: "capture",
};
  return (
    <>
    <ToastContainer/>
    <PayPalScriptProvider options={initialOptions}>
   {/* <Container className='my-2'> */}
    <Layout style={{backgroundColor:'#FDF8EE'}}/>
    {/* </Container> */}
    </PayPalScriptProvider>
    </>
  )
}

export default App