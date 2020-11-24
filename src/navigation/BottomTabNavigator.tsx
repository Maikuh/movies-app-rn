import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FavoritesScreen from "../screens/FavoritesScreen";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import { FavoritesProvider } from "../contexts/favorites.context";

function TabBarIcon(props: { name: string; color: string }) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <FavoritesProvider>
      <BottomTab.Navigator>
        <BottomTab.Screen
          name="Movies"
          component={DiscoverMoviesNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="film" color={color} />,
          }}
        />
        <BottomTab.Screen
          name="Favorites"
          component={FavoriteMoviesNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="heart" color={color} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </FavoritesProvider>
  );
}

const DiscoverMoviesStack = createStackNavigator();

function DiscoverMoviesNavigator() {
  return (
    <DiscoverMoviesStack.Navigator>
      <DiscoverMoviesStack.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          headerTitle: "Discover",
          headerRightContainerStyle: { padding: 12 },
        }}
      />
      <DiscoverMoviesStack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
      />
    </DiscoverMoviesStack.Navigator>
  );
}

const FavoriteMoviesStack = createStackNavigator();

function FavoriteMoviesNavigator() {
  return (
    <FavoriteMoviesStack.Navigator>
      <FavoriteMoviesStack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ headerTitle: "Favorites" }}
      />
      <FavoriteMoviesStack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
      />
    </FavoriteMoviesStack.Navigator>
  );
}

const styles = StyleSheet.create({});
