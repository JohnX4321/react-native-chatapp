import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddRoomScreen from '../screens/AddRoomScreen';
import {IconButton} from 'react-native-paper';
import RoomScreen from '../screens/RoomScreen';

//const Stack=createStackNavigator();
const ModalStack=createStackNavigator();
const ChatAppStack=createStackNavigator();


export default function HomeStack() {

    /*return(
        <Stack.Navigator
        screenOptions={{
            headerStyle:{
                backgroundColor: '#6646ee',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle:{
                fontSize: 22,
            },
        }}>
            <Stack.Screen name='Home' component={HomeScreen}/>
        </Stack.Navigator>
    );*/


    return (
        <ModalStack.Navigator mode='modal' headerMode='none'>
            <ModalStack.Screen name='ChatApp' component={ChatApp} />
            <ModalStack.Screen name='AddRoom' component={AddRoomScreen} />
        </ModalStack.Navigator>
    );


}


function ChatApp() {
    return (
        <ChatAppStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#6646ee'
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontSize: 22
                }
            }}
        >
            <ChatAppStack.Screen
                name='Home'
                component={HomeScreen}
                options={({ navigation }) => ({
                    headerRight: () => (
                        <IconButton
                            icon='message-plus'
                            size={28}
                            color='#ffffff'
                            onPress={() => navigation.navigate('AddRoom')}
                        />
                    )
                })}
            />
            {/* Add this */}
            <ChatAppStack.Screen name='Room' component={RoomScreen}
            options={({route})=>({
                title: route.params.thread.name
            })}/>
        </ChatAppStack.Navigator>
    );
}
