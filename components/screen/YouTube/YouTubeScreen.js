import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Text
} from 'react-native';

import { Button, Card } from 'react-native-elements';
const width = Dimensions.get('window').width;

export default function YouTubeSearchMock({ navigation: { navigate } }) {
  const [value, setValue] = useState('');
  const [data, setData] = useState({});
  const yt = async () => {

    /**
     * [Search docs](https://developers.google.com/youtube/v3/docs/search/list)
     * Search for similar videos
     * https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=rfscVS0vtbw&type=video&key=AIzaSyC_eIBiYeknCcthyxY3mGJWfClYHkVYhGM&maxResults=25
     * 
     * [Video Search Docs](https://developers.google.com/youtube/v3/docs/videos/list)
     * Search for video stats (Like, Dislike, Comment)
     * https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=AIzaSyC_eIBiYeknCcthyxY3mGJWfClYHkVYhGM&id=rfscVS0vtbw
     */
    // this used to search for video using a string
    const url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyC_eIBiYeknCcthyxY3mGJWfClYHkVYhGM&q=${encodeURI(value)}&type=video&order=viewCount&part=snippet&maxResults=25`;
    await fetch(url)
    .then(r => r.json())  
    .then(r  => setData(r));
  }
  
  const render = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigate('YouTubePlayer', {
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url
          })
        }>
        <Card>
          <Card.Image
            source={{
              uri: item.snippet.thumbnails.high.url,
            }}
          />
          <Card.Title>{item.snippet.title}</Card.Title>
          <Card.Divider />
          <Text style={styles.channelName}>{item.snippet.channelTitle}</Text>
        </Card>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <TextInput
        placeholder="Search youtube"
        value={value}
        onChangeText={setValue}
        style={styles.search}
      />
      <Button buttonStyle={styles.searchButton} title="Search" onPress={yt}/>
    {
      data.hasOwnProperty("items") && (
        <FlatList
        data={data.items}
        renderItem={render}
        keyExtractor={(item) => item.id.videoId}
      />     
      )
    }
    </View>
  );
}


const styles = StyleSheet.create({
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
  channelName: {
    fontSize: 10,
  },
});