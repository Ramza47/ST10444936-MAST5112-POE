import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// The item dishes
const courseData = {
  MainCourse: [
    { label: 'Bobotie - R250', value: 'Bobotie', fee: 250, description: 'A traditional South African dish made with spiced minced meat baked with an egg-based topping.' },
    { label: 'Boerewors - R250', value: 'Boerewors', fee: 250, description: 'A type of sausage from South Africa made primarily from beef, spiced and grilled to perfection.' },
    { label: 'Fajitas - R200', value: 'Fajitas', fee: 200, description: 'Grilled meat (usually chicken or beef) served with sautéed peppers and onions, commonly wrapped in a soft tortilla.' },
    { label: 'Peppermint Crips Tart - R500', value: 'Peppermint Crips Tart', fee: 500, description: 'A South African dessert made with layers of whipped cream, caramel, and crushed peppermint crisp bars.' },
    { label: 'Potjiekos - R400', value: 'Potjiekos', fee: 400, description: 'A slow-cooked stew typically prepared outdoors in a round, cast-iron pot, filled with meats and vegetables.' },
    { label: 'Vegetable Beef Soup - R350', value: 'Vegetable Beef Soup', fee: 350, description: 'A hearty soup made with tender beef chunks, fresh vegetables, and a flavorful broth.' },
    { label: 'Chakalaka - R150', value: 'Chakalaka', fee: 150, description: 'A spicy South African vegetable relish often served with bread, pap, or grilled meat.' },
  ],

  Starter: [
    { label: 'Cape Malay Curry - R300', value: 'Cape Malay Curry', fee: 300, description: 'A flavorful curry made with aromatic spices like cumin, coriander, turmeric, and typically includes lamb or chicken.' },
    { label: 'Sosaties - R350', value: 'Sosaties', fee: 350, description: 'South African kebabs made with marinated meat (often lamb) and skewered with dried apricots, peppers, and onions.' },
    { label: 'Bunny Chow - R150', value: 'Bunny Chow', fee: 150, description: 'A hollowed-out loaf of bread filled with spicy curry, originating from Durban, South Africa.' },
    { label: 'Malva Pudding - R200', value: 'Malva Pudding', fee: 200, description: 'A sweet, sticky pudding from South Africa made with apricot jam and a rich cream sauce.' },
    { label: 'Bobotie Spring Rolls - R275', value: 'Bobotie Spring Rolls', fee: 275, description: 'A fusion dish combining the flavors of bobotie with the crunchiness of spring rolls.' },
  ],
  
  Dessert: [
    { label: 'Milk tart - R90', value: 'Milk tart', fee: 90, description: 'A traditional South African dessert consisting of a sweet pastry crust filled with creamy, cinnamon-flavored milk custard.' },
    { label: 'Koeksisters - R80', value: 'Koeksisters', fee: 80, description: 'Fried dough infused with syrup or honey, with a crispy outside and a sweet, juicy center.' },
    { label: 'Hertzoggies - R85', value: 'Hertzoggies', fee: 85, description: 'Pastry treats filled with sweet coconut and apricot jam.' },
    { label: 'Cremora tart - R100', value: 'Cremora tart', fee: 100, description: 'A no-bake tart made with whipped cream, condensed milk, and a powdered coffee creamer called Cremora.' },
    { label: 'Melkkos and Sago pudding - R80', value: 'Melkkos and Sago pudding', fee: 80, description: 'A creamy milk-based dessert with sago pearls, often topped with cinnamon sugar.' },
  ],
};

