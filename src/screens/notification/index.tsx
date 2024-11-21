import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {vh, vw} from '../../theme/dimensions';
import {colors} from '../../theme';
const Notification = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const notifyData = [{}];
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

  const renderItem = ({item}) => <View style={styles.card}></View>;
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 0.3}}>
        <View style={styles.head}>
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
                    style={{
                      color: selectedTab == index ? 'white' : '#71B1A1',
                      fontWeight: '800',
                      fontSize: selectedTab == index ? 14 : 16,
                    }}>
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          alignSelf: 'center',

          padding: 8,

          borderRadius: 5,
        }}>
        <Text style={{fontSize: vh(15), fontWeight: '600'}}>{displayDate}</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={notifyData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: vh(23),
    fontWeight: '600',
    alignSelf: 'center',
  },
  head: {
    justifyContent: 'center',
    marginTop: vh(10),
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  typeItem: {
    marginHorizontal: vw(12),
    marginTop: vh(25),
    paddingBottom: vh(10),
  },
  category: {
    backgroundColor: colors.white,
    width: vw(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: vh(20),
    paddingVertical: vw(10),
  },

  card: {
    height: vh(90),
    marginBottom: vh(15),
    marginHorizontal: vw(25),
    backgroundColor: '#F0F0F0',

    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});
