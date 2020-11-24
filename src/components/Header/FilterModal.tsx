import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Modal, Pressable, View, Text, StyleSheet } from "react-native";
import { FilterModalProps } from "../../typings/FilterModal.interface";

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
      onRequestClose={closeModal}
      statusBarTranslucent
      transparent
    >
      <Pressable onPressOut={() => closeModal()} style={styles.modalBackdrop}>
        <View style={styles.contentContainer}>
          <Text style={styles.header}>Sort By</Text>
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

const styles = StyleSheet.create({
  contentContainer: { backgroundColor: "#fafafa", padding: 12, width: "90%" },
  header: { fontWeight: "bold", fontSize: 18 },
  modalBackdrop: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgba(35,35,35,0.5)",
  },
});
