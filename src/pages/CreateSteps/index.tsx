import React, {useState} from 'react'
import {View, StyleSheet} from 'react-native'
import {TextInput, IconButton} from 'react-native-paper'
import {Step} from '../../models/Step'

interface createStepsProps{
    addSteps(description:string):void
}

const CreateSteps:React.FC <createStepsProps> = ({addSteps}) =>{

const [stepsName, setStepName] = useState("");

 return (
    <View style={styles.stepsContainer}>
        <TextInput 
          style={styles.stepInput}
          label="Step"
          placeholder="Step to prepare"
          keyboardType="default"
          mode="outlined"
          onChangeText={setStepName}
        />

        <IconButton 
          onPress={() => addSteps(
            stepsName
          )} 
          style={styles.buttonInput} 
          icon="plus-circle" size={30} 
          color="#2CAC60" />
      </View>
  )
};

const styles = StyleSheet.create({
  stepsContainer: {
    marginTop: "5%",
    flexDirection: 'row',
    width: '80%',
    alignItems: "center"
  },
  
  buttonInput: {
    width: '18%',
    marginLeft: '2%',
  },

  stepInput: {
    width: '80%'
  },

});
    

export {CreateSteps}