import mainLogo1 from './assets/mainLogo1.png';
import propertyLogo from './assets/propertyLogo.png';
import carLogo from './assets/carLogo.jpg';
import { Link } from 'react-router-dom';
import "../Header/index.css"


const LoginHeader = () =>{
    return (
        <>
        <section className="logo">
            <Link to="/">
            <img className="olx_logo" src={mainLogo1} />
            </Link>
          <div className="motorHeading">
            <img className="logoPic" src={carLogo} />
            <h3 className="Logo_Heading">Motors</h3>
          </div>
          <div className="propertyHeading">
            <img className="logoPic" src={propertyLogo} />
            <h3 className="Logo_Heading">Property</h3>
          </div>
        </section>
        </>
    )
}

export default LoginHeader;