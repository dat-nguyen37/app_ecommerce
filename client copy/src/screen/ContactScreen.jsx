import { StyleSheet, Text, View,Image,TouchableOpacity ,Linking, Alert} from 'react-native'
import React from 'react'
import Metial from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'




const ContactScreen = ({navigation}) => {
  const openZaloWithPhoneNumber = (phoneNumber) => {
    const fallbackUrl  = `https://zalo.me/${phoneNumber}`;
    const zaloUrl = `zalo://${phoneNumber}`;
    Linking.canOpenURL(zaloUrl)
    .then((supported) => {
      if (supported) {
        Linking.openURL(zaloUrl);
      } else {
        Linking.openURL(fallbackUrl);
      }
    })
    .catch((err) => console.error('An error occurred', err));
};
  const makePhoneCall = (phoneNumber) => {
    const phoneUrl = `tel:${phoneNumber}`; 
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneUrl);
        } else {
          Alert.alert('Thông báo', 'Không thể thực hiện cuộc gọi');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };
  const openGmail = (email) => {
    const mailtoUrl = `mailto:${email}`;
    const fallbackUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;

    Linking.canOpenURL(mailtoUrl)
    .then((supported) => {
      if (supported) {
        Linking.openURL(mailtoUrl);
      } else {
        Linking.openURL(fallbackUrl);
      }
    })
    .catch((err) => console.error('An error occurred', err));
  };
  const openFacebook = (profileId) => {
    const facebookUrl = `fb://profile/${profileId}`;
    const fallbackUrl = `https://www.facebook.com/${profileId}`;

    Linking.canOpenURL(facebookUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(facebookUrl);
        } else {
          Linking.openURL(fallbackUrl);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };
  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <Text style={styles.Title}>Liên hệ</Text>
      </View>
      <View style={styles.Info}>
        <View>
          <Image style={styles.InfoImg} source={require('../assets/avata.jpg')}/>
          <Text style={styles.InfoText}>dat958734@gmail.com</Text>
        </View>
      </View>
      <View style={styles.ListContact}>
       <View style={styles.row}>
            <TouchableOpacity style={styles.cardContact} onPress={() => openFacebook('100061223504372')}>
                <Entypo style={styles.icon} name="facebook-with-circle" color={"blue"}/>
                <Text>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardContact} onPress={() => makePhoneCall('0966544325')}>
                <Feather style={styles.icon} name="phone-call" color={"red"}/>
                <Text>Call Phone</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardContact} onPress={() => openGmail('dat958734@gmail.com')}>
                <Metial style={styles.icon} name="gmail" color={"red"}/>
                <Text>Gmail</Text>
            </TouchableOpacity>
       </View>
        <View style={styles.row}>
            <View style={styles.cardContact}>
                <Entypo style={styles.icon} name="youtube" color={"red"}/>
                <Text>Youtube</Text>
            </View>
            <TouchableOpacity style={styles.cardContact} onPress={() => openZaloWithPhoneNumber('0966544325')}>
                <Image style={styles.icon} source={require('../assets/zalo.jpg')}/>
                <Text>Zalo</Text>
            </TouchableOpacity>
            <View style={styles.cardContact}>
                <AntDesign style={styles.icon} name="skype" color={"blue"}/>
                <Text>Skype</Text>
            </View>
        </View>
      </View>
    </View>
  )
}

export default ContactScreen

const styles = StyleSheet.create({
  Container:{
    flex:1,
  },
  Header:{
    height:70,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center'
  },
  Title:{
    color:'white',
    fontWeight:'bold',
    fontSize:40
  },
  Info:{
    height:200,
    paddingVertical:30,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center'
  },
  InfoImg:{
    width:100,
    height:100,
    borderRadius:50,
    alignSelf:'center'
  },
  InfoText:{
    paddingVertical:10,
    fontSize:20,
    color:'red'
  },
  ListContact:{
    flex:1,
    alignItems:'center'
  },
  row:{
    flexDirection: 'row',
  },
  cardContact: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    margin: 5,
    borderRadius:10,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3, 
    elevation: 5, 
    alignItems:'center',
    justifyContent:'center'
  },
  icon:{
    width:50,
    height:50,
    fontSize:50
  }
})