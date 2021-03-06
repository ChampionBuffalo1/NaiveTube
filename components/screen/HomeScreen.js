import React from 'react';
import { Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { Home } from './data/metadata';

export default function HomeScreen({ navigation: { navigate } }) {
  const render = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigate(item['navigate'])}>
        <Card>
          {item.title && <Card.Title>{item.title}</Card.Title>}
          <Card.Divider />
          {item.desc && <Text style={styles.text}>{item.desc}</Text>}
          {item.img && (
            <Card.Image
              source={{
                uri: item.img,
              }}
            />
          )}
        </Card>
      </TouchableOpacity>
    );
  };

  return <FlatList data={Home} renderItem={render} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: {
    marginBottom: 10,
  },
});
