export interface FilterModalProps {
  filterModalVisible: boolean;
  selectedFilter: string;
  onValueChange: (value: string) => void;
  closeModal: () => void;
}
