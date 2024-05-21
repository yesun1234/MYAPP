import React, { createContext, useState, useContext } from 'react'

const MemoContext = createContext();

export const useMemos = () => useContext(MemoContext);

export const MemoProvider = ({ children }) => {
  const [memos, setMemos] = useState([]);
  const [ isWriting, setIsWriting ] = useState(false);
  const handleWritePress = () => {
    setIsWriting(true);
  } 
  const handleClose = () => {
    setIsWriting(false);
  }
  return (
    <MemoContext.Provider value={{
        memos,
        setMemos,
        isWriting,
        setIsWriting,
        handleWritePress,
        handleClose
    }}>
      {children}
    </MemoContext.Provider>    
  );
};