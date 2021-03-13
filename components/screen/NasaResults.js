import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

export default function NasaAPOD() {
  const [data, setData] = useState(null);
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const Separator = () => <View style={styles.separator} />;

  useEffect(() => {
    const url = `https://api.nasa.gov/planetary/apod?api_key=KRuraN7dvsgWEXNBffbHzKdZCoBCIdyhxdHduxxj&hd=true`;
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        setData(r);
        setLoading(false);
      })
      .catch(setError);
  }, [date]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
      </View>
    );
  } else {
    if (error) {
      return <Text>ERROR: {error.toString()}</Text>;
    } else {
      return (
        <ScrollView>
          <Text style={styles.title}>{data.title}</Text>
          <Separator />
          <Image
            style={styles.img}
            source={{
              uri: data.hdurl,
            }}
          />
          <Separator />
          <Text style={styles.desc}>{data.explanation}</Text>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    alignItems: "center",
  },
  img: {
    height: 250,
    width: 353,
  },
  separator: {
    marginVertical: 10,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
