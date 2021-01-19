import React, {useCallback, useContext, useState} from 'react';
import AuthContext from '../contexts/AuthContext'
import {Container, Typography, FormControl, InputLabel, OutlinedInput, Button, CircularProgress} from '@material-ui/core'
import Navbar from '../components/Navbar'

import {useHistory} from 'react-router-dom'

const Login: React.FC = () => {
  const auth = useContext(AuthContext);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const history = useHistory();

  const handleLogin = useCallback(async () => {
    console.log("handleLogin")
    const error = await auth.authenticate(email, password)
    setError(error)
    history.push('/')

  }, [email, password, auth, history])


  return <div>
    <Navbar />
    <Container>
    <Typography style={{margin: 16}} variant="h3" align="center" >Fazer Login</Typography>
      <Container>
        <form onSubmit={event => {event.preventDefault(); handleLogin()}}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput id="email" value={email} onChange={event => setEmail(event.target.value)} labelWidth={60} />
        </FormControl>

        <FormControl style={{marginTop: 16}} fullWidth variant="outlined">
          <InputLabel htmlFor="password">Senha</InputLabel>
          <OutlinedInput id="password" type="password" value={password} onChange={event => setPassword(event.target.value)} labelWidth={60} />
        </FormControl>
          
        <Container style={{textAlign: 'center'}}>
          <Button onClick={handleLogin} disabled={auth.loading} style={{marginTop: 16}} variant="contained" color="primary">
            {auth.loading ? <CircularProgress /> : "Fazer Login"}
          </Button>
          <Typography variant="body2" color="error">{error}</Typography>
        </Container>
        </form>
      </Container>
    </Container>
  </div>;
}

export default Login;