import React, { useCallback, useContext } from 'react';

import Navbar from '../components/Navbar'

import ItemAdmin from '../components/ItemAdmin'

import {Container, Typography, Grid, Button} from '@material-ui/core'
import {Edit, Delete} from '@material-ui/icons'
import ItemsContext from '../contexts/ItemsContext';
import { Link, useHistory } from 'react-router-dom';

const Admin: React.FC = () => {
  const {categories, deleteCategory} = useContext(ItemsContext);
  const history = useHistory();

  const handleEditCategory = useCallback((id: number) => {
    history.push(`/updateCategory/${id}`)
  }, [history])

  const handleDeleteCategory = useCallback((id: number) => {
    const response = window.confirm("Tem certeza que deseja deletar a categoria?")

    if(response){
      deleteCategory(id);
    }
  }, [deleteCategory])

  return (
    <>
      <Navbar />
      <Container style={{textAlign: 'center'}}>
        <Typography style={{margin: 16}} variant="h3" align="center" >Categorias</Typography>
        
        <Button component={Link} size="large" color="primary" to="/addCategory">Adicionar Categoria</Button>
        <Container>
            {categories.map(category => (
              <Container style={{margin: 16}} key={category.id}>
                
                 <Typography variant="h5" align="center">{category.name}
                  <Edit onClick={() => handleEditCategory(category.id)}  style={{marginLeft: 8, cursor: 'pointer'}}/>
                  <Delete onClick={() => handleDeleteCategory(category.id)} style={{marginLeft: 8, cursor: 'pointer'}} />
                 </Typography>
                 <Button component={Link} to="/addItem" size="large" style={{textAlign: 'center'}} color="primary">Adicionar Item</Button>
                 <Grid container direction="row" justify="center" alignItems="center" spacing={1} >
                   {category.Items.map(item => (
                      <Grid key={item.id} item xs={12} sm={6} md={4} lg={3} >
                        <ItemAdmin item={item}/>
                      </Grid>
                   ))}
                 </Grid>
                 
              </Container>
            ))}
          </Container>

      </Container>
    </>
  )

}

export default Admin;