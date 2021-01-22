import { Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import GoBack from '../../images/backk.svg';
import Dollar from '../../images/dollar.svg'
import './business.scss';

const useStyles = makeStyles(theme => ({
    iconButton: {
      display: "flex",
      flexDirection: "row",
    }
  }));

const BusinessNames = () => {
    const classes = useStyles();
    return ( 
        <div className='Outline'>
            <div class="div_1" >
                <div class="div_2">
                    <h1 className='title'>Business Name</h1>
                </div>
            </div>
             <h4 className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae nemo non eius</h4>
             <div className='rates'>
                <h2>$xxx</h2>
                <h2 className='rates-hourly'>Hourly Rate</h2>
             </div>
             <div class="headerDivider"></div>
             <div className='orders'>
                <h2>xxx</h2>
                <h2 className='orders-success'>Successful Orders</h2>
             </div>
            <Button variant="contained" color='secondary' classes={classes.iconButton} className='firstB' style={{ borderRadius: 50, height: '5vh', width: '7vw' }}>
                <img src={Dollar} alt='dollar sign' className='dollar' />
                <div className='buytext'>Buy</div>
            </Button>
            <Button
                variant="contained"
                className={classes.iconButton}
                className='secondB' 
                style={{ borderRadius: 50, height: '5vh', width: '8.5vw' }}>
                <img src={GoBack} alt='back sign' className='back' />
                <p className='back-text'>Go Back</p>
            </Button>
        </div>
     );
}
 
export default BusinessNames;