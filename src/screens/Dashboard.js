import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  SafeAreaView,
  Dimensions,
  ScrollView, // Import ScrollView
} from 'react-native'
import Swipelist from 'react-native-swipeable-list-view'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {

  PieChart,  LineChart
  
} from 'react-native-chart-kit';
import { useCookies } from "react-cookie";


const Dashboard = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const [cookies, setCookie, removeCookie] = useCookies([
    "employee_token",
  ]);
   AsyncStorage.setItem('employee_token', cookies);
console.log(AsyncStorage.getItem('employee_token'))

  const data = [
    {
      name: 'Frontend Development',
      status: '',
    },
    {
      name: 'Backend Development',
      status: '',
    },
    {
      name: 'Blockchain',
      status: '',
    },
    {
      name: 'Documasdasdasdasentation',
      status: '',
    },
    {
      name: 'Fronteasdasdnd Development',
      status: '',
    },
    {
      name: 'asdasdasd Development',
      status: '',
    },
    {
      name: 'Blockchain',
      status: '',
    },
    {
      name: 'Documentation',
      status: '',
    },
    {
      name: 'Frontend Development',
      status: '',
    },
    {
      name: 'Backend Development',
      status: '',
    },
    {
      name: 'Blockchain',
      status: '',
    },
    {
      name: 'Documentation',
      status: '',
    },
    // Add more data items here...
  ]

  const markTaskAsCompleted = (index) => {
    const updatedData = [...data]
    updatedData[index].status = 'Completed'
    setData(updatedData)
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1)
  }

  // Calculate start and end index based on current page and items per page
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const visibleData = data.slice(startIndex, endIndex)

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <View style={[styles.box, styles.box1]} />
        <View style={[styles.box, styles.box2]} />
        <View style={[styles.box, styles.box3]} />
      </View>
      <Text style={styles.header}>Bezier Line Chart</Text>
      {/* <LineChart
        data={{
          labels: ['Tasks'],
          datasets: [
            {
              data: [
                "Deadline"
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width - 16} // from react-native
        height={220}
        
        chartConfig={{
          backgroundColor: 'blue',
          backgroundGradientFrom: 'blue',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      /> */}
    
      <Text style={styles.header}>Pie Chart</Text>
      <PieChart
        data={[
          {
            name: 'Seoul',
            population: 21500000,
            color: 'rgba(131, 167, 234, 1)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
          {
            name: 'Toronto',
            population: 2800000,
            color: '#F00',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
         
          {
            name: 'Moscow',
            population: 11920000,
            color: 'rgb(0, 0, 255)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
        ]}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute 
        ></PieChart>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          <View>
            <Text style={styles.titlee}>RECENT TASKS</Text>
            <View style={styles.searchBar}>
              <TextInput style={styles.searchInput} placeholder="Search" />
            </View>
            <View>
              <Swipelist
                data={visibleData}
                renderRightItem={(task, index) => (
                  <View
                    key={index}
                    style={[styles.cont, index > 0 && styles.gap]}
                  >
                    <Text>
                      {startIndex + index + 1}. {task.name}
                    </Text>

                    <Text style={{ marginLeft: 270, marginTop: -15 }}>
                      Swipe Left
                    </Text>

                    <Icon
                      name="angle-double-left"
                      color="#517fa4"
                      style={{ marginLeft: 350, marginTop: -20 }}
                      size={24}
                    />
                  </View>
                )}
                renderHiddenItem={(task, index) => (
                  <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <TouchableOpacity
                      style={[styles.rightAction, { backgroundColor: 'red' }]}
                      onPress={() => {
                        Alert.alert(
                          'Mark As Completed',
                          task.name,
                          [
                            {
                              text: 'No',
                              style: 'cancel',
                            },
                            {
                              text: 'Yes',
                              onPress: () =>
                                markTaskAsCompleted(startIndex + index),
                            },
                          ],
                          { cancelable: true }
                        )
                      }}
                    >
                      <Text>View Task</Text>
                    </TouchableOpacity>
                  </View>
                )}
                rightOpenValue={200}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: '#fff',
  },
  menuIcon: {
    fontSize: 34,
    paddingHorizontal: 10,
  },
  titlee: {
    textAlign: 'center',

    fontSize: 20,

    margin: 10,

    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sideMenu: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sideMenuItem: {
    paddingVertical: 5,
  },
  sideMenuItemText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  boxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  box: {
    flex: 1,
    height: 50,
    borderRadius: 20,
  },
  box1: {
    backgroundColor: 'red',
    marginRight: 10,
  },
  box2: {
    backgroundColor: 'blue',
    marginRight: 10,
  },
  box3: {
    backgroundColor: 'green',
  },
  tableContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  taskStatus: {
    fontSize: 16,
    marginRight: 10,
  },
  viewTaskButton: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  viewTaskButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  menuIcon: {
    position: 'relative',
    right: 100,
    fontSize: 40,
  },

  cont: {
    height: 30,

    marginVertical: 10,

    backgroundColor: '#fff',

    justifyContent: 'center',

    paddingLeft: 10,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,

      height: 2,
    },

    shadowOpacity: 0.25,

    shadowRadius: 3.84,

    elevation: 5,
  },

  gap: {
    marginBottom: 10,
  },

  rightAction: {
    marginVertical: 10,

    alignItems: 'center',

    flex: 1,

    justifyContent: 'center',

    height: 30,

    backgroundColor: '#fff',
  },
})

export default Dashboard
