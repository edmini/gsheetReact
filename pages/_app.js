import '../styles/globals.css'
// import Post from './posts/Post'
import Top from './statics/Top'
import InputForm from './posts/InputForm'
import Sheet from './posts/Sheet'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { Dimmer, Loader, Divider } from 'semantic-ui-react'
// import GOOGLE_DATA from '../pages/posts/GSHEET.json'

function MyApp({ Component, pageProps }) {
  const [mydata, setMydata] = useState([])
  const [loading, setLoading] = useState(false)

  const url = 'http://localhost:3030/googlesheets';

  useEffect(()=>{
      const fetchData = async () => {
          try {
              setLoading(true)
              const getData = await axios.get(url);
              setMydata(getData.data);
              setLoading(false)
          } catch (e){
              console.log("Error response FetchData : " + e);
          }
      }
      fetchData();
  }, []);

  return (
  <div>
    <Component {...pageProps} />
    <Dimmer active={loading}>
      <Loader />
    </Dimmer>
    <Top />
    <Divider />
    <Sheet gdata = {mydata} />
    <Divider />
    <InputForm />
    {/* <Post /> */}
    <Divider />

  </div>
  )
}

export default MyApp
