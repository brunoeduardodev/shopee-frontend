import React, { useContext } from 'react';
import {AppBar, Typography, Button, Toolbar} from '@material-ui/core'
import {Link} from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext';
// import { Container } from './styles';
  
const Navbar: React.FC = () => {

  const auth = useContext(AuthContext);
  console.log(auth.signed)
  return (
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" style={{flexGrow: 1}}><Link to="/" style={{flexGrow: 1, color:'#FFF', textDecoration: 'none'}}>Shopee</Link></Typography>
      {!auth.signed && <Link to="/login" style={{color:'#FFF', textDecoration: 'none'}}>LOGIN</Link>}
      {auth.signed && 
        <>
          <Button color="inherit" onClick={auth.signOut} href="#">SAIR</Button>
        </> }
    </Toolbar>
  </AppBar>);
}

export default Navbar;