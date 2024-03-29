const SVG = ({svg, classprop, color}) => {

  const selectSVG = (svg) => {
    switch(svg){

      case 'checkmark':
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path d="M27 4l-15 15-7-7-5 5 12 12 20-20z"></path>
          </svg> 
        break;

      case 'email':
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path d="M28 5h-24c-2.209 0-4 1.792-4 4v13c0 2.209 1.791 4 4 4h24c2.209 0 4-1.791 4-4v-13c0-2.208-1.791-4-4-4zM2 10.25l6.999 5.25-6.999 5.25v-10.5zM30 22c0 1.104-0.898 2-2 2h-24c-1.103 0-2-0.896-2-2l7.832-5.875 4.368 3.277c0.533 0.398 1.166 0.6 1.8 0.6 0.633 0 1.266-0.201 1.799-0.6l4.369-3.277 7.832 5.875zM30 20.75l-7-5.25 7-5.25v10.5zM17.199 18.602c-0.349 0.262-0.763 0.4-1.199 0.4s-0.851-0.139-1.2-0.4l-12.8-9.602c0-1.103 0.897-2 2-2h24c1.102 0 2 0.897 2 2l-12.801 9.602z"></path>
          </svg> 
        break;

      case 'search':
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path>
          </svg> 
        break;

      case 'dropdown':
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path d="M8 8v4h16v-4h-16zM8 18h16v-4h-16v4zM8 24h16v-4h-16v4z"></path>
          </svg> 
        break;

      case 'close':
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path>
          </svg> 
        break;

      default:
        break
    }
  }

  return (
    <>
      {selectSVG(svg)}
    </>
  )
}

export default SVG