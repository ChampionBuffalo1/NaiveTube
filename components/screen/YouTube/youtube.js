import * as React from "react";
import { View, StyleSheet, Button, TextInput } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

export default function App() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [value, setValue] = React.useState("");

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        style={{
          borderColor: "gray",
          justifyContent: "center",
          borderWidth: 1,
          height: 40,
          borderRadius: 21,
          paddingLeft: 10,
          marginBottom: 50,
        }}
      />

      <Video
        ref={video}
        style={styles.video}
        source={{
          uri:
            "https://earnestbronzeopentracker.arkhamknight1.repl.co/streamV/GPVsHOlRBBI",
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={setStatus}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
}

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
});
