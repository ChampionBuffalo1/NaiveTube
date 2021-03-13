import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Card } from "react-native-elements";
import VideoPlayer from "expo-video-player";

const height = Dimensions.get("screen").height / 3;

export default function YouTubePlayer(props) {
  const { id, title, thumbnail } = props.route.params;
  const [suggest, setSuggest] = React.useState({});

  React.useEffect(() => {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&key=AIzaSyC_eIBiYeknCcthyxY3mGJWfClYHkVYhGM&maxResults=10`;
    fetch(url)
      .then((r) => r.json())
      .then((r) => setSuggest(r));
  }, [id]);

  return (
    <View style={styles.container}>
      <Text style={styles.custom}>{title}</Text>
      <VideoPlayer
        height={height}
        videoBackground="transparent"
        videoProps={{
          posterSource: { uri: thumbnail },
          usePoster: true,
          resizeMode: "contain",
          shouldPlay: true,
          source: {
            uri: `https://earnestbronzeopentracker.arkhamknight1.repl.co/streamV/${id}`,
          },
          isLooping: false,
          rate: 1.0,
          shouldCorrectPitch: true,
        }}
        inFullscreen
      />
      {suggest.hasOwnProperty("items") && (
        <DisplaySuggestion
          data={suggest}
          navigate={props.navigation.navigate}
        />
      )}
    </View>
  );
}
const DisplaySuggestion = ({ data, navigate }) => {
  const render = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigate("YouTubePlayer", {
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
          })
        }
      >
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
  const snippet = data.items.filter((x) => x.snippet);
  return (
    <FlatList
      data={snippet}
      renderItem={render}
      keyExtractor={(item) => item.id.videoId}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  custom: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  channelName: {
    fontSize: 10,
  },
});
