import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native'


const getDataFromApi = {
  getWeather(url){
    return fetch(url).then((res) => res.json());
  }
}

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      main: "Weather: Fetching data...",
      desc: "",
      icon: 0,
      latitude: null,
      longitude: null,
      source: null,
    }
  }

  renderImage(){
    let imageSource;

    return(
      <Image source={ imageSource } style={{width: 400, height: 400}} />
    );
  }

  componentWillMount(){
    let url;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        {/*
        Rovaniemen sijainti
        url = "https://weatherapp.eficode.fi/api/forecast?lon=" + "66.514739" + "&lat=" + "25.660847";
        */}
        url = "https://weatherapp.eficode.fi/api/forecast?lon=" + position.coords.longitude + "?lat=" + position.coords.latitude;
        this.setState({longitude: position.coords.longitude, latitude: position.coords.latitude})

        getDataFromApi.getWeather(url).then((res) => {
          const i01 = require("./img/01.jpeg");
          const i02 = require("./img/02.jpeg");
          const i03 = require("./img/03.jpeg");
          const i10 = require("./img/10.jpeg");
          const i11 = require("./img/11.jpeg");
          const i13 = require("./img/13.jpeg");
          const i50 = require("./img/50.jpeg");

          this.setState({
            main: "Weather: " + res.main,
            desc: "Description: " + res.description,
          })
          switch (res.icon){
            case '01d':
            case '01n':
              this.setState({ source: require("./img/01.jpeg") })
              break;
            case '02d':
            case '02n':
              this.setState({ source: require("./img/02.jpeg") })
              break;
            case '03d':
            case '03n':
              this.setState({ source: require("./img/03.jpeg") })
              break;
            case '10d':
            case '10n':
              this.setState({ source: require("./img/10.jpeg") })
              break;
            case '11d':
            case '11n':
              this.setState({ source: require("./img/11.jpeg") })
              break;
            case '13d':
            case '13n':
              this.setState({ source: require("./img/13.jpeg") })
              break;
            case '50d':
            case '50n':
              this.setState({ source: require("./img/50.jpeg") })
              break;
            default:
              this.setState({ source: require("./img/50.jpeg") })
              break;
          }
        });
      }
    );

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.main}</Text>
        <Text>{this.state.desc}</Text>
        <Image source={ this.state.source } style={{width: 400, height: 400}} />
        <Text>Coordinates: {"\n"}longitude: {this.state.longitude} {"\n"}latitude: {this.state.latitude}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    top: '20%',
  },
  alignBottom: {
    top: '90%',
  },
});
