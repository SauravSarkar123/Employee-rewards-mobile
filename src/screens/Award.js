import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Award = () => {
  const API_URL = 'http://192.168.26.131:8000';
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await axios.get(`${API_URL}/getawards`, { withCredentials: true });
        console.log(response.data);
        setAwards(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAwards();
  }, []);

  const awardss = () => {
    console.log(awards);
  };

  return (
    <View>
      <Text>Award</Text>
      <TouchableOpacity onPress={awardss}>
        <Text>awARDEDDD</Text>
      </TouchableOpacity>
      {awards.filter((award, index) => (
        <Text key={index}>{award.name}</Text>
      ))}
    </View>
  );
};

export default Award;
