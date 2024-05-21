import React from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native';

const MemoList = ({ memos, index }) => {
   const backgroundColors = ['#3F51B5', '#E91E63', '#FFC107', '#009688', '#CDDC39'];
   const memoBox = ({item, index}) => (
        <View style={[styles.card, { backgroundColor: backgroundColors[index % backgroundColors.length] }]}>
           <Text style={styles.wDate}>{item.wdate}</Text>
           <Text style={styles.white}>{item.title}</Text>
           <Text style={styles.white}>{item.content}</Text>
        </View>
  ); 
   const blankBox = (<View style={styles.blankCard} />);

    return (
    <View style={{flex:1}}>
        <Text>My Memo</Text>
       <FlatList
           data={memos}
           renderItem={({item, index})=> {
               const isLastItem = index === memos.length -1;
               const isOdd = memos.length % 2 !== 0;
               if(isOdd && isLastItem) {
                    return(
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            {memoBox({item, index})}  
                            {blankBox}
                        </View>  
                    )
                }else{
                    return memoBox({item, index});
                }
           }}
           keyExtractor={item => item.id}
           numColumns={2}
           columnWrapperStyle={{justifyContent:'space-between'}}
       />    
    </View>
  )
}

export default MemoList
const styles = StyleSheet.create({
   card: {
      flex: 1,
      margin: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      color:'#fff'
   },
   wDate: {
      textAlign:'right',
      fontSize: 12,
      fontStyle: 'italic',
      color:'#eee'
   },
   white: {
      color:'#fff'
   },
   blankCard: {
      flex: 1,
      margin:10,
      padding:10
   }
});