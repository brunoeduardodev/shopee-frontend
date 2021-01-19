import React from 'react';
import {Card, Typography, CardMedia, CardContent, Button, CardActions} from '@material-ui/core'

import api from '../../services/api'

interface Props {
  item: {
    name: string;
    value: number;
    description: string;
    image_url: string;
  }
}

const Item: React.FC<Props> = ({item}) => {
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
        <Button style={{margin: 'auto'}} variant="contained" href="#" color="primary">Comprar</Button>
      
      </CardContent>
  </Card>
}

export default Item;