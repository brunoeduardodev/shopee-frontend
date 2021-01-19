import React, { useCallback, useContext, useState } from 'react';

import {Container, Typography, FormControl, InputLabel, OutlinedInput, Button} from '@material-ui/core'

import Navbar from '../components/Navbar'
import ItemsContext from '../contexts/ItemsContext';
import { useHistory, useParams } from 'react-router-dom';

const UpdateCategory: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{id: string}>();
  
  
  const items = useContext(ItemsContext)
  const categoryName = items.categories.filter(category => category.id === Number(id))[0].name;
  const [name, setName] = useState(categoryName)

  const handleAddCategory = useCallback(async () => {
    await items.updateCategory(Number(id), name);
    history.push('/')
  }, [name, items, history, id])

  return (<>
    <Navbar />
    <Container>
      <Typography variant="h3" style={{margin: 16}} align="center">Atualizar Categoria</Typography>
    
      <Container>
        <form>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="name">Nome</InputLabel>
          <OutlinedInput id="name" value={name} onChange={event => setName(event.target.value)} labelWidth={60} />
        </FormControl>


        <Container style={{textAlign: 'center'}}>
          <Button onClick={handleAddCategory} disabled={name.length === 0} style={{marginTop: 16}} variant="contained" color="primary">
            Atualizar
          </Button>
        </Container>
        </form>
    </Container>
    </Container>
  </>
  );
}

export default UpdateCategory;