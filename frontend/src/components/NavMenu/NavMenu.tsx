import {Link} from "react-router-dom";

function NavMenu() {
    return <header>
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to={'/Game'}>Game</Link>
                        <Link to={'/'}>Home</Link>
                        <Link to={'/Leaderboard'}>Leaderboard</Link>
                        <Link to={'/Settings'}>Settings</Link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
}

export default NavMenu;