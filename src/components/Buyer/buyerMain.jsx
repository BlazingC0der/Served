import BuyerItems from './buyerItems';
import Scissors from "../../images/scissors.png"
import './buyer.scss';

const BuyerMain = () => {
    return ( 
        <div className="CardOutline">
            <div className="items">
                <img src={Scissors} className='itemimg'></img>
                <BuyerItems name='Barber'/>
            </div>
            <div className="items">
                <img src={Scissors} className='itemimg'></img>
                <BuyerItems name='Plumber'/>
            </div>
            <div className="items">
                <img src={Scissors} className='itemimg'></img>
                <BuyerItems name='Mechanic'/>
            </div>
            <div className="items">
                <img src={Scissors} className='itemimg'></img>
                <BuyerItems name='Electrician'/>
            </div>
        </div>
     );
}
 
export default BuyerMain;

// clip-path: polygon(0 0, 64% 0, 100% 100%, 0% 100%);
