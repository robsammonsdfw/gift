import React, { createContext, useState, ReactNode, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserTypeContext {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const defaultUserType: UserTypeContext = {
  userId: '',
  setUserId: () => {}, 
  token: '',
  setToken: () => {}
};

const UserType = createContext<UserTypeContext>(defaultUserType);

interface UserContextProps {
  children: ReactNode;
}

interface JwtPayload {
  userId: string;
}

const UserContext = ({ children }: UserContextProps) => {
  const [token, setToken] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        if (storedToken) {
          console.log('Token found in AsyncStorage:', storedToken);
          setToken(storedToken);
          const decodedToken = jwtDecode<JwtPayload>(storedToken);
          setUserId(decodedToken.userId);
          console.log('Decoded userId:', decodedToken.userId);
        } else {
          console.log('No token found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching token from AsyncStorage:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserType.Provider value={{ token, setToken, userId, setUserId }}>
      {children}
    </UserType.Provider>
  );
};

export { UserType, UserContext };