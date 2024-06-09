import { SafeAreaView, View, StyleSheet, Text, ScrollView, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { COLORS } from '../utils/colors';
import searchIcon from '../assets/icons/searchicon.png';
import filterIcon from '../assets/icons/filtericon.png';
import Name from '../components/names screen/Name';
import AddNameButton from '../components/names screen/AddNameButton';
import { useSelector, useDispatch } from 'react-redux';
import { addPerson } from '../redux/peopleSlice'
export default function PeoplScreen({ navigation }) {
    const people = useSelector(state => state.people);
    const dispatch = useDispatch();
    const [searchContent, setSearchContent] = useState('');
    const [newName, setNewName] = useState('');
    const [addingPerson, setAddingPerson] = useState(false);
    const handleAddPerson = () => {
        const newPerson = {
            name: newName,
            id: Math.floor(Math.random() * 100000).toString(),
            tags: [],
            birthday: null,
            address: '',
            notes: '',
            xLink: '',
            instagramLink: '',
        }
        dispatch(addPerson(newPerson));
        setAddingPerson(false);
        setNewName('');
    
    }
    return (
        <SafeAreaView style={styles.container}>  
            <AddNameButton onPress={() => setAddingPerson(true)}/>
            {/* Search Bar + filters */}
            <View style={styles.searchContainer}>
                <Image source={searchIcon} style={styles.searchImage}/>
                <TextInput 
                    style={styles.searchInput} 
                    placeholder="Search..." 
                    placeholderTextColor={styles.searchInput.color} 
                    value={searchContent} 
                    onChangeText={setSearchContent} 
                />
                <Image source={filterIcon} style={styles.searchImage}/>
            </View> 
            {/* List of Names */}
            <ScrollView>
                {people.map((data) => (
                    <TouchableOpacity key={data.id} onPress={() => navigation.push('Profile', {id: data.id})}>
                        <Name name={data.name} />
                    </TouchableOpacity>
                ))}
                {
                    addingPerson &&
                    <Name name={newName} isInput handleNameChange={setNewName} onSubmit={() => handleAddPerson()}/>
                }
            </ScrollView> 
        </SafeAreaView>
    )   
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        flex: 1,
    },
    searchContainer: {
        backgroundColor: COLORS.secondary,
        flexDirection: 'row',
        borderColor: '#ffffff51',
        borderBottomWidth: .2,
        paddingHorizontal: 15,
        paddingVertical: 10,
        columnGap: 10,
    },
    searchInput: {
        color: COLORS.off_white,
        fontFamily: 'Trebuc',
        fontSize: 20,
        opacity: .7,
        width: width - 93,
    },
    searchImage: {
        width: 20,
        height: 20,
        alignContent: 'center',
        alignItems: 'center',
        opacity: .7,
    },
});




