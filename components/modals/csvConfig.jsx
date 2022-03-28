import { useState, useEffect } from 'react'
import SVG from '../../files/svg'
import axios from 'axios'
import { API, PUBLIC_FILES } from '../../config'
import { isNumber } from '../../helpers/validations'

const CSVConfig = ({
  token,
  setModal,
  setSVG,
  loading,
  setLoading,
  
  //// REDUX
  stateData,
  stateMethod,
  resetMethod,

  //// DATA
  list,
  current,
  
}) => {
  const createType = 'CREATE_CSV'
  const resetType = 'RESET_TYPE'
  const loadingColor = 'white'
  const [message, setMessage] = useState('')
  const [followersLimit, setFollowersLimit] = useState('')
  
  const generateCSV = async (e, loadingType) => {
    e.preventDefault()
    setLoading(loadingType)
    let allow = []
    let rows = []
    
    for(let key in stateData){
      if(stateData[key]){
        allow.push(key)
      }
    }

    //// SINGLE PLAYLIST
    if(loadingType == 'export_one'){
      let data = new Object()

      await Promise.all(allow.map( async (item) => { 
        try {

          data[item] = list[current][item]
          
          if(item == 'tracks') data[item] = list[current][item].total

          if(item == 'socials'){
            if(list[current]['description'].match(/(@[a-zA-Z0-9._-].*)/)){
              data[item] = list[current]['description'].match(/(@[a-zA-Z0-9._-].*)/)[0]
            }
          }

          if(item == 'ownerName') data['ownerName'] = list[current]['owner'].display_name
          if(item == 'url') data['url'] = list[current]['external_urls'].spotify
          
          if(item == 'followers'){
            const response = await axios.post(`${API}/spotify/playlist`, {id: list[current]['id'], token: token})
            if(+response.data.followers.total > +followersLimit) data['followers'] = response.data.followers.total
            if(+response.data.followers.total < +followersLimit) data['followers'] = `< ${followersLimit}`
          }

        } catch (error) {
          console.log(error)
          if(error) error.response ? setMessage(error.response.data) : setMessage('Error ocurred generating csv file')

        }

      }))
      
      rows.push(data)
    }

    //// MULTIPLE PLAYLIST
    if(loadingType == 'export_all'){
      await Promise.all(list.map( async (playlist) => {
        let data = new Object()  
        
        await Promise.all(allow.map( async (item) => { 
          try {
            data[item] = playlist[item]
          
            if(item == 'tracks') data[item] = playlist[item].total

            if(item == 'socials'){
              if(playlist['description'].match(/(@[a-zA-Z0-9._-].*)/)){
                data[item] = playlist['description'].match(/(@[a-zA-Z0-9._-].*)/)[0]
              }
            }

            if(item == 'ownerName') data['ownerName'] = playlist['owner'].display_name
            if(item == 'url') data['url'] = playlist['external_urls'].spotify

            if(item == 'followers'){
              const response = await axios.post(`${API}/spotify/playlist`, {id: playlist['id'], token: token})
              if(+response.data.followers.total > +followersLimit) data['followers'] = response.data.followers.total
              if(+response.data.followers.total < +followersLimit) data['followers'] = `< ${followersLimit}`
            }
            
          } catch (error) {
            console.log(error)
            if(error) error.response ? setMessage(error.response.data) : setMessage('Error ocurred generating csv file')
          }
          
        }))

        rows.push(data)
      }))
    }

    try {
      const response = await axios.post(`${API}/csv/generate`, rows)
      setLoading('')
      setMessage(response.data)
      
    } catch (error) {
      console.log(error)
      setLoading('')
      if(error)  error.response ? setMessage(error.response.data) : setMessage('Error ocurred generating csv file')
    }
  }
  
  return (
    <div className="modal">
      <div className="modal-box">


        <div className="modal-box-header">
          <div 
          className="modal-box-svg" 
          onClick={() => (setModal(), setSVG())}
          >
            <SVG svg={'close'}></SVG>
          </div>
          <div className="modal-box-header-title">CSV Editor</div>
        </div>


        <div className="modal-box-content">
          <div className="form-group-checkbox">
            <input 
              type="checkbox" 
              name="name" 
              id="name" 
              hidden={true} 
              checked={stateData.name ? true : false} 
              readOnly
            />
            <label 
              htmlFor="name" 
              onClick={() => (
                stateData.name
                ? 
                stateMethod(createType, 'name', false) 
                : 
                stateMethod(createType, 'name', true)
              )}
            >
            </label>
            <span>Export Name/Title</span>
          </div>

          <div className="form-group-checkbox">
            <input 
              type="checkbox" 
              name="followers" 
              id="followers" 
              hidden={true} 
              checked={stateData.followers ? true : false} 
              readOnly
            />
            <label 
              htmlFor="followers" 
              onClick={() => (
                stateData.followers
                ? 
                stateMethod(createType, 'followers', false) 
                : 
                stateMethod(createType, 'followers', true)
              )}
            >
            </label>
            <span>Export Followers</span>
          </div>

          <div className="form-group-checkbox">
            <input 
              type="checkbox" 
              name="tracks" 
              id="tracks" 
              hidden={true} 
              checked={stateData.tracks ? true : false} 
              readOnly
            />
            <label 
              htmlFor="tracks" 
              onClick={() => (
                stateData.tracks
                ? 
                stateMethod(createType, 'tracks', false) 
                : 
                stateMethod(createType, 'tracks', true)
              )}
            >
            </label>
            <span>Export Tracks</span>
          </div>

          <div className="form-group-checkbox">
            <input 
              type="checkbox" 
              name="popularity" 
              id="popularity" 
              hidden={true} 
              checked={stateData.popularity ? true : false} 
              readOnly
            />
            <label 
              htmlFor="popularity" 
              onClick={() => (
                stateData.popularity
                ? 
                stateMethod(createType, 'popularity', false) 
                : 
                stateMethod(createType, 'popularity', true)
              )}
            >
            </label>
            <span>Export Popularity</span>
          </div>

          <div className="form-group-checkbox">
            <input 
              type="checkbox" 
              name="lastModified" 
              id="lastModified" 
              hidden={true} 
              checked={stateData.lastModified ? true : false} 
              readOnly
            />
            <label 
              htmlFor="lastModified" 
              onClick={() => (
                stateData.lastModified
                ? 
                stateMethod(createType, 'lastModified', false) 
                : 
                stateMethod(createType, 'lastModified', true)
              )}
            >
            </label>
            <span>Export Last Modified</span>
          </div>

          <div className="form-group-checkbox">
            <input 
              type="checkbox" 
              name="ownerName" 
              id="ownerName" 
              hidden={true} 
              checked={stateData.ownerName ? true : false} 
              readOnly
            />
            <label 
              htmlFor="ownerName" 
              onClick={() => (
                stateData.ownerName
                ? 
                stateMethod(createType, 'ownerName', false) 
                : 
                stateMethod(createType, 'ownerName', true)
              )}
            >
            </label>
            <span>Export Owner Name</span>
          </div>

          <div className="form-group-checkbox">
            <input 
              type="checkbox" 
              name="links" 
              id="links" 
              hidden={true} 
              checked={stateData.links ? true : false} 
              readOnly
            />
            <label 
              htmlFor="links" 
              onClick={() => (
                stateData.links
                ? 
                stateMethod(createType, 'links', false) 
                : 
                stateMethod(createType, 'links', true)
              )}
            >
            </label>
            <span>Export Links</span>
          </div>

          <div className="form-group-checkbox">
            <input 
              type="checkbox" 
              name="socials" 
              id="socials" 
              hidden={true} 
              checked={stateData.socials ? true : false} 
              readOnly
            />
            <label 
              htmlFor="socials" 
              onClick={() => (
                stateData.socials
                ? 
                stateMethod(createType, 'socials', false) 
                : 
                stateMethod(createType, 'socials', true)
              )}
            >
            </label>
            <span>Export Socials</span>
          </div>

          <div className="form-group-checkbox">
            <input 
              type="checkbox" 
              name="email" 
              id="email" 
              hidden={true} 
              checked={stateData.email ? true : false} 
              readOnly
            />
            <label 
              htmlFor="email" 
              onClick={() => (
                stateData.email
                ? 
                stateMethod(createType, 'email', false) 
                : 
                stateMethod(createType, 'email', true)
              )}
            >
            </label>
            <span>Export Email</span>
          </div>

          <div className="form-group-checkbox">
            <input 
              type="checkbox" 
              name="url" 
              id="url" 
              hidden={true} 
              checked={stateData.url ? true : false} 
              readOnly
            />
            <label 
              htmlFor="url" 
              onClick={() => (
                stateData.url
                ? 
                stateMethod(createType, 'url', false) 
                : 
                stateMethod(createType, 'url', true)
              )}
            >
            </label>
            <span>Export URL</span>
          </div>

          <div className="form-group-checkbox">
            <input 
              type="checkbox" 
              name="description" 
              id="description" 
              hidden={true} 
              checked={stateData.description ? true : false} 
              readOnly
            />
            <label 
              htmlFor="description" 
              onClick={() => (
                stateData.description
                ? 
                stateMethod(createType, 'description', false) 
                : 
                stateMethod(createType, 'description', true)
              )}
            >
            </label>
            <span>Export Description</span>
          </div>

          <div className="form-group-checkbox">
            <input 
              type="checkbox" 
              name="uri" 
              id="uri" 
              hidden={true} 
              checked={stateData.uri ? true : false} 
              readOnly
            />
            <label 
              htmlFor="spotifyURI" 
              onClick={() => (
                stateData.uri
                ? 
                stateMethod(createType, 'uri', false) 
                : 
                stateMethod(createType, 'uri', true)
              )}
            >
            </label>
            <span>Export Spotify URI</span>
          </div>
          <div className="form-group">
            <input
              id="followersLimit"
              type="text"
              placeholder="Followers limit"
              value={followersLimit}
              onChange={(e) => (setMessage(''), isNumber('followersLimit'), setFollowersLimit(e.target.value))}
            />
          </div>

        </div>

        <div className="modal-box-footer">
          {message &&
          <span className="form-group-message">
            Exported to: <a href={`${PUBLIC_FILES}/data-${message}.csv`} target="_blank">Data-{message}.csv</a>
          </span>
          }
          <button 
            className="form-group-button" 
            onClick={(e) => (
              generateCSV(e, 'export_one')
            )}
            >
            {loading == 'export_one' ? 
            <div className="loading-relative">
              <span style={{backgroundColor: loadingColor}}></span>
              <span style={{backgroundColor: loadingColor}}></span>
              <span style={{backgroundColor: loadingColor}}></span>
            </div>
            : 
            'Export to CSV'
            }
          </button>
          <button 
            className="form-group-button" 
            onClick={(e) => (
              generateCSV(e, 'export_all')
            )}
            >
            {loading == 'export_all' ? 
            <div className="loading-relative">
              <span style={{backgroundColor: loadingColor}}></span>
              <span style={{backgroundColor: loadingColor}}></span>
              <span style={{backgroundColor: loadingColor}}></span>
            </div>
            : 
            'Export All to CSV'
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default CSVConfig
