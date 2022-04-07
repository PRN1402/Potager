//import logo from './logo.svg';
import { Link } from 'react-router-dom';


function Header() {
 // console.log('Entrée Header');
  return (
    <div>
    <header>

      <nav className="nav">
        <ul>
          <li>
            <Link to={'/'}>Accueil</Link>
          </li>
          <li>
            <Link to={'/vegetables-list'}>Liste des légumes</Link>
          </li>
        </ul>
      </nav>

    </header>
<h1>POTAGER COMPATIBLE</h1>
</div>
  );
}
export default Header;  
