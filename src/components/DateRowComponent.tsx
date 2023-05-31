import React from 'react';
import { Platform, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { IStore, RootContext } from '../stores/rootStore';
import { Routes } from '../routes/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteParams } from '../routes/types';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants';
import RNDateTimePicker from "@react-native-community/datetimepicker";

type RoutePropType = StackNavigationProp<RouteParams, Routes.Home>;

const DateRowComponent: React.FC = () => {
  const rootStore = React.useContext<IStore>(RootContext);
  const user = rootStore.getUser();
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  // change to rootStore.getDate
  const [date, setDate] = React.useState(new Date());

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    if (Platform.OS === "android") setShowDatePicker(false);
    setDate(currentDate);
    rootStore.setDate(currentDate);
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.actionButton} onPress={() => setShowDatePicker(true)}>
        <IconButton icon="chevron-left" size={24} style={{marginHorizontal: 0}}/>
        <Text style={styles.actionButtonContent}>
          {/* check if the day is yesterday / today / tomorrow and also check if its the same month and year */}
          {date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear() ? 'Today' : 
          date.getDate() === (new Date().getDate() - 1) && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear() ? 'Yesterday' :
          date.getDate() === (new Date().getDate() + 1) && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear() ? 'Tomorrow' :
          date.toDateString()}
        </Text>
        <IconButton icon="chevron-right" size={24} style={{marginHorizontal: 0}}/>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.selectDateButton}>Select date</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <RNDateTimePicker
          display='spinner'
          value={date}
          onChange={onChangeDate}
          mode='date'
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
  }
});

export default DateRowComponent;