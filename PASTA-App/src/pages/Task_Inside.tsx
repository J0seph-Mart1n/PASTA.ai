import { View, Text, StyleSheet, Button, FlatList, KeyboardAvoidingView, VirtualizedList } from 'react-native'
import { useState } from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { Pressable, ScrollView, TextInput } from 'react-native-gesture-handler'
import { SelectCountry } from 'react-native-element-dropdown'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'

const category = [
    {
      value: '1',
      label: 'Personal',
      image: {
        uri: "https://www.vigcenter.com/public/all/images/default-image.jpg"
      }
    },
    {
      value: '2',
      label: 'Work',
      image: {
        uri: "https://www.vigcenter.com/public/all/images/default-image.jpg"
      }
    },
    {
      value: '3',
      label: 'Shopping',
      image: {
        uri: "https://www.vigcenter.com/public/all/images/default-image.jpg"
      }
    },
    {
      value: '4',
      label: 'Health',
      image: {
        uri: "https://www.vigcenter.com/public/all/images/default-image.jpg"
      }
    },
    {
      value: '5',
      label: 'Other',
      image: {
        uri: "https://www.vigcenter.com/public/all/images/default-image.jpg"
      }
    },
  ];
const priority = [
    {
      value: '1',
      label: 'Low',
      image: {
        uri: "https://www.vigcenter.com/public/all/images/default-image.jpg"
      }
    },
    {
      value: '2',
      label: 'Medium',
      image: {
        uri: "https://www.vigcenter.com/public/all/images/default-image.jpg"
      }
    },
    {
      value: '3',
      label: 'High',
      image: {
        uri: "https://www.vigcenter.com/public/all/images/default-image.jpg"
      }
    },
  ];

const Inside_Task = () => {
    const [categoryNo, setCategoryNo] = useState('1');
    const [priorityNo, setPriorityNo] = useState('2');
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date')
    const [subTask, setSubTask] = useState([]);
    const [subTaskText, setSubTaskText] = useState('');

    const onChange = (e, selectedDate) => {
        setDate(selectedDate);
        setShow(false);
    }

    const showMode = (modeToShow) => {
        setShow(true);
        setMode(modeToShow);
    }

    const addSubTasks = (title) => {
        //If the subTaskText is empty, do not add it to the list
        if (title.trim() === '') return;
        setSubTask([...subTask, {'key': title}]);
        setSubTaskText('');
        console.log(subTask);
    }

    const getItem = (data, index) => data[index];

    const getItemCount = (data) => data.length;

    return (
      <ScrollView>
        <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <View style={styles.title}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Task</Text>
                <TextInput style={{backgroundColor:'white', borderRadius: 10}} placeholder='What do you need to do'/>
            </View>
            <View style={styles.description}>
                <Text style={{fontSize: 18, fontWeight: 'bold', paddingBottom: 5}}>Description</Text>
                <TextInput style={{backgroundColor:'white', height: 70, borderRadius: 10}} />
            </View> 
            <View style={styles.datetime}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Date</Text>
                <Pressable style={styles.dateButton} onPress={() => showMode('date')}>
                    <Text style={{fontSize: 16}}>{date.toLocaleDateString()}</Text>
                </Pressable>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Time</Text>
                <Pressable style={styles.dateButton} onPress={() => showMode('time')}>
                    <Text style={{fontSize: 16}}>{date.toLocaleTimeString()}</Text>
                </Pressable>
                {
                    show && (
                        <DateTimePicker
                        value={date}
                        mode={mode}
                        is24Hour={false}
                        onChange={onChange}
                />)}
            </View>
            <View style={styles.dropdownSelect}>
                <View>
                    <Text style={{fontSize:18, paddingBottom: 5, fontWeight: 'bold'}}>Select Category</Text>
                    <SelectCountry
                        style={styles.dropdown}
                        selectedTextStyle={styles.selectedTextStyle}
                        placeholderStyle={styles.placeholderStyle}
                        imageStyle={styles.imageStyle}
                        iconStyle={styles.iconStyle}
                        maxHeight={200}
                        value={categoryNo}
                        data={category}
                        valueField="value"
                        labelField="label"
                        imageField="image"
                        placeholder="Select Category"
                        searchPlaceholder="Search..."
                        onChange={e => {
                        setCategoryNo(e.value);
                        }}
                    />
                </View>
                <View>
                    <Text style={{fontSize:18, paddingBottom: 5, fontWeight: 'bold'}}>Select Priority</Text>
                    <SelectCountry
                        style={styles.dropdown}
                        selectedTextStyle={styles.selectedTextStyle}
                        placeholderStyle={styles.placeholderStyle}
                        imageStyle={styles.imageStyle}
                        iconStyle={styles.iconStyle}
                        maxHeight={200}
                        value={priorityNo}
                        data={priority}
                        valueField="value"
                        labelField="label"
                        imageField="image"
                        placeholder="Select Category"
                        searchPlaceholder="Search..."
                        onChange={e => {
                        setPriorityNo(e.value);
                        }}
                    />
                </View>
            </View>
            
            <View style={styles.subTasks}>
                <Text style={{fontSize: 18, fontWeight: 'bold', paddingBottom: 5 }}>SubTasks</Text>
                <View style={{flexDirection: 'column', maxHeight: 200}}>
                  <ScrollView>
                    {subTask.map((item, index) => (
                      <View key={index} style={{ padding: 10, borderBottomWidth: 1 }}>
                        <Text>{'•'} {item.key}</Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
                <KeyboardAvoidingView behavior='padding'>
                  <View style={{flexDirection: 'row'}}> 
                      <TextInput style={{backgroundColor: 'white', width: 250, borderRadius: 10}} value={subTaskText} onChangeText={setSubTaskText}/>
                      <Pressable style={styles.subTaskButton} onPress={() => addSubTasks(subTaskText)} >
                          <Text style={{color: 'white'}}>Add</Text>
                      </Pressable>
                  </View>
                </KeyboardAvoidingView>
                
                <Pressable style={styles.submitButton} onPress={() => console.log('submit')}>
                    <Text style={{color: 'white', fontSize: 18}}>Add Task</Text>
                </Pressable>
            </View>
            
            
        </SafeAreaView>
      </SafeAreaProvider>
      </ScrollView>
      
        
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        maxHeight: 800
    },
    title: {
        flexDirection: 'column',
        gap: 5
    },
    description:{
        paddingTop: 10
    },
    datetime: {
        flexDirection: 'row',
        gap: 15,
        paddingTop: 20
    },
    dateButton:{
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
        width: 110,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    dropdown: {
        margin: 0,
        height: 50,
        width: 150,
        backgroundColor: '#EEEEEE',
        borderRadius: 22,
        paddingHorizontal: 8,
      },
    imageStyle: {
        width: 24,
        height: 24,
        borderRadius: 12,
      },
    placeholderStyle: {
        fontSize: 16,
      },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
      },
    iconStyle: {
        width: 20,
        height: 20,
      },
    dropdownSelect: {
        paddingTop: 20,
        flexDirection: 'row',
        gap: 30
    },
    subTasks:{
        paddingTop: 20,
        flexDirection: 'column',
        gap: 10
    },
    subTaskButton:{
        backgroundColor: 'black',
        color: 'white',
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginLeft: 10,
    },
    submitButton:{
        flexDirection: 'row',
        backgroundColor: 'black',
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    }
})

export default Inside_Task