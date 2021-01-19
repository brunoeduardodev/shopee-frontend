import React, { useCallback, useContext, useState } from 'react';

import {Container, Typography, FormControl, InputLabel, OutlinedInput, Button} from '@material-ui/core'

import Navbar from '../components/Navbar'
import ItemsContext from '../contexts/ItemsContext';
import { useHistory } from 'react-router-dom';

const AddCategory: React.FC = () => {
  const history = useHistory();
  const items = useContext(ItemsContext)
  const [name, setName] = useState("")

  const handleAddCategory = useCallback(async () => {
    await items.storeCategory(name);
    history.push('/')
  }, [name, items, history])

  return (<>
    <Navbar />
    <Container>
      <Typography variant="h3" style={{margin: 16}} align="center">Adicionar Categoria</Typography>
    
      <Container>
        <form onSubmit={(event) => {event.preventDefault(); handleAddCategory()}}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="name">Nome</InputLabel>
          <OutlinedInput id="name" value={name} onChange={event => setName(event.target.value)} labelWidth={60} />
        </FormControl>


        <Container style={{textAlign: 'center'}}>
          <Button onClick={handleAddCategory} disabled={name.length === 0} style={{marginTop: 16}} variant="contained" color="primary">
            Adicionar
          </Button>
        </Container>
        </form>
    </Container>
    </Container>
  </>
  );
}

export default AddCategory;