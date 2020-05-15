import React,{useContext,useState,useEffect} from 'react';
import {View,StyleSheet,FlatList,TouchableOpacity} from 'react-native';
import {Title,List,Divider} from 'react-native-paper';
import FormButton from '../components/FormButton';
import {AuthContext} from '../nav/AuthProvider';
import firestore from '@react-native-firebase/firestore';

import Loading from '../components/Loading';


export default function HomeScreen({navigation}) {


    const {user,logout}=useContext(AuthContext);
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);

    /**
     * Fetch threads from Firestore
     */
    useEffect(() => {
        const unsubscribe = firestore()
            .collection('THREADS')
            // add this
            .orderBy('latestMessage.createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const threads = querySnapshot.docs.map(documentSnapshot => {
                    return {
                        _id: documentSnapshot.id,
                        name: '',
                        // add this
                        latestMessage: {
                            text: ''
                        },
                        // ---
                        ...documentSnapshot.data()
                    };
                });

                setThreads(threads);

                if (loading) {
                    setLoading(false);
                }
            });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <Loading/>;
    }

    /*<Title>Chat Rooms List</Title>
            <Title>{user.uid}</Title>
            <FormButton modeValue='contained' title='Logout'
            onPress={()=>logout()}/>
            <FormButton
                modeValue='contained'
                title='Logout' onPress={()=>navigation.navigate('AddRoom')} />
*/

    return (
        <View style={styles.container}>
            <FlatList
                data={threads}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={() => <Divider />}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Room', { thread: item })}
                    >
                        <List.Item
                            title={item.name}
                            description={item.latestMessage.text}
                            titleNumberOfLines={1}
                            titleStyle={styles.listTitle}
                            descriptionStyle={styles.listDescription}
                            descriptionNumberOfLines={1}
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    );

}

const styles=StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
    },
    listTitle: {
        fontSize: 22,
    },
    listDescription: {
        fontSize: 16,
    },
});
