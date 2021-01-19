import React, { useCallback, useContext, useState } from 'react';

import {Container, Typography, FormControl, InputLabel, OutlinedInput, Button, Select, MenuItem } from '@material-ui/core'

import Navbar from '../components/Navbar'
import ItemsContext from '../contexts/ItemsContext';
import { useHistory, useParams } from 'react-router-dom';

const UpdateItem: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{id: string}>();
  
  const items = useContext(ItemsContext)

  const item = items.allItems.filter(item => item.id === Number(id))[0]

  const [name, setName] = useState(item.name)
  const [description, setDescription] = useState(item.description)
  const [value, setValue] = useState(item.value)
  const [categoryId, setCategoryId] = useState(item.category_id)
  const [image, setImage] = useState<File | null>(null)

  const handleUpdateItem = useCallback(async () => {    
    await items.updateItem({id: item.id, name, description, value, category_id: categoryId, image});
    history.push('/')
  }, [item, name, items, history, description, value, categoryId, image])

  return (<> 
    <Navbar />
    <Container>
      <Typography variant="h3" style={{margin: 16}} align="center">Editar Item</Typography>
    
      <Container>
        <form>
        
        <FormControl>
          <input id="image" type="file" onChange={event => event.currentTarget.files !== null && setImage(event.currentTarget.files[0])} />

        </FormControl>
        <br />
        <FormControl fullWidth variant="outlined" style={{marginTop: 16}}>
        <InputLabel >Categoria</InputLabel>
        <Select
          value={categoryId}
          onChange={event => setCategoryId(Number(event.target.value))}
        >
          {items.categories.map(category => <MenuItem value={category.id}>{category.name}</MenuItem>)}
        </Select>
      </FormControl>

        <FormControl fullWidth variant="outlined" style={{marginTop: 16}}>
          <InputLabel htmlFor="name">Nome</InputLabel>
          <OutlinedInput id="name" value={name} onChange={event => setName(event.target.value)} labelWidth={60} />
        </FormControl>
        <FormControl fullWidth variant="outlined" style={{marginTop: 16}}>
          <InputLabel htmlFor="description">Descrição</InputLabel>
          <OutlinedInput id="description" value={description} onChange={event => setDescription(event.target.value)} labelWidth={60} />
        </FormControl>
        <FormControl fullWidth variant="outlined" style={{marginTop: 16}}>
          <InputLabel htmlFor="value">Valor</InputLabel>
          <OutlinedInput id="value" value={value} onChange={event => setValue(Number(event.target.value))} labelWidth={60} />
        </FormControl>
 
        <Container style={{textAlign: 'center', marginTop: 16}} >
          <Button onClick={handleUpdateItem} disabled={name.length === 0} style={{marginTop: 16}} variant="contained" color="primary">
            Atualizar
          </Button>
        </Container>
        </form>
    </Container>
    </Container>
  </>
  );
}

export default UpdateItem;