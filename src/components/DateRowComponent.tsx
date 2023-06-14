import React from 'react';
import { Platform, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { Colors } from '../constants';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useFoodStore } from '../hooks/useFoodsStore';
import { classifyDateRelativeToToday, getNextDay, getPrevDay } from '../utils/utils';

const DateRowComponent: React.FC = () => {
  const { selectedDate, selectDate } = useFoodStore();
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const enableNextDayButton = selectedDate.getDate() < new Date().getDate();

  const onChangeDate = (_: DateTimePickerEvent, date: Date | undefined) => {
    const currentDate = date || new Date();
    if (Platform.OS === 'android') setShowDatePicker(false);
    selectDate(currentDate);
  };

  return (
    <View style={styles.row}>
      <View style={styles.actionButton}>
        <IconButton
          icon="chevron-left"
          size={24}
          style={{ marginHorizontal: 0 }}
          iconColor={Colors.title}
          onPress={() => selectDate(getPrevDay(selectedDate))}
        />
        <Text style={styles.actionButtonContent} onPress={() => setShowDatePicker(true)}>
          {classifyDateRelativeToToday(selectedDate)}
        </Text>
        <IconButton
          icon="chevron-right"
          size={24}
          iconColor={enableNextDayButton ? Colors.title : Colors.foodButtonGray}
          disabled={!enableNextDayButton}
          style={{ marginHorizontal: 0 }}
          onPress={() => {
            const nextDate = getNextDay(selectedDate);
            if (nextDate) {
              selectDate(getNextDay(selectedDate));
            }
          }}
        />
      </View>

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.selectDateButton}>Select date</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <RNDateTimePicker
          display="spinner"
          value={selectedDate}
          onChange={onChangeDate}
          mode="date"
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: '1%',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  actionButtonContent: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectDateButton: {
    color: Colors.blueButtonMain,
    fontSize: 14,
  },
});

export default DateRowComponent;
