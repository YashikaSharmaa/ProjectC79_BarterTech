import React, { Component } from 'react';
import { View, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import db from '../config'
import AppHeader from '../components/AppHeader';
import styles from '../styles';

export default class BookDonateScreen extends Component{
  constructor(){
    super()
    this.state = {
      items : []
    }
  this.requestRef= null
  }

  getitems =()=>{
    this.requestRef = db.collection("Exchange_Request").onSnapshot((snapshot)=>{
      var items = snapshot.docs.map(document => document.data());
      this.setState({
        items : items
      });
    })
  }

  componentDidMount(){
    this.getitems()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        style = {styles.item}
        title={item.ItemName}
        subtitle={item.Description}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.listButton}>
              <Text style={{color:'#fff'}}>View</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={styles.box}>
        <AppHeader />
        <View>
          {
            this.state.items.length === 0
            ?(
              <View>
                <Text style={styles.modalTitle}>List Of All needed Items</Text>
              </View>
            )
            :(
              <FlatList
                style = {styles.list}
                keyExtractor={this.keyExtractor}
                data={this.state.items}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}