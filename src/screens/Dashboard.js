// import React from 'react'
// import Background from '../components/Background'
// import Logo from '../components/Logo'
// import Header from '../components/Header'
// import Paragraph from '../components/Paragraph'
// import Button from '../components/Button'


// export default function Dashboard({ navigation }) {
//   return (
//     <Background>
//       <Logo />
//       <Header>Let’s start</Header>
//       <Paragraph>
//         Your amazing app starts here. Open you favorite code editor and start
//         editing this project.
//       </Paragraph>
//       <Button
//         mode="outlined"
//         onPress={() =>
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'Landing' }],
//           })
//         }
//       >
//         Logout
//       </Button>
//     </Background>
//   )
// }
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons';

const Dashboard = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSideMenu}>
          <Text style={styles.menuIcon}>=</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Dashboard</Text>
      </View>
      {isSideMenuOpen && (
        <View style={styles.sideMenu}>
          <TouchableOpacity style={styles.sideMenuItem}>
            <Text style={styles.sideMenuItemText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sideMenuItem}>
            <Text style={styles.sideMenuItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.boxContainer}>
          <View style={[styles.box, styles.box1]} />
          <View style={[styles.box, styles.box2]} />
          <View style={[styles.box, styles.box3]} />

        </View>
        <View style={styles.tableContainer}>
          <View style={styles.searchBar}>
            <TextInput style={styles.searchInput} placeholder="Search" />
          </View>
          <View style={styles.taskRow}>
            <Text style={styles.taskText}>Frontend Task</Text>
            <Text style={styles.taskStatus}>Completed</Text>
            <TouchableOpacity style={styles.viewTaskButton}>
              <Text style={styles.viewTaskButtonText}>View Task</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.taskRow}>
            <Text style={styles.taskText}>Frontend Task</Text>
            <Text style={styles.taskStatus}>Pending</Text>
            <TouchableOpacity style={styles.viewTaskButton}>
              <Text style={styles.viewTaskButtonText}>View Task</Text>
            </TouchableOpacity>
          </View>
          {/* Add more sample tasks here */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    top:40
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: '#f2f2f2',
  },
  menuIcon: {
    fontSize: 34,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sideMenu: {
    backgroundColor: '#e3e3e3',
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
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  viewTaskButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  menuIcon: {   
    position:"relative",
    right:100,
    fontSize: 40
  }
});

export default Dashboard; 
