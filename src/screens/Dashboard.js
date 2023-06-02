

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { PieChart } from 'react-native-chart-kit';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const Dashboard = () => {
  const navigation = useNavigation();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [doke, setDoke] = useState('');
  const [task, setTasks] = useState([]);
    const [rewardedTask, setRewarded] = useState(0);
  const [allTask, setAlltask] = useState(0);
  const [filtereddTasks, setFiltereddTasks] = useState([]);
        const [pending, setPending] = useState(0);
        const [completed, setCompleted] = useState(0);
        const [taskUpdate,setTaskUpdate] = useState(false)

        const API_URL = 'http://192.168.26.131:8000';


  useEffect(() => {
                const fetchData = async () => {
                  try {
                    const token = await AsyncStorage.getItem('employee_token');
                    if (token) {
                      const decodedToken = jwtDecode(token);
                      setDoke(decodedToken);
              
                      const response = await axios.get(`${API_URL}/viewtask`, { withCredentials: true });
                      const filteredTasks = response.data.tasks.filter((task) => task.empName === decodedToken.name);
                      setFiltereddTasks(task);
                      setTasks(filteredTasks);
                      
                      const pendingTasksCount = filteredTasks.reduce((count, task) => {
                        if (task.status === 'Pending') {
                          return count + 1;
                        }
                        return count;
                      }, 0);
            
                      setPending(pendingTasksCount)
            
                      const rewardtasks = filteredTasks.reduce((count, task) => {
                        if (task.status === 'Rewarded') {
                          return count + 1;
                        }
                        return count;
                      }, 0);
            
                      setRewarded(rewardtasks)
            
                      const alltaskks = filteredTasks.reduce((count, task) => {
                       
                          return count + 1;
                        
                      }, 0);
            
                      setAlltask(alltaskks)

                      const completedtasks = filteredTasks.reduce((count, task) => {
                        if (task.status === 'Completed') {
                          return count + 1;
                        }
                        return count;
                      }, 0);
            
                      setCompleted(completedtasks)
                     
                    }
                  } catch (error) {
                    console.log(error);
                  }
                };
              
                fetchData();
              }, []);
              
              useEffect(() => {
                const fetchData = async () => {
                  try {
                    const token = await AsyncStorage.getItem('employee_token');
                    if (token) {
                      const decodedToken = jwtDecode(token);
                      setDoke(decodedToken);
              
                      const response = await axios.get(`${API_URL}/viewtask`, { withCredentials: true });
                      const filteredTasks = response.data.tasks.filter((task) => task.empName === decodedToken.name);
                      setFiltereddTasks(task);
                      setTasks(filteredTasks);
                      
                      const pendingTasksCount = filteredTasks.reduce((count, task) => {
                        if (task.status === 'Pending') {
                          return count + 1;
                        }
                        return count;
                      }, 0);
            
                      setPending(pendingTasksCount)
            
                      const rewardtasks = filteredTasks.reduce((count, task) => {
                        if (task.status === 'Rewarded') {
                          return count + 1;
                        }
                        return count;
                      }, 0);
            
                      setRewarded(rewardtasks)
            
                      const alltaskks = filteredTasks.reduce((count, task) => {
                       
                          return count + 1;
                        
                      }, 0);
            
                      setAlltask(alltaskks)

                      const completedtasks = filteredTasks.reduce((count, task) => {
                        if (task.status === 'Completed') {
                          return count + 1;
                        }
                        return count;
                      }, 0);
            
                      setCompleted(completedtasks)
                     
                    }
                  } catch (error) {
                    console.log(error);
                  }
                };
              
                fetchData();
              }, [taskUpdate]);         

  console.log("vanthuru da plsss", doke)

  

  const markTaskAsCompleted = async (tasks) => {
    try {
      const response = await axios.put(`${API_URL}/updatetaskkk/${tasks._id}`, {
        status: 'Completed',
      });
  
      console.log(response.data);
      setTaskUpdate(true)
  
    } catch (error) {
      console.log(error);
    }
  };
  
  const filterTasks = (status) => {
        if (status === 'all') {
          setFiltereddTasks(task);
        } else {
          const filtered = task.filter((t) => t.status === status);
          setFiltereddTasks(filtered);
        }
      };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const [searchInput, setSearchInput] = useState('');
  console.log("mamae crt ah vanthuru", task)
   const filteredData = filtereddTasks ? filtereddTasks.filter((t) =>
  t.task.toLowerCase().includes(searchInput.toLowerCase())
) : [];

console.log("vaa mamae vaa mamae", filteredData);


const renderRightActions = (task, index) => {
  if (task.status === 'Rewarded') {
    return (
      <TouchableOpacity
        style={[styles.rightAction, { backgroundColor: '#0000FF', width: '50%' }]}
        onPress={() => {
          Alert.alert(
            'Rewarded Task',
            `Task Name: ${task.task}\nTask Description: ${task.taskDescription}\nRewards : ${task.rewards}`,
            [
              {
                text: 'View Certificate',
              },
            ],
            { cancelable: true }
          );
        }}
      >
        <Text style={styles.rightActionText}>View Task</Text>
      </TouchableOpacity>
    );
  }
  if (task.status === 'Pending') {
    return (
      <TouchableOpacity
        style={[styles.rightAction, { backgroundColor: '#0000FF', width: '50%' }]}
        onPress={() => {
          Alert.alert(
            'Mark As Completed',
            `Task Name: ${task.task}\nTask Description: ${task.taskDescription}\nRewards : ${task.rewards}`,
            [
              {
                text: 'No',
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () => markTaskAsCompleted(task, index),
              },
            ],
            { cancelable: true }
          );
        }}
      >
        <Text style={styles.rightActionText}>View Task</Text>
      </TouchableOpacity>
    );
  }
  if (task.status === 'Completed') {
    return (
      <TouchableOpacity
        style={[styles.rightAction, { backgroundColor: '#0000FF', width: '50%' }]}
        onPress={() => {
          Alert.alert(
            'Waiting For Approval',
            `Task Name: ${task.task}\nTask Description: ${task.taskDescription}\nRewards : ${task.rewards}`,
            [
             
              {
                text: 'Ok',
              },
            ],
            { cancelable: true }
          );
        }}
      >
        <Text style={styles.rightActionText}>View Task</Text>
      </TouchableOpacity>
    );
  }
 
  return null; // Return null if the task status is not pending or rewarded
};


  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('employee_token'); // Remove the token from storage
      navigation.navigate('LoginScreen'); // Redirect to LoginScreen
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity> */}
      <View style={styles.chartContainer}>
        <PieChart
          data={[
            {
              name: 'All tasks',
              population: allTask,
              color: '#0000FF',
              legendFontColor: '#7F7F7F',
              legendFontSize: 12,
            },
            {
              name: 'Pending',
              population: pending,
              color: 'rgba(131, 167, 234, 1)',
              legendFontColor: '#7F7F7F',
              legendFontSize: 12,
            },
            {
              name: 'Rewarded',
              population: rewardedTask,
              color: '#55DCF7',
              legendFontColor: '#7F7F7F',
              legendFontSize: 12,
            },
           
            {
              name: 'Completed',
              population: completed,
              color: 'rgb(40, 130, 255)',
              legendFontColor: '#7F7F7F',
              legendFontSize: 12,
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
            <Text style={styles.title}> Tasks</Text>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                value={searchInput}
                onChangeText={setSearchInput}
              />
            </View>
            <View style={styles.align}>
<TouchableOpacity
  style={styles.filterButton}
  onPress={() => filterTasks('all')}
>
  <Text style={styles.filterButtonText}>All</Text>
</TouchableOpacity>
<TouchableOpacity
  style={styles.filterButton}
  onPress={() => filterTasks('Pending')}
>
  <Text style={styles.filterButtonText}>Pending</Text>
</TouchableOpacity>
<TouchableOpacity
  style={styles.filterButton}
  onPress={() => filterTasks('Rewarded')}
>
  <Text style={styles.filterButtonText}>Rewarded</Text>
</TouchableOpacity>
</View> 
            <View>
              {filteredData.map((task, index) => (
                <Swipeable   style={styles.swipe}
                key={index} renderRightActions={() => renderRightActions(task, index)}>
                  <View style={[styles.taskContainer, index > 0 && styles.taskGap]}>
                    <Text style={styles.taskText}>{task.task}</Text>
                    <Text >Status : {task.status}</Text>
                    <Text style={styles.swipeText}>Swipe Left</Text>
                    <Icon
                      name="angle-double-left"
                      color="#0000FF"
                      style={styles.swipeIcon}
                      size={24}
                    />
                  </View>
                </Swipeable>
               ))} 
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
  swipe : {
    width: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    // borderBottom\Width: 1,
    // borderBottomColor: '#ccc',
    position:"relative",
    top:40
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 10,
  },
  logoutButtonText: {
    fontSize: 16,
    color: 'red',
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
    color: '#0000FF',
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
    position: 'relative',
    top: 10,
    color: "#0000FF"
  },
  rightActionText: {
    color: '#fff',
    paddingHorizontal: 10,
    textAlign: 'center'
  },
  buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
      },
      filterButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10,
        marginHorizontal: 5,
        marginLeft: 10,
        width: 100,
        backgroundColor: '#0000FF',
      },
      filterButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
      },
      align : {
        display : 'flex',
        flexDirection : 'row',
      }
});

export default Dashboard;

