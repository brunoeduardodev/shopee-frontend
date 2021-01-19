import React, { useCallback, useContext } from 'react';
import api from '../../services/api'
import {Card, Typography, CardMedia, CardContent, Button, CardActions} from '@material-ui/core'
import ItemsContext from '../../contexts/ItemsContext';
import {Link} from 'react-router-dom'
interface Item {
  id: number;
  name: string;
  value: number;
  description: string;
  image_url: string;
  category_id: number;
}

interface Props {
  item: Item
}

const ItemAdmin: React.FC<Props> = ({item}) => {

  const {deleteItem} = useContext(ItemsContext)

  const handleDeleteItem = useCallback(() => {
    const response = window.confirm("Certeza que deseja remover o item?")
    if(response){
      deleteItem(item)
    }
  }, [deleteItem, item])

  return <Card style={{marginBottom: 16}} elevation={3} >
      <CardMedia style={{height: 150}} title={item.name} image={`${api.defaults.baseURL}${item.image_url}`} />
      
      <CardContent style={{textAlign: 'center'}}>
        <Typography gutterBottom variant="h5" component="h2">
          {item.name}
        </Typography>
        
        <Typography variant="body2" color="textSecondary" component="p">
          {item.description}
        </Typography>

        <Typography variant="h6" color="primary">
          R${item.value.toFixed(2)}
        </Typography>

      </CardContent>

      <CardActions>
          <Button component={Link} to={`/updateItem/${item.id}`} size="small" color="primary">
            Editar
          </Button>
          <Button onClick={handleDeleteItem} size="small" color="primary">
            Remover
          </Button>
        </CardActions>  
  </Card>
}

export default ItemAdmin;