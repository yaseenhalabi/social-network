import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../../screens/ProfileScreen'; 
import NamesScreen from '../../screens/NamesScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigatorInPeopleScreen() {
    const screenOptions = {
        headerShown: false,
    }
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="ListOfNames" component={NamesScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    )
}