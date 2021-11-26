import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, ListItem, Button, Icon } from 'react-native-elements'


const DetailScreen = ({route}) => {
    //Variables a utilizar para mandar los parametros hacia el título de la pantalla y hacia la API
    const {nombre} = route.params;
    const {lon} = route.params;
    const {lat} = route.params;
    const [datos, setDatos]=useState([]);

    useEffect(()=>{
        const apikey ='d9fb4aca49b32d15d18da51f1d55fce5';
        const api_url=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${apikey}&units=metric`
        fetch(api_url)
            .then(data => {
                return data.json()
            }).then(resultado=>
            {
                let temparreglodet = [];
                temparreglodet = resultado.daily;
                setDatos(temparreglodet);
                tuday(resultado.daily)

            });

    },[])

    //Variable a utilizar para sacar los datos de los días
    const tuday = (_dt,_i) =>{         
        console.log(_i)
        var day = new Date(_dt * 1000);  
        if(_i==0){
            return "HOY"
        }
        else{
            return day.toLocaleString("es-mx", { weekday: "long" }).toUpperCase(); 
        }        
        
    }

    //Pantalla para pronósticoa a 7 días incluyendo la información de cada día con temp, max y min
    return (  
        <View style={styles.container}>   
         <ScrollView>
            <Text style={styles.texto}>Pronóstico a 7 días </Text>        
            {
                datos.map((a,i)=>
                    <Card>
                    <Card.Title>{tuday(a.dt,i)}</Card.Title>
                    <View key={i}>
                        <Text key={i} style={styles.texto2}>Temp: {a.temp.day} c°</Text>
                        <Text key={i+1} style={styles.texto2}>Temp Máx: {a.temp.max} c°</Text>
                        <Text key={i+2} style={styles.texto2}>Temp Mín: {a.temp.min} c°</Text> 
                    </View> 
                    </Card>            
                )
            }
          </ScrollView>                
        </View>
    
        
        
      );
}
 
export default DetailScreen;

//Ssssssssssssstilos
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#00ffff',
    },
    texto: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold',
      },
    texto2:{
        color: 'black', 
        textAlign: 'left', 
        fontSize: 15,
        margin: 10,
    },
    texto3:{
        color: 'black', 
        textAlign: 'left', 
        fontSize: 15,
        margin: 10,
    }
  });