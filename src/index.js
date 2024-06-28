import mqtt from 'mqtt';
/***
    * Browser
    * This document explains how to use MQTT over WebSocket with the ws and wss protocols.
    * EMQX's default port for ws connection is 8083 and for wss connection is 8084.
    * Note that you need to add a path after the connection address, such as /mqtt.
    */
const url = 'ws://3.94.215.189:8083/mqtt'
/***
    * Node.js
    * This document explains how to use MQTT over TCP with both mqtt and mqtts protocols.
    * EMQX's default port for mqtt connections is 1883, while for mqtts it is 8883.
    */
//const url = 'mqtt://3.94.215.189:1883'

// Create an MQTT client instance
const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Authentication
  clientId: 'emqx_test'
}
const client  = mqtt.connect(url, options)
client.on('connect', function () {
  console.log('Connected')
  // Subscribe to a topic
  client.subscribe('test', function (err) {
    if (!err) {
      // Publish a message to a topic
      client.publish('test', 'Hello mqtt')
    }
  })
})

// Receive messages
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
////////////////////////////////////////////////////////////////////////////////////////////////////
function findBinaryOnesPositions(num) {
  let positions = [];
  let binaryString = (num >>> 0).toString(2); // Convert number to a 32-bit binary string
  for (let i = binaryString.length - 1; i >= 0; i--) {
      if (binaryString[i] === '1') {
          positions.push(binaryString.length - 1 - i);
      }
  }
  return positions;
}

// Function to read JSON and apply the findBinaryOnesPositions function
function processEscenarios(json) {
  let data = JSON.parse(json);
  let result = {};

  for (let key in data.escenarios) {
      let escenario = data.escenarios[key];
      result[key] = escenario.map(findBinaryOnesPositions);
  }

  return result;
}

// Fetch data from the server and process it
fetch('/random')
  .then(response => response.text()) // Use text() instead of json() to log raw response
  .then(data => {
    console.log('Raw response:', data);
    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      return;
    }
    let result = processEscenarios(JSON.stringify(jsonData));
    console.log(result);
  })
.catch(error => console.error('Error:', error));


// Example usage:
let jsonData = '{"fases":{"1":[6]},"escenarios":{"1":[0,614006784,1638400,614006784,1638400,614006784,1638400,614006784,1638400,614006784,1226375168,2451062784,2449997824,2451062784,2449997824,2451062784,2449997824,2451062784,2449997824,2451062784,2452127744,2428698624,2428567552,2428698624,2428567552,2428698624,2428567552,2428698624,2428567552,2428698624,2428829696,1]},"ciclos":{"1":[0,10000,375,375,375,375,375,375,375,375,3000,10000,375,375,375,375,375,375,375,375,3000,12000,375,375,375,375,375,375,375,375,3000],"2":[0,5000,375,375,375,375,375,375,375,375,3000,12000,375,375,375,375,375,375,375,375,3000,15000,375,375,375,375,375,375,375,375,3000],"3":[0,10000,375,375,375,375,375,375,375,375,3000,21000,375,375,375,375,375,375,375,375,3000,10000,375,375,375,375,375,375,375,375,3000],"4":[0],"5":[0],"6":[0],"7":[0],"8":[0]},"eventos":{"1":[5,0,1,0],"2":[12,0,2,10],"3":[17,0,3,20],"4":[0],"5":[0],"6":[0],"7":[0],"8":[0]}}';
let result = processEscenarios(jsonData);
console.log(result);

// Fetching JSON data from the URL and processing it
// fetch('/static')
//     .then(response => response.json())
//     .then(data => {
//         let result = processEscenarios(data);
//         console.log(result);
//     })
//     .catch(error => console.error('Error fetching data:', error));


// Instead of making requests to the full URL, use relative paths
// fetch('/random')
//   .then(response => response.json())
//   .then(data => {
//     let result = processEscenarios(data);
//     console.log(result);
//   })
//   .catch(error => console.error('Error:', error));

// for (let i = 0; i < 10; i++){
//   let positions = findBinaryOnesPositions(4294967295-i);
//   console.log(4294967295-i);
//   console.log(positions); // Output: [0, 2, 3, 4]
// }

// Example usage:
//let number = 4294967295; // 29 in binary is 11101

function int32ToBinary(num) {
  // Ensure the number is within the range of a 32-bit signed integer
  if (num < -2147483648 || num > 2147483647) {
      throw new RangeError("Number must be a 32-bit signed integer.");
  }

  // Initialize an array to hold the binary digits
  let binary = [];

  // Loop through each bit, starting from the least significant (rightmost)
  for (let i = 0; i < 32; i++) {
      // Use bitwise AND and shift operations to get the current bit value
      binary.push((num & (1 << i)) !== 0 ? 1 : 0);
  }

  // Join the array into a string and return it
  return binary.reverse().join('');
}

// Example usage:
let exampleInt = 2147483647; // Example integer
console.log(`The binary representation of ${exampleInt} is: ${int32ToBinary(exampleInt)}`);

// Using bitwise operators
let value = 4294967292; // Maximum value for an unsigned 32-bit integer
let unsignedInt32 = (value >>> 0) & 0xFFFFFFFF;
console.log(unsignedInt32); // Output: 4294967295

// Using typed arrays
let buffer = new ArrayBuffer(4);
let uint32Array = new Uint32Array(buffer);
uint32Array[0] = 4294967295;
console.log(uint32Array[0]); // Output: 4294967295
console.log(`The binary representation of ${uint32Array[0]} is: ${int32ToBinary(uint32Array[0])}`);
