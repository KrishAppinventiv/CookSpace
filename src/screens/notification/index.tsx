import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {vh, vw} from '../../theme/dimensions';
import {colors} from '../../theme';
import { arrayUnion, doc, getDoc, getFirestore, onSnapshot, updateDoc } from '@react-native-firebase/firestore';
import { getAuth } from '@react-native-firebase/auth';
import styles from './styles';


const Notification = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const userId = getAuth().currentUser?.uid;
  const notifyData = [{
    head: 'New Recipe Added!',
    description: 'Check out our latest recipe for a delicious homemade chocolate cake!',
    time: 10,
    status: 'unread'
  },{
    head: 'Recipe Updated!',
    description: 'We’ve added new ingredients and instructions to the classic spaghetti carbonara recipe.',
    time: 15,
    status: 'read'
  },{
    head: 'Special Recipe Alert!',
    description: 'A new vegan recipe for avocado toast with a twist is now available. Try it out!',
    time: 12,
    status: 'read'
  },{
    head: 'Recipe of the Day!',
    description: 'Today’s featured recipe: Fresh Lemonade. Perfect for a summer day!',
    time: 12,
    status: 'unread'
  },{
    head: 'Cooking Tip: Save Time!',
    description: 'Learn how to prep your ingredients quickly with these 5 kitchen hacks for faster cooking!',
    time: 12,
    status: 'read'
  }];

const storeNotification = async (notification) => {
  const db = getFirestore();
  if (userId) {
    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        notifications: arrayUnion(notification),
      });
      console.log('Notification stored successfully!');
    } catch (error) {
      console.error('Error storing notification:', error);
    }
  } else {
    console.log('User is not logged in');
  }
};


useEffect(() => {
  const interval = setInterval(() => {
    const randomNotification = notifyData[Math.floor(Math.random() * notifyData.length)];
    storeNotification(randomNotification);
  }, 5000);

  return () => clearInterval(interval); 
}, []);

  


  useEffect(() => {
    const fetchNotifications = () => {
      const db = getFirestore();
      if (userId) {
        const userDocRef = doc(db, 'users', userId);

      
        const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists) {
            const notifications = docSnapshot.data().notifications || [];
            setNotifications(notifications); 
          }
        });

        return unsubscribe;
      }
    };

    const unsubscribe = fetchNotifications(); 

    return () => {
      if (unsubscribe) unsubscribe(); 
    };
  }, [userId]);
  
  const today = new Date();
  const todayDate = today.toLocaleDateString();
  console.log(todayDate);
  let NotificationDate = '21/11/2024';
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const yesterdayDate = yesterday.toLocaleDateString();

  let displayDate;
  if (NotificationDate === todayDate) {
    displayDate = 'Today';
  } else if (NotificationDate === yesterdayDate) {
    displayDate = 'Yesterday';
  } else {
    displayDate = NotificationDate;
  }


  const filteredNotifications = notifications.filter(item => {
    if (selectedTab === 0) return true; 
    if (selectedTab === 1 && item.status === 'read') return true; 
    if (selectedTab === 2 && item.status === 'unread') return true; 
    return false;
  });

  const renderItem = ({item}) => (<View style={styles.card}>

  
  <View style={styles.renderView}>
   <Text style={styles.head}>{item.head}</Text>
   <Text style={styles.desc}>{item.description}</Text>
   <Text style={styles.time}>{item.time} mins ago</Text>
  </View>
  <View style={styles.source}>
  <Image source={Images.docnotify}/>
  </View>

  </View>);


const handleTabPress = (index) => {
  setSelectedTab(index);
};



  return (
    <SafeAreaView style={styles.container}>
      <View >
        <View style={styles.headed}>
          <Text style={styles.heading}>Notifications</Text>
        </View>

        <FlatList
          data={['All', 'Read', 'Unread']}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.typeItem}
                onPress={() => {
                  setSelectedTab(index);
                }}>
                <View
                  style={[
                    styles.category,
                    {
                      backgroundColor:
                        selectedTab == index ? colors.main : colors.white,
                    },
                  ]}>
                  <Text
                    style={[styles.item, {color: selectedTab == index ? 'white' : '#71B1A1',fontSize:selectedTab == index ? 14 : 16,}]}>
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View
        style={styles.date}>
        <Text style={styles.dateText}>{todayDate}</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredNotifications}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default Notification;


