import * as React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, TextInput, FlatList} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class SearchScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            search:'',
            allTransaction:[],
            lastVisibleTransaction:null
        }
    }

    searchTransaction = async (searchText) => {
        var searchText = searchText.toUpperCase()
        var first_Alphabet = searchText.split("")[0]

        if(first_Alphabet == "B"){
            const transactions = await db.collection('transaction').where('bookId','==',searchText).limit(5).get()
            transactions.docs.map((doc) => {
                this.setState({
                    allTransaction:[...this.state,allTransaction,doc.data()],
                    lastVisibleTransaction:doc
                })
            })
        }

        else if(first_Alphabet == "S"){
            const transactions = await db.collection('transaction').where('studentId','==',searchText).limit(5).get()
            transactions.docs.map((doc) => {
                this.setState({
                    allTransaction:[...this.state,allTransaction,doc.data()],
                    lastVisibleTransaction:doc
                })
            })

        }

        console.log(this.state.lastVisibleTransaction.id)
    }

    render(){
        return(
            <View style={styles.container}>

                <TextInput 
                    style={styles.serchInput}
                    placeholder="Search Book ID or Student ID"
                    onChangeText={(text)=>this.setState({search:text})}     
                />
                <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.searchTransaction()}}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>

                <FlatList 
                data={this.state.allTransaction}
                keyExtractor={(items,index)=>{
                    index.toString()
                }}
                renderItem={({item})=>(
                    <View>
                        <Text>{"Book ID :" + item.bookId}</Text>
                        <Text>{"Student ID :" + item.studentId}</Text>
                        <Text>{"Transaction ID :" + item.transactionType}</Text>
                        <Text>{"Date :" + item.date.toDate()}</Text>
                    </View>
                )}
                />
                

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"aliceblue",
        justifyContent:"center",
        alignItems:"center",
        paddingBottom:100,
    },
    serchInput:{
        alignSelf:"center",
        alignItems:"center",
        alignContent:"center",
        justifyContent:"center",
        flexDirection:"row",
        height:50,
        borderRadius:10,
        width:250,
        borderWidth:1.5,
        margin:20,
    },
    buttonText:{
        fontSize:20,
        textAlign:"center",
    },
    button:{
        border:"2px solid black",
    }
})