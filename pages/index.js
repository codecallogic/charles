import { useEffect, useState } from 'react'
import SVG from '../files/svg'
import axios from 'axios'
import { API, DOMAIN, SPOTIFY_CLIENT } from '../config'
import { connect } from 'react-redux'

//// MODALS
import CSVConfig from '../components/modals/csvConfig'

//// LISTS
import { emails } from '../files/emails'

axios.defaults.withCredentials = true

const authEndpoint = "https://accounts.spotify.com/authorize";
const scopes = [
  "user-read-private user-read-email"
];

const Home = ({
  token,
  authorization,
  user,

  //// STATE
  csv,
  searchParams,

  //// DISPATCH
  createType,
  resetType
  
}) => {

  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState('export_one')
  const [list, setList] = useState([])
  const [svg, setSVG] = useState('dropdown')
  const [modal, setModal] = useState('')
  const [current, setCurrent] = useState('')
  const [dropdown, setDropdown] = useState('')
  const [limit, setLimit] = useState(50)
  const [theme, setTheme] = useState('black')
  
  const Search = async () => {
    if(authorization) return window.location = `${authEndpoint}?client_id=${SPOTIFY_CLIENT}&response_type=code&redirect_uri=${DOMAIN}&scope=${scopes}`
    if(!search) return setMessage('Search must not be empty')
    setMessage('')
    setLoading('items')

    try {

      const response = await axios.post(`${API}/spotify/search`, {search: `${searchParams.email ? `${searchParams.email},` : ''}${search}`, type: 'playlist', token: token, limit: limit})
      // console.log(response.data)
      setLoading('')
      if(response.data.error) return (setMessage(response.data.error.message), `${authEndpoint}?client_id=${SPOTIFY_CLIENT}&response_type=code&redirect_uri=${DOMAIN}&scope=${scopes}`)
      if(response.data.playlists) return setList(response.data.playlists.items)

    } catch (error) {
      setLoading('')
      console.log(error)
      if(error) error.response ? setMessage(error.response.data) : setMessage('Error occurred search for items, please try again later')
    }
      
  }

  const reload = () => { 
    setTimeout( () => {
      window.location.reload()
    }, 1500)
  }

  useEffect(() => {
    if(searchParams.email) setLimit(100)
  }, [searchParams.email])

  useEffect(() => {
    if(!token) window.location = `${authEndpoint}?client_id=${SPOTIFY_CLIENT}&response_type=code&redirect_uri=${DOMAIN}&scope=${scopes}`
  }, [token])
  
  return (
    <>
    <div className="home" style={{ backgroundColor: theme}}>
      <div className="search">
        <div className="search-themes">
          <div style={{ backgroundColor: 'black'}} onClick={ (e) => setTheme('black')}></div>
          <div style={{ backgroundColor: '#1b998b'}} onClick={ (e) => setTheme('#1b998b')}></div>
          <div style={{ backgroundColor: '#EED46B'}} onClick={ (e) => setTheme('#EED46B')}></div>
          <div style={{ backgroundColor: '#091CE8'}} onClick={ (e) => setTheme('#091CE8')}></div>
        </div>
        <div className="search-bar">
          <input 
            type="text"
            placeholder="Search playlist"
            onChange={(e) => (setMessage(''), setSearch(e.target.value))}
            onKeyPress={(e) => e.key == 'Enter' ? Search() : null}
          />
          <div className="search-bar-svg" onClick={(e) => dropdown == 'emails' ? setDropdown('') : setDropdown('emails')}>
            <SVG svg={'email'}></SVG>
          </div>
          <div className="search-bar-svg" onClick={(e) => Search()}>
            <SVG svg={'search'}></SVG>
          </div>

          {dropdown == 'emails' && 
          <div className="search-bar-dropdown">
            { emails && emails.sort( (a, b) => a > b ? 1 : -1).map( (item, idx) => 
              <div 
                key={idx} 
                className="search-bar-dropdown-item"
                onClick={() => (searchParams.email === item ? createType('CREATE_SEARCH', 'email', ''): createType('CREATE_SEARCH', 'email', item) , setDropdown(''))}
              >
                {item.replace('@', '')} {item === searchParams.email ? <SVG svg={'checkmark'}></SVG> : ''}
              </div>
            )}
          </div>
          }
          
        </div>
      </div>
      <div className="home-message">{message ? (message, reload()) : ''}</div>
      <div className="home-items">
        { list.length > 0 && list.map((item, idx) => 
          <div 
            key={idx} 
            className="home-items-item" 
            onClick={(e) => (e.stopPropagation(), window.open(`${item.external_urls.spotify}`, '_blank'))}
            >
            <img 
              src={item.images[0] ? item.images[0].url : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png'}
            />
            <div 
              className="home-items-item-name">
              { item.name ? item.name.substring(0, 40): 'No name'} {item.name.length > 40 ? '...' : ''}
            </div>
            <div 
              className="home-items-item-owner" 
              onClick={(e) => (e.stopPropagation(), window.open(item.owner.uri, '_target'))}>
                Owner: {item.owner ? item.owner.display_name.substring(0, 15) : 'No owner'}
            </div>
            <div 
              className="home-items-item-description">
              {item.description ? item.description.substring(0, 40).replace( /(<([^>]+)>)/ig, '') : 'No description'} {item.description.length > 40 ? '...' : ''}
            </div>
            <div 
              className="home-items-item-dropdown" 
              onClick={(e) => (
                e.stopPropagation(), 
                svg == `close-${idx}` 
                ? 
                (setSVG('dropdown'), modal == 'csv-file' ? setModal('') : (setModal('csv-file'), setCurrent(idx))) 
                : 
                (setSVG(`close-${idx}`), modal == 'csv-file' ? setModal('') : (setModal('csv-file'), setCurrent(idx)))
                )
                }
            >
              {svg == `close-${idx}` ? <SVG svg={'close'}></SVG> : <SVG svg={'dropdown'}></SVG>}
            </div>
          </div>
        )}
        { list.length == 0 && !loading && <span style={{color: 'black'}}>Search to load items</span>}
        {loading == 'items' && <div className="loading"><span></span><span></span><span></span></div>}
      </div>
    </div>





    { modal == 'csv-file' &&
      <CSVConfig
        token={token}
        setModal={setModal}
        setSVG={setSVG}
        stateData={csv}
        stateMethod={createType}
        resetMethod={resetType}
        loading={loading}
        setLoading={setLoading}
        list={list}
        current={current}
        searchParams={searchParams}
      />
    }




    </>
  )
}

const mapStateToProps = (state) => {
  return {
    csv: state.csv,
    searchParams: state.search
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createType: (caseType, type, data) => dispatch({type: caseType, name: type, value: data}),
    resetType: (caseType) => dispatch({type: caseType})
  }
}

Home.getInitialProps = async ({query}) =>  {

  let token = null
  let message = null
  let user = null

  if(query.code){
    try {
      const response = await axios.post(`${API}/spotify/token`, {code: query.code})
      token = response.data
      
    } catch (error) {
      console.log(error.response.data)
      if(error) message = error.response.data
    }
  }

  // if(token){
  //   try {
  //     const response = await axios.post(`${API}/spotify/user`, {token: token})
  //     user = response.data
      
  //   } catch (error) {
  //     console.log(error.response.data)
  //     if(error) message = error.response.data
      
  //   }
  // }

  if(message) message = message.error_description
  
  return {
    token: token ? token : null,
    authorization: message ? message : null,
    user: user ? user : null
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)