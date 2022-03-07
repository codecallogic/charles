import { useEffect, useState } from 'react'
import SVG from '../files/svg'
import axios from 'axios'
import { API, DOMAIN, SPOTIFY_CLIENT } from '../config'
axios.defaults.withCredentials = true

const authEndpoint = "https://accounts.spotify.com/authorize";
const scopes = [
  "user-read-private"
];

const Home = ({
  token,
  authorization
}) => {

  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState('')
  const [list, setList] = useState([])
  
  const Search = async () => {
    if(authorization) return window.location = `${authEndpoint}?client_id=${SPOTIFY_CLIENT}&response_type=code&redirect_uri=${DOMAIN}&scope=${scopes}`
    if(!search) return setMessage('Search must not be empty')
    setMessage('')
    setLoading('items')

    try {
      const response = await axios.post(`${API}/spotify/search`, {search: search, type: 'playlist', token: token})
      setLoading('')
      if(response.data.playlists) return setList(response.data.playlists.items)
    } catch (error) {
      setLoading('')
      console.log(error)
      if(error) error.response ? setMessage(error.response.data) : setMessage('Error occurred search for items, please try again later')
    }
    
  }

  useEffect(() => {
    console.log(list)
    if(!token) window.location = `${authEndpoint}?client_id=${SPOTIFY_CLIENT}&response_type=code&redirect_uri=${DOMAIN}&scope=${scopes}`
  }, [token])
  
  return (
    <div className="home">
      <div className="search">
        {/* <div className="search-close">
          <SVG svg={'close'}></SVG>
        </div> */}
        <div className="search-bar">
          <input 
            type="text"
            placeholder="Search playlist"
            onChange={(e) => (setMessage(''), setSearch(e.target.value))}
          />
          <div className="search-bar-svg" onClick={(e) => Search()}>
            <SVG svg={'search'}></SVG>
          </div>
        </div>
      </div>
      <div className="home-message">{message ? message : ''}</div>
      <div className="home-items">
        { list.length > 0 && list.map((item, idx) => 
          <div key={idx} className="home-items-item" onClick={() => window.open(`${item.uri}`, '_blank')}>
            <img src={item.images[0] ? item.images[0].url : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png'}/>
            <div className="home-items-item-name">{ item.name ? item.name.substring(0, 40): 'No name'} {item.name.length > 40 ? '...' : ''}</div>
            <div className="home-items-item-description">{item.description ? item.description.substring(0, 40) : 'No description'} {item.description.length > 40 ? '...' : ''}</div>
          </div>
        )}
        { list.length == 0 && !loading && <span style={{color: 'black'}}>Search to load items</span>}
        {loading == 'items' && <div className="loading"><span></span><span></span><span></span></div>}
      </div>
    </div>
  )
}

Home.getInitialProps = async ({query}) =>  {

  let token = null
  let message = null

  if(query.code){
    try {
      const response = await axios.post(`${API}/spotify/token`, {code: query.code})
      token = response.data
      
    } catch (error) {
      console.log(error.response.data)
      if(error) message = error.response.data
    }
  }

  if(message) message = message.error_description
  
  return {
    token: token ? token : null,
    authorization: message ? message : null
  }
}

export default Home