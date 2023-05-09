import { useState } from 'react';
import { TextInput, DatePickerAndroid } from 'react-native';
export function DOJValidator(openDatePicker) {
const openDatePicker = async () => {
  try {
    const { action, year, month, day } = await DatePickerAndroid.open({
      date: DOJ ? new Date(DOJ) : new Date(),
    });
    if (action !== DatePickerAndroid.dismissedAction) {
      const selectedDate = new Date(year, month, day);
      setDOJ(selectedDate.toDateString());
    }
  } catch ({ code, message }) {
    console.warn('Cannot open date picker', message);
  }
}}