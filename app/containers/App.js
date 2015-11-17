import React from 'react-native';
import t from 'tcomb-form-native';

var { StyleSheet, Text, View, TouchableHighlight } = React;

var Form = t.form.Form;

// here we are: define your domain model
var Person = t.struct({
  '投资成本': t.Number,              // a required string
  '投资周期(天)': t.Number,  // an optional string
  '年化收益率(%)': t.Number,               // a required number
});

var options = {}; // optional rendering options (see documentation)

let App = React.createClass({

  getInitialState() {
   return {
     result: 0
   };
 },

  componentDidMount() {
    // give focus to the name textbox
    this.refs.form.getComponent('投资成本').refs.input.focus();
  },


  onPress : function() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
      let cost = value['投资成本']
      let period = value['投资周期(天)']
      let incomePercent = value['年化收益率(%)']
      let res = cost*(incomePercent/100)/365*period;
      console.log(res);
      this.setState({result:res});
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        {/* display */}
        <Form
          ref="form"
          type={Person}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>计算收益</Text>
        </TouchableHighlight>

        <Text>收益结果：{this.state.result}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default App
