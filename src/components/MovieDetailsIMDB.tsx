import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";

export default function MovieDetailsIMDB({ imdbId }: { imdbId: string }) {
  if (!imdbId) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <FontAwesome
        style={styles.iconBackground}
        name="square"
        color="#232323"
        size={22}
      />
      <FontAwesome style={styles.icon} name="imdb" color="#f3ce13" size={24} />
      <Text
        style={styles.link}
        onPress={() => {
          Linking.openURL(`https://www.imdb.com/title/${imdbId}`);
        }}
      >
        View in IMDb
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginLeft: 8,
    marginTop: 8,
    marginBottom: 24,
  },
  iconBackground: { marginRight: 6, position: "absolute" },
  icon: { marginRight: 6 },
  link: { fontSize: 20, color: "dodgerblue" },
});
