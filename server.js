const express = require('express');
const app = express();

app.use(express.json());

var hotel = [
{
	custname : "John Enosh",
	type : "economy",
	roomnum : 1
},
{
	custname : "chowda",
	type : "luxury",
	roomnum : 2
},
{
	custname : "punit",
	type : "luxury",
	roomnum : 3
},
{
	custname : "palash",
	type : "economy",
	roomnum : 4
}
]
app.get('/',(req,res)=> res.send('GET Requests: \n/hotel to get data of all rooms\n/hotel/roomnum to get data of a particular room with the entered room number\n\nPOST Request: \n/hotel request body with {custname,type} by entering the necessary details against the specified keys \n\nPUT Request:\n/hotel/roomnum to replace details of the specified room number \n\nDELETE Request: \n/hotel/roomnum to delete the record with the specified room number  '));
app.get('/hotel',(req,res)=> res.send(hotel));
app.get('/hotel/:id',(req, res)=> {
	const room = hotel.find(s => s.roomnum === parseInt(req.params.id));
	if(!room) res.status(404).send('room not found');
	res.status(200).send(room);
});

app.post('/hotel',(req, res)=> {

	let room = {
		custname : req.body.custname,
		type : req.body.type,
		roomnum : hotel.length + 1
	}

	hotel.push(room);
	res.status(201).send(room);

});

app.put('/hotel/:id',(req, res) => {
	let room = hotel.find(s => s.roll === parseInt(req.params.id));

	if(!room) res.status(404).send('Room not found');

	room = {custname : req.body.custname,
			   type : req.body.type,
				roomnum : req.params.roomnum};

	res.status(200).send(room);
});

app.delete('/hotel/:id',(req, res)=>{
	const room = hotel.find(s => s.roomnum === parseInt(req.params.id));
	if(!room) res.status(404).send('Room not found');

	const index = hotel.indexOf(room);
	hotel.splice(index,1);
	res.status(200).send(hotel);
});


app.listen(3000,console.log('Express Server is listening @ port 3000'));