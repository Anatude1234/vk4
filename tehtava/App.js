import React, { useEffect, useState } from 'react';
import { View, Text, Button,  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    
    getData();
  }, []);

  const getData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('personNames');
      if (storedData !== null) {
        
        const parsedData = JSON.parse(storedData);
        setItems(parsedData);
      } else {
        
        setItems([]);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const storeData = async (data) => {
    try {
      const jsonString = JSON.stringify(data);
      await AsyncStorage.setItem('personNames', jsonString);
      console.log('Data stored successfully.');
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  const handleSaveData = () => {
    const newData = ['Matti', 'Meikalaine']; 
    storeData(newData);
    getData(); 
  };

  return (
    <View>
      <Text>Data stored in AsyncStorage:</Text>
      {items.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
      <Button title="Save Data" onPress={handleSaveData} />
    
      { <Button title="Clear Data" onPress={clearData} /> }
    </View>
  );
};

export default App;