import React from 'react';
import Slider from './Slider';
import { useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Vada from '../Images/Vada.jpeg';
import '../css/Home.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import arrow icons
import View from './View';
import { Link } from 'react-router-dom';
import Header from './Header';
import Fashion from '../Images/Fashion.jpg';
import Chicken from '../Images/Food1.jpg';
import idli from '../Images/Idli.jpeg';
import Upma from '../Images/Upma.jpeg';
import Burger from '../Images/Burger.jpeg';
import Biriyani from '../Images/Biriyani.jpeg';
import Noodles from '../Images/Noodles.jpeg';
import Coffee from '../Images/Coffee.jpeg';
import Oreo from '../Images/Oreo Milkshake.jpg'


// Reusable CustomCard component
const CustomCard = ({ image, title, ...props }) => (
  <Card sx={{ maxWidth: 200, textAlign: "center", padding: "10px", ...props.sx }} {...props}>
    <CardMedia
      component="img"
      alt={title}
      height="140"
      image={image}
      sx={{
        width: "100px", 
        height: "100px",
        borderRadius: "50%", 
        objectFit: "cover",
        margin: "auto"
      }}
    />
    <CardContent>
      <Typography gutterBottom variant="h6" component="div">
        {title}
      </Typography>
    </CardContent>
  </Card>
);



export default function Home() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div style={{width:"100%"}}>

  <Header />

<div style={{ width: "100%", display: "flex", justifyContent: "center" }}>

<div className="Home">
      
    <div style={{ width: "100%", textAlign: "left", paddingLeft: "350px" }}>
    Choose the Food..
      </div>
      <div className="Image" style={{ 
        display: 'flex', 
        gap: '20px', 
        boxShadow: "none",
        paddingBottom: '10px', 
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <CustomCard component={Link} to="/view" onClick={handleCloseUserMenu} sx={{ '&:hover': { backgroundColor: '#ffffff' } }} image={Chicken} title="Chicken" />
        <CustomCard component={Link} to="/view" onClick={handleCloseUserMenu} sx={{ '&:hover': { backgroundColor: '#ffffff' } }}  image={Burger} title="Burger" />
        <CustomCard component={Link} to="/view" onClick={handleCloseUserMenu} sx={{ '&:hover': { backgroundColor: '#fffff' } }}  image={Biriyani} title="Biriyani" />
        <CustomCard component={Link} to="/view" onClick={handleCloseUserMenu} sx={{ '&:hover': { backgroundColor: '#fffff' } }}  image={Noodles} title="Noodle" />
        <CustomCard component={Link} to="/view" onClick={handleCloseUserMenu} sx={{ '&:hover': { backgroundColor: '#fffff' } }}  image={Coffee} title="Coffee" />
        <CustomCard component={Link} to="/view" onClick={handleCloseUserMenu} sx={{ '&:hover': { backgroundColor: '#fffff' } }}  image={Oreo} title="IceCream" />
        
        

      </div>
      <div className="slider-container">
  <Slider />
</div>


     
     
        <View />
      </div>
    </div>
    </div>
  
    )
}