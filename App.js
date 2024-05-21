import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MemoProvider, useMemos } from './context/MemoProvider'

import MemoBlank from './components/MemoBlank';
import MemoList from './components/MemoList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function AppNavigator() {
   const { memos } = useMemos();
   return (
      <Stack.Navigator>
         <Stack.Screen name="MemoList" component={memos.length > 0 ? MemoList : MemoBlank} />

      </Stack.Navigator>
   );
}

export default function App() {
  const [ memos, setMemos ] = useState([]);

  useEffect(()=>{
     const loadMemos = async () => {
        try{
          const viewMemos = await AsyncStorage.getItem('@memos');
          if(viewMemos !== null) {
            setMemos(JSON.parse(viewMemos));
          }
        }catch(err){
        console.error('메모를 불러오는데 실패했습니다. 크흑~', err);
        }
     };  
     loadMemos();
  }, []);

  return (
    <MemoProvider>
       <NavigationContainer>
          <AppNavigator />
       </NavigationContainer>
    </MemoProvider>
  );
}