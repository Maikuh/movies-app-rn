import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { MovieDetailsIMDBProps } from "../../typings/MovieDetails.interface";

export default function MovieDetailsIMDBLink({
  imdbId,
  iconSize = 24,
  fontSize = 20,
}: MovieDetailsIMDBProps) {
  if (!imdbId) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FontAwesome
        style={styles.iconBackground}
        name="square"
        color="#232323"
        size={iconSize - 2}
      />
      <FontAwesome
        style={styles.icon}
        name="imdb"
        color="#f3ce13"
        size={iconSize}
      />
      <Text
        style={{ ...styles.link, fontSize }}
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