const HomePage = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState('Starter');
  const [selectedDish, setSelectedDish] = useState(null); // New state for selected dish
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('starter');
  const [price, setPrice] = useState('');
  const [menu, setMenu] = useState([]);
  const [menuData, setMenuData] = useState(courseData);

  const selectDish = (dish) => {
    setSelectedDish(dish);
  };

  const addMenuItem = () => {
    if (!dishName || !description || !price) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }
    
    const newItem = { dishName, description, course, price };
    setMenuData({
      ...menuData,
      [selectedCategory]: [...menuData[selectedCategory], newItem],
    });
    setMenu([...menu, newItem]);
    navigation.navigate('MenuScreen', { menu: [...menu, newItem] });

    // This clears the input fields after adding the item
    setDishName('');
    setDescription('');
    setPrice('');
  };

  // Function to display dishes based on the selected category
  const displayDishes = () => {
    return menuData[selectedCategory].map((dish, index) => (
      <TouchableOpacity key={index} style={styles.menuItem} onPress={() => selectDish(dish)}>
        <Text>{dish.label}</Text>
      </TouchableOpacity>
    ));
  };

    // Function to calculate average price
  const calculateAveragePrice = () => {
    const dishes = menuData[selectedCategory];
    const total = dishes.reduce((sum, dish) => sum + dish.fee, 0);
    return dishes.length > 0 ? (total / dishes.length).toFixed(2) : 0;
  };

  return ( 
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.logo}>🍽️ SuperHungryTime</Text>
        </View>

        <View style={styles.mainPicture}>
          <Image style={styles.ImageSize} source={require('../img/whimsy.png')} />
        </View>

        {/* Menu Label */}
        <View style={styles.menuLabel}>
          <Text style={styles.menuText}>Menu</Text>
          <Text style={styles.menuNumber}>{menuData[selectedCategory].length}</Text>
        </View>


        {/* Course Selection Buttons */}
        <View style={styles.courseButtons}>
          <Button title="Starters" onPress={() => setSelectedCategory('Starter')} />
          <Button title="Main Course" onPress={() => setSelectedCategory('MainCourse')} />
          <Button title="Dessert" onPress={() => setSelectedCategory('Dessert')} />
        </View>

        {/* Displays the average price*/}
        <View style={styles.averagePrice}>
          <Text>Average Price: R{calculateAveragePrice()}</Text>
        </View>

        {/* Dropdown for selecting dishes */}
        <Picker
          selectedValue={selectedDish}
          style={{ height: 50, width: 250, marginVertical: 20 }}
          onValueChange={(itemValue) => selectDish(itemValue)}
        >
          {menuData[selectedCategory].map((dish, index) => (
            <Picker.Item key={index} label={dish.label} value={dish} />
          ))}
        </Picker>
        {/* Display Dishes Based on Selected Category */}
        <View style={styles.menuItems}>
          <ScrollView>{displayDishes()}</ScrollView>
        </View>

        {/* Display selected dish description */}
        {selectedDish && (
          <View style={styles.selectedDish}>
            <Text style={styles.dishTitle}>{selectedDish.label}</Text>
            <Text style={styles.dishDescription}>{selectedDish.description}</Text>
          </View>
        )}

        <View style={{ padding: 20 }}>
          <Text>Dish Name:</Text>
          <TextInput
            placeholder="Enter Dish Name"
            value={dishName}
            onChangeText={setDishName}
            style={{ borderWidth: 2, marginBottom: 20, padding: 10 }}
          />

          <Text>Description:</Text>
          <TextInput
            placeholder="Enter Description"
            value={description}
            onChangeText={setDescription}
            style={{ borderWidth: 2, marginBottom: 20, padding: 10 }}
          />

          <Text>Price:</Text>
          <TextInput
            placeholder="Enter Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={{ borderWidth: 2, marginBottom: 20, padding: 10 }}
          />

          {/* This navigates the user to the Added Menu screen after clicking the button*/}
          <Button title="Add to Menu" onPress={addMenuItem} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAE0',
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  header: {
    marginVertical: 20,
    alignItems: 'center',
  },

  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },

  mainPicture: {
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ImageSize: {
    width: 200,
    height: 200,
  },

  menuLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 50,
  },

  menuText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },

  menuNumber: {
    fontSize: 22,
    color: '#333',
  },

  courseButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },

  menuItems: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },

  selectedDish: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  dishTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dishDescription: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default HomePage;

// OpenAI. 2024. Chat-GPT (Version 3.5). [Large language model]. Available at: https://chatgpt.com/c/67013ca8-9e08-8013-81f5-34c7965a8b02 [Accessed 2 October 2024].