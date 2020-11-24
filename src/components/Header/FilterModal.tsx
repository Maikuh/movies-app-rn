import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Modal, Pressable, View, Text } from "react-native";

type FilterModalProps = {
  filterModalVisible: boolean;
  selectedFilter: string;
  onValueChange: any;
  closeModal: any;
};

export default function FilterModal({
  filterModalVisible,
  selectedFilter,
  closeModal,
  onValueChange,
}: FilterModalProps) {
  return (
    <Modal
      animationType="fade"
      visible={filterModalVisible}
      onRequestClose={() => {
        closeModal();
      }}
      statusBarTranslucent
      transparent
    >
      <Pressable
        onPressOut={() => closeModal()}
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "rgba(35,35,35,0.5)",
        }}
      >
        <View style={{ backgroundColor: "#fafafa", padding: 12, width: "90%" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Sort By</Text>
          <Picker
            selectedValue={selectedFilter}
            onValueChange={(value) => {
              onValueChange(value.toString());
              closeModal();
            }}
          >
            <Picker.Item value="original_title.asc" label="Title" />
            <Picker.Item value="release_date.desc" label="Release Date" />
            <Picker.Item value="vote_average.desc" label="Ratings" />
          </Picker>
        </View>
      </Pressable>
    </Modal>
  );
}
