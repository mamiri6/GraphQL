const express=require('express');
const graphqlHTTP=require('express-graphql');
const schema=require('./schema/schema.js');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();
app.use(cors());
//Connect to MongoDB

mongoose.connect('mongodb+srv://amiri:amiri@cluster0-w5wml.mongodb.net/qlMehdi?retryWrites=true&w=majority');
mongoose.connection.once('open',()=>{
  console.log('connected to database');

});

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://amiri:amiri@cluster0-w5wml.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology:true});
client.connect(err=>
{
  const collection = client.db("qlMehdi").collection("authors");

   if(err) {  console.log('ERROR'+err); }
   else
      console.log('Connected');

}
);
/*
client.connect(err => {
    if(err)
      console.log('ERROR');

    console.log('connected to database');


    //console.log('connected to database');  client.close();
}
);
*/
app.use('/graphql',graphqlHTTP(
  {
    schema,
    graphiql:true

  }

));

app.listen(4000,()=> {

  console.log('this app is running on port 4000');
});
