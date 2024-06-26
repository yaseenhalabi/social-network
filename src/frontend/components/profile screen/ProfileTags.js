import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePersonsTags } from '../../redux/peopleSlice';
import { addTag, removeTag } from '../../redux/tagsSlice';
import { COLORS, TAG_COLORS } from '../../utils/colors';


export default function ProfileTags({ id }) {
    const dispatch = useDispatch();
    const allTags = useSelector(state => state.tags);
    profileTagIds = useSelector(state => state.people.find(person => person.id == id))?.tags || [];
    const currentTags = allTags.filter(tag => profileTagIds.includes(tag.id));
    const updateCurrentTagIds = (newIds) => dispatch(updatePersonsTags({id, newIds}));
    const [addingTag, setAddingTag] = useState(false);

    const [newTag, setNewTag] = useState(
        {
            name: "",
            color: TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)],
            id: (Math.max(...allTags.map(tag => tag.id)) + 1).toString()
        }
    );
    const confirmNewTag = () => {
        // if the tag already exists, add it to the profile
        if (allTags.map(tag => tag.name).includes(newTag.name)) {
            tagId = allTags.find(tag => tag.name.toLowerCase() == newTag.name.toLowerCase()).id;
            updateCurrentTagIds([...profileTagIds, tagId]);
            setAddingTag(false);
            setNewTag(
                {
                    name: "",
                    color: TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)],
                    id: (Math.max(...allTags.map(tag => parseInt(tag.id))) + 2).toString()
                }
            );
        }

        // if the tag doesn't exist, add it to the tags and then add it to the profile
        else if (!allTags.map(tag => tag.name).includes(newTag.name) && newTag.name.length > 0) {
            dispatch(addTag({id: newTag.id, name: newTag.name, color: newTag.color}))
            updateCurrentTagIds([...profileTagIds, newTag.id]);
            setAddingTag(false);
            setNewTag(
                {
                    name: "",
                    color: TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)],
                    id: (Math.max(...allTags.map(tag => parseInt(tag.id))) + 2).toString()
                }
            );
        }
        // if the tag is empty or already exists, don't add it
        else {
            setAddingTag(false);
        }
    }

    const addTagToProfile = (tagId) => {
        updateCurrentTagIds([...profileTagIds, tagId]);
        setAddingTag(false);
    }

    const tagSearchData = allTags.filter(tag => tag.name.toLowerCase().includes(newTag.name.toLowerCase()) && !profileTagIds.includes(tag.id));
    return (
        <View style={styles.tagsContainer}>
            {
                currentTags.map(({id, color, name}) => 
                    <View key={id} style={[styles.tag, {backgroundColor: color}]}>
                        <Text style={styles.smallText}>{name}</Text>
                    </View>
                )
            }
            {
                !addingTag ?
                <TouchableOpacity const onPress={() => setAddingTag(true)} style={{justifyContent: 'center', opacity: .8}}>
                    <Text style={styles.smallText}>+ Add Tag</Text>
                </TouchableOpacity> 
                :
                <View style={{flexDirection: 'column'}}>
                    <View style={[styles.tag, {backgroundColor: '#0000003b'}]}>
                        <TextInput 
                            style={styles.smallText} // Set the width to 100%
                            onChangeText={(value) => setNewTag({...newTag, name: value})}
                            autoFocus={true}
                            onBlur={() => confirmNewTag()}
                            maxLength={30}
                            minWidth={30}
                        />
                    </View>
                    {
                    tagSearchData &&
                    <View>
                            {
                            tagSearchData.slice(0, 3).map(item =>
                                    <TouchableOpacity key={item.id} style={[styles.tag, {backgroundColor: COLORS.primary, marginTop: 5}]} onPress={() => addTagToProfile(item.id)}>
                                        <Text style={styles.smallText}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            }
                    </View>
                    }

                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    tag: {
        backgroundColor: "#FF6B85",
        borderRadius: 360,
        paddingVertical: 4,
        paddingHorizontal: 13,
        width: 'auto',
        maxHeight: 20,
        alignItems: 'flex-start',
    },
    smallText: {
        color: COLORS.white,
        fontFamily: 'Trebuc',
        fontWeight: 'bold',
        fontSize: 10,
    },
})