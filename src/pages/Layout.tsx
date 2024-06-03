import { Link, Outlet } from 'react-router-dom';



const Layout = () => {
  return (
    <>
        <h1>
            <Link to="/">Home</Link> 
        </h1>
        <ul className='flex p-2 gap-2 font-bold underline'>
            <li>
                <Link to='/design'>Design</Link>
            </li>
            <li>
                <Link to='/form'>form</Link>
            </li>
            <li>
                <Link to='/view'>View</Link>
            </li>
            <li>
                <Link to='/canvas'>Canvas</Link>
            </li>
            <li>
                <Link to='/pdf'>Pdf</Link>
            </li>
            <li>
                <Link to='/filler'>filler</Link>
            </li>
            <li>
                <Link to='/editor'>Editor</Link>
            </li>
      </ul>
        <main>
            <Outlet />
        </main>  
    </>
  )
}

export default Layout