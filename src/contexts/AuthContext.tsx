import React, {createContext, useCallback, useState} from 'react'
import api from '../services/api'

interface User {
  name: string;
  email: string;
}

interface AuthContextData{
  signed: boolean;
  loading: boolean;
  authorization: string; 
  user: User;
  authenticate: (email: string, password: string) => Promise<string>;
  signOut: () => void;
}



interface AuthResponse {
  user: User;
  token: string;
}


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthContextProvider: React.FC = ({children}) => {
  const [signed, setSigned] = useState(false);
  const [authorization, setAuthorization] = useState('');
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User>({} as User);

  const authenticate = useCallback(async (email: string, password: string) => {
    try{
      setLoading(true)
      const response = await api.post<AuthResponse>('auth', {email, password});
      
      setUser(response.data.user);
      setAuthorization(response.data.token);
      api.defaults.headers.authorization = "Bearer " + response.data.token;
      setSigned(true)
      setLoading(false);
      return ''
    }catch(error){
      
      setLoading(false);
      if(error.response.status === 401){
        return 'Email ou senha inválidos.'
      }
      
      return 'Não foi possível realizar o login.'
    }
  }, [])

  const signOut = useCallback(() => {
    setSigned(false)
    setUser({} as User)
    api.defaults.headers.authorization = undefined;
    setAuthorization('')
  }, [])
  return (
    <AuthContext.Provider value={{signed, authorization, user, loading, authenticate, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;