import React, {useContext} from 'react';
import {Container, Typography, Grid} from '@material-ui/core'
import Item from '../components/Item'
import Navbar from '../components/Navbar'
import ItemsContext from '../contexts/ItemsContext'


const Home: React.FC = () => {
  const {categories} = useContext(ItemsContext);

  
  return (
    <div>
        <Navbar />
        <Container >
          <Typography style={{margin: 16}} variant="h3" align="center" >Nossos Produtos</Typography>
          <Container>
            {categories.map(category => (
              <React.Fragment key={category.id}>
                 <Typography style={{margin: 16}} variant="h5" align="center">{category.name}</Typography>
                 <Grid container direction="row" justify="center" alignItems="center" spacing={3} >
                   {category.Items.map(item => (
                      <Grid key={item.id} item xs={12} sm={6} md={4} lg={3} >
                        <Item item={item}/> 
                      </Grid>
                   ))}
                 </Grid>
              </React.Fragment>
            ))}
          </Container>
        </Container>
    </div>
  );
}

export default Home;
