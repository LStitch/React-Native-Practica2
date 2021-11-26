import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Constants from 'expo-constants';
import { createIconSetFromFontello } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  //Variables constantes a utilizar con su respectivo llenado
  const [lista, setLista] = useState([]);
  const [ciudad, setCiudad] = useState('');
  const [location, setLocation] = useState([]);
  const [temp, setTemp] = useState([]);
  const [consultado, setConsultado]= useState(false);

  
  // Buscar el clima de la ciudad
  const buscar = (ciudad) => {
    
    const key = 'd9fb4aca49b32d15d18da51f1d55fce5';
    const api_url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${key}&units=metric`;

    //Un if else que nos ayuda anidando todo para que
    //tenga estructura y mande mensaje a traves de consola
    if(ciudad == ""){
      console.log("No hay ciudad o país")
    }
    else{
      fetch(api_url)
        .then(data => {
            return data.json();
        }).then(resultado => {
         console.log(resultado);
         console.log(resultado.message)

         if(resultado.message ==="Ciudad o país sin encontrar"){
          setConsultado(false);
         }
         else{
          setConsultado(true);
          
          //Variables temporales para guardar los datos de coordenadas, temperatura y localización
          let tempcoord = 0;
          let temptemp =0;
          let temploc = 0;
          tempcoord = resultado.coord;
          temptemp = resultado.main;
          temploc = resultado.sys;
         
          //Información de temperatura y su arreglo
          let temparreglotemp = [];
          temparreglotemp.push(temptemp.temp);
          temparreglotemp.push(temptemp.temp_max);
          temparreglotemp.push(temptemp.temp_min);

          //Información de coordenadas y su arreglo
          let temparreglocoord = [];
          temparreglocoord.push(tempcoord.lon);
          temparreglocoord.push(tempcoord.lat);

          //Información de ciudad y su arreglo
          let temparregloloc = [];
          temparregloloc.push(temploc.country)
          temparregloloc.push(resultado.name)

          //Datos colocados en los arreglos temporales
          setLista(temparreglotemp);
          setTemp(temparregloloc);
          setLocation(temparreglocoord);

         }
         
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image img source={{uri: 'https://static.vecteezy.com/system/resources/previews/002/236/419/non_2x/weather-banner-vector.jpg'}}
                style={styles.imag}/>
      <Text style={styles.texto}> Pronóstico de </Text>
      <SearchBar
        round
        //Estilo de la barra de búsqueda
        containerStyle={{
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }}
        //Fondo de búsqueda con datos de la ciudad y realización de búsqueda
        inputStyle={{ backgroundColor: 'white' }}
        onChangeText={(texto) => {
          setCiudad(texto)
          buscar(texto);
        }}
        //Al dar X retorna el valor vació en la búsqueda
        onClear={() => {
          setLista([]);
          setCiudad("")
          setConsultado(false);
        }}
        //Toma el valor de ciudad y lo regresa
        value={ciudad}
        //Texto que aparece antes de escribir
        placeholder=" Ciudad o País"
      />

      <View style={{ margin: 10, fontSize: 20 }}>
        {
          consultado 
          ?
          //Búsqueda colocada manda datos
          <View style={{ margin: 10, fontSize: 20 }}>
            <Text style={styles.texto}> Estado: {temp[0]}</Text>
            <Text style={styles.texto}> Ciudad: {temp[1]}</Text>
            <Text style={styles.texto}> Longitud: {location[0]}</Text>
            <Text style={styles.texto}> Latitud: {location[1]}</Text>
            <Text style={styles.texto}> Temp: {lista[0]} c°</Text>
            <Text style={styles.texto}> Máx: {lista[1]} c°</Text>
            <Text style={styles.texto}> Mín: {lista[2]} c°</Text>
            <Button 
                title="Clima de la Semana" 
                onPress={()=>navigation.navigate('DetailScreen',{nombre:temp[1],lon:location[0],lat:location[1]})}
            />
          </View>
          :
          //Sin búsqueda, manda texto
          <Text style={styles.texto}>
              Haz tu búsqueda de la ciudad o país
          </Text>
        }
      </View>
    </View>
  );
};

export default HomeScreen;

//Estilos tipo CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#00FFFF',
  },
  texto: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
  },
  imag: {
    alignContent: 'center',
    height: 200,
    backgroundColor: '#00FFFF',
  }
});

