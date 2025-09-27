
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./styles"
import appColors from "../../../theme/appColors";

const FilterCategoryModal = ({
  visible,
  filters,
  selectedFilter,
  onClose,
  onSelectFilter,
}) => {
  if (!visible) return null;

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.filterDropdown}>
          <Text style={styles.filterTitle}>Filter by Category</Text>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterItem,
                selectedFilter === filter.key && styles.filterItemActive,
              ]}
              onPress={() => {
                onSelectFilter(filter.key);
                onClose();
              }}
            >
              <Icon
                name={filter.icon}
                size={17}
                color={
                  selectedFilter === filter.key
                    ? appColors.secondary
                    : appColors.primary
                }
              />
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter.key && styles.filterTextActive,
                ]}
              >
                {filter.label}
              </Text>
              {selectedFilter === filter.key && (
                <Icon
                  name="checkmark"
                  size={18}
                  color={appColors.white}
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.closeFilterButton}
            onPress={onClose}
          >
            <Text style={styles.closeFilterText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FilterCategoryModal;
