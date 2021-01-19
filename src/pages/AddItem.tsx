import React, { useCallback, useContext, useState } from 'react';

import {Container, Typography, FormControl, InputLabel, OutlinedInput, Button, Select, MenuItem } from '@material-ui/core'

import Navbar from '../components/Navbar'
import ItemsContext from '../contexts/ItemsContext';
import { useHistory } from 'react-router-dom';

const AddItem: React.FC = () => {
  const history = useHistory();
  const items = useContext(ItemsContext)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [value, setValue] = useState(0)
  const [categoryId, setCategoryId] = useState(1)
  const [image, setImage] = useState<File | null>(null)

  const handleAddItem = useCallback(async () => {
    if(!image) return
    
    await items.storeItem({name, description, value, category_id: categoryId, image});
    history.push('/')
  }, [name, items, history, description, value, categoryId, image])

  return (<> 
    <Navbar />
    <Container>
      <Typography variant="h3" style={{margin: 16}} align="center">Adicionar Item</Typography>
    
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
          <OutlinedInput id="value" type="number" value={value} onChange={event => setValue(Number(event.target.value))} labelWidth={60} />
        </FormControl>
 
        <Container style={{textAlign: 'center', marginTop: 16}} >
          <Button onClick={handleAddItem} disabled={name.length === 0} style={{marginTop: 16}} variant="contained" color="primary">
            Adicionar
          </Button>
        </Container>
        </form>
    </Container>
    </Container>
  </>
  );
}

export default AddItem;