import { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { BiCameraMovie, BiSearchAlt2 } from 'react-icons/bi'

import './NavBar.css'

const Navbar = () => {
  const[search, setSeacrh] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!search) return;

    navigate(`/search?q=${search}`);
    setSeacrh("");
  }

  return (
    <nav id='navbar'>
        <h2><Link to="/"> <BiCameraMovie/> Home</Link></h2>
        <h2><Link to="compare"> CineChoice</Link></h2>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Search a movie' onChange={(e) => setSeacrh(e.target.value)} value={search}/>
            <button type='submit'><BiSearchAlt2/></button>
        </form>
    </nav>
  )
}

export default Navbar