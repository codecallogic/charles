import SVG from '../../files/svg'

const CSVConfig = ({
  setModal,
  setSVG,
  loading,
  setLoading,
  
  //// REDUX
  stateData,
  stateMethod,
  resetMethod
  
}) => {
  const createType = 'CREATE_CSV'
  const resetType = 'RESET_TYPE'
  const loadingColor = 'white'
  
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
              name="spotifyURI" 
              id="spotifyURI" 
              hidden={true} 
              checked={stateData.spotifyURI ? true : false} 
              readOnly
            />
            <label 
              htmlFor="spotifyURI" 
              onClick={() => (
                stateData.spotifyURI
                ? 
                stateMethod(createType, 'spotifyURI', false) 
                : 
                stateMethod(createType, 'spotifyURI', true)
              )}
            >
            </label>
            <span>Export Spotify URI</span>
          </div>

        </div>

        <div className="modal-box-footer">
          <button 
            className="form-group-button" 
            onClick={(e) => (
              null
            )}
            >
            {loading == 'export_one' ? 
            <div className="loading">
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
              null
            )}
            >
            {loading == 'export_all' ? 
            <div className="loading">
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
