import React from 'react'
import { StyleSheet, View, Image, Text, Modal, TouchableOpacity } from 'react-native';
import { useMemos } from '../context/MemoProvider';
import MemoWrite from './MemoWrite';

const MemoBlank = () => {
  const { handleWritePress, isWriting, handleClose } = useMemos();

  return (
    <View style={styles.container}>
        <Text style={styles.desc}>메모가 없슴돠!</Text>
        <Image
           source={require('../assets/0002.png')}
           style={styles.image}
           resizeMode='contain'
        />   
        <TouchableOpacity style={styles.button} onPress={handleWritePress}>
            <Text stlye={styles.buttonText}>글쓰기</Text>
        </TouchableOpacity>
        <Modal visible={isWriting} animationType="slide" 
               onRequestClose={handleClose}>
            <MemoWrite onClose={handleClose} />        
        </Modal> 
    </View>
  )
}

export default MemoBlank
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image:{
       width:'80%',
       marginTop: 20
    },
    desc: {
        fontSize:30,
        color:'#E91E63',
        fontWeight:'bold'
    }, 
    buttonText: {
        color:'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    button: {
        width: '80%',
        alignItems:'center',
        backgroundColor:'#3F51B5',
        padding: 10,
        margin: 10,
        borderRadius: 5
    },

})