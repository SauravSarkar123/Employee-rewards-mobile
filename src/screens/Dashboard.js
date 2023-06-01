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

  console.log("vanthuru da plsss", doke)

  useEffect(async()=>{
    const cookiee = await AsyncStorage.getItem("employee_token");
    console.log("Cookie",cookiee)
    const toke = jwtDecode(cookiee)
    console.log("asdddddddddddddddddddddddd",toke.name)

    axios
    .get(`${API_URL}/viewtask`,
    { withCredentials: true })
    .then((response) => {
      setTasks(
        response.data.tasks.filter((tasks) => tasks.empName == toke.name)
      );
      console.log(response.data.tasks)
      console.log(tasks)

    })
    .catch((error) => {
      console.log(error);
    });
  },[])



  const markTaskAsCompleted = (index) => {
    const updatedTasks = [...task];
    updatedTasks[index].status = 'Completed';
    setTasks(updatedTasks);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const [searchInput, setSearchInput] = useState('');
  console.log("mamae crt ah vanthuru", task)
  const filteredData = task ? task.filter((task) =>
  task.task.toLowerCase().includes(searchInput.toLowerCase())
) : [];

console.log("vaa mamae vaa mamae", filteredData);

  // Calculate start and end index based on current page and items per page
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const visibleData = data.slice(startIndex, endIndex)

  const renderRightActions = (task, index) => (
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
              onPress: () => markTaskAsCompleted(index),
            },
          ],
          { cancelable: true }
        );
      }}
    >
      <Text style={styles.rightActionText}>View Task</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pie Chart</Text>
      <View style={styles.chartContainer}>
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
            backgroundColor: '#eff3ff',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft={15}
          absolute
        />
      </View>

      <SafeAreaView style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          <View>
            <Text style={styles.title}>Recent Tasks</Text>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                value={searchInput}
                onChangeText={setSearchInput}
              />
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  chartContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
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
  taskContainer: {
    height: 50,
    marginVertical: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskGap: {
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    fontWeight:"bolder"
  },
  swipeText: {
    position: 'absolute',
    top: '50%',
    right: 60,
    transform: [{ translateY: -8 }],
    color: '#888',
  },
  swipeIcon: {
    position: 'absolute',
    top: '50%',
    right: 20,
    transform: [{ translateY: -12 }],
  },
  rightAction: {
    flex: 1,
    justifyContent: 'center',
    height: '70%',
    backgroundColor: 'red',
    position: 'relative',
    top: 10,
  },
  rightActionText: {
    color: '#fff',
    paddingHorizontal: 12,
  },
});

export default Dashboard;
