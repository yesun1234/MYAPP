import React, { useState } from 'react'
import { View, TextInput, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useMemos } from '../context/MemoProvider';
import moment from 'moment-timezone';

const MemoWrite = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const navigation = useNavigation();
  const { memos, setMemos } = useMemos();

  /* 날짜 */
  const date = new Date();
  const kDate = moment(date).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm');
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
    });
    if(!result.canceled) {
       setImage(result.uri);
    }
  };

  const saveMemo = async () => {
     const newMemo = {
        id: Date.now().toString(),
        wdate: kDate,
        title,
        content,
        image
     };

     const updateMemo = [...memos, newMemo];
     setMemos(updateMemo);
     console.log(memos);
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>
            메모 남기기
        </Text>
        <Text>{kDate}</Text>
        <TextInput
           placeholder='제목'
           value={title}
           onChangeText={setTitle}
           style={styles.input}
        />
        <TextInput 
           placeholder='내용'
           value={content}
           onChangeText={setContent}
           style={[styles.input, styles.multilineInput]}
        />    
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>이미지 선택</Text>
        </TouchableOpacity>
        {image && <Image source={{uri: image}} 
                  style={{width:200, height:200, marginVertical: 10}} />}
        <View style={styles.btnbox}>          
            <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
               <Text style={styles.imageButtonText}>닫기</Text>
            </TouchableOpacity>    
            <TouchableOpacity style={styles.buttonSubmit} onPress={saveMemo}>
               <Text style={styles.imageButtonText}>전송</Text>
            </TouchableOpacity>     
        </View> 
    </View>    
  )
}

export default MemoWrite
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:20,
        backgroundColor:'#f3fdf9'
    },
    title: {
        marginTop:30,
        marginBottom:20,
        fontSize:20,
        fontWeight:'bold'
    },
    input: {
        width: '100%',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor:'gray',
        borderRadius: 5
    },
    multilineInput: {
        height:100,
        textAlignVertical: 'top' //텍스트가 위에서 부터 써지도록
    },
    imageButton: {
        width: '80%',
        alignItems:'center',
        backgroundColor:'#3F51B5',
        padding: 10,
        margin: 10,
        borderRadius: 5
    },
    imageButtonText: {
        color:'white',
        fontSize: 16
    },
    btnbox:{
      flex: 1,
      justifyContent: 'space-between',
      paddingTop:20,
      paddingBottom:20,
      flexDirection: 'row',
      alignItems: 'flex-start'
    },
    buttonClose:{
      width:'45%',
      backgroundColor:'#E91E63',
      padding:10,
      borderRadius:5,
      marginRight:5
    },
    buttonSubmit:{
        width:'45%',
        backgroundColor:'#009688',
        padding:10,
        borderRadius:5,
        marginLeft:5
    }
})