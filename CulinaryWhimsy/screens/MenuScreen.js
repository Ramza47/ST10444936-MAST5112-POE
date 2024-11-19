import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const MenuScreen = ({ route, navigation }) => {
  const [menu, setMenu] = useState(route.params.menu);

  // Added a function to remove menu items
  const removeMenuItem = (index) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to remove this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedMenu = [...menu];
            updatedMenu.splice(index, 1); 
            setMenu(updatedMenu);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Chef's Menu</Text>
      <Text>Total Menu Items: {menu.length}</Text>

      <FlatList
        data={menu}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => ( 
          <View style={styles.menuItem}>
            <View>
              <Text>Dish: {item.dishName}</Text>
              <Text>Description: {item.description}</Text>
              <Text>Course: {item.course}</Text>
              <Text>Price: R{item.price}</Text>
            </View>
            {/* Remove Button */}
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeMenuItem(index)} 
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Back Button to navigate to the previous screen */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    marginVertical: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: '#FF6347',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF6347',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default MenuScreen;
