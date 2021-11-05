import * as React from 'react';
import { StyleSheet ,Image,FlatList, Pressable} from 'react-native';


import styles   from './styles';
import EditScreenInfo from '../EditScreenInfo';
import { Text, View } from '../Themed';
import Navigation from '../../navigation';
import { useNavigation } from '@react-navigation/core';


interface HomeCategoryProps{

 category:{
      id:string,
      title:string,
      movies:{
        id:string,
        poster:string



      }[]
      
 }




}


const HomeCategory =(props :HomeCategoryProps) =>
{

  const {category} =props;
  const navigation=useNavigation();

  const onMoviePress =(movies)=>{

    navigation.navigate('MovieDetails',{id:movies.id});


  }


  return(
    <>
      
      <Text style={styles.title}>{category.title}</Text>
      <FlatList
        data={category.movies}
        
        renderItem={({item}) =>(
          <Pressable onPress={()=> onMoviePress(item)}>
          <Image style={styles.image}  source= {{uri : item.poster}} />
          </Pressable>
        )}

          horizontal

      />



    </>



  );

}


export default HomeCategory;