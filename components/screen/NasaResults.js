import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  ScrollView
} from 'react-native';
//import AppLoading from 'expo-app-loading';
import Spinner from 'react-native-loading-spinner-overlay';
import { Card } from 'react-native-elements';
const width = Dimensions.get('window').width;

export default function NasaAPOD() {
  const [data, setData] = useState(null);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const url = `https://api.nasa.gov/planetary/apod?api_key=KRuraN7dvsgWEXNBffbHzKdZCoBCIdyhxdHduxxj&hd=true`;
    fetch(url)
    .then(r => r.json())  
    .then(r  => setData(r) && setLoading(false))
    .catch(console.error);
  }, [date]);

  return loading ? (  
        <View style={styles.container}>
          <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
        /> 
      </View>
      ) : (
      <ScrollView>
        <Card>
            <Card.Title>{data.title}</Card.Title>
            <Card.Divider />
            <Card.Image
             source={{
              uri: data.hdurl ,
             }}
            />
            <Card.Divider />
            <Text style={styles.channelName}>{data.explanation}</Text>
        </Card>
      </ScrollView>
    ) 

}

//https://gifdownload.net/wp-content/uploads/2019/05/gif-loader-6.gif

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
   },
   search: {
    borderRadius: 21,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    margin: 20,
   },
   searchButton: {
    borderRadius: 60,
    marginLeft: width / 2,
   },
   loadImg: {
    height: 320,
    width: 250
   },
});
