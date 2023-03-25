import { createContext, useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import * as jwt from 'jsonwebtoken';


const defaultAuthContext = {
  isAuthenticated: false,
  currentUser: null,
  register: null,
  login: null,
  logout:null
}

interface Props {children:React.ReactNode}

const AuthContext = createContext(defaultAuthContext)
export const useAuth = useContext(AuthContext)

export const AuthProvider:React.FC<Props> = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [payload, setPayload] = useState(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const checkToken = async () =>{
      const authToken = localStorage.getItem("authToken")
      if(!authToken){
        setIsAuthenticated(false)
        setPayload(null)
        return
      }

      setIsAuthenticated(true)
      const tempPayload = jwt.decode(authToken)
      console.log(tempPayload)
    } 
  },[]) 

  return(
    <AuthContext.Provider value={{isAuthenticated, currentUser:payload, login:null, register:null, logout:null}}>

    </AuthContext.Provider>
  )

}