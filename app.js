const express = require ('express');
const app = express ();
const Joi = require('@hapi/joi');
 
app.use(express.json());

const courses = [{id:1,name:'course1'},{id:2,name:'course2'},{id:2,name:'course2'}];


app.get('/',(req,res)=>{
	res.send ('Hello wORLD');
});

app.get('/api/courses',(req,res)=>{
res.send (courses);
});


app.get('/api/courses/:id',(req,res)=>{
	const course=	courses.find(c => c.id===parseInt(req.params.id));
	if(!course)//404
		res.status(404).send('The Course with given ID was not found');
	res.send(course);
});

app.post('/api/courses',(req,res)=> {

	const {error} = validateCourse(req.body);
	if(error){
		res.status(400).send(error.details[0].message);
		return;
	}

const course= {
	id:courses.length +1,
		name: req.body.name
};
	courses.push(course);
	res.send(course);
});

app.put('/api/courses/:id',(req,res) =>{
//Look up the course
//if not existing , return 404
const course=	courses.find(c => c.id===parseInt(req.params.id));
if(!course)//404
{
	res.status(404).send('The Course with given ID was not found');
	return;
}
//validate
//if invalid , return 400 - Bad reques
//const result = validateCourse(req.body);
const {error} = validateCourse(req.body);
if(error){
	res.status(400).send(error.details[0].message);
	return;}

//update the course 
console.log("here");
	course.name=req.body.name;
	res.send(course);
});



app.delete('/api/courses/:id',(req,res) =>{
	const course=	courses.find(c => c.id===parseInt(req.params.id));
	if(!course)//404
	{
		res.status(404).send('The Course with given ID was not found');
		return;
	}
	//DELEte
	const index= courses.indexOf(course);
	courses.splice(index,1);
//return same , course
res.send(course);
});
// app.get('/api/posts/:year/:month',(req,res)=>{
// 	//res.send (req.params);
// 	res.send (req.query);
// });

const port = process.env.PORT || 3000; 

app.listen(port , ()=> console.log(`Listening on port ${port}...`));



function validateCourse(course){
	const schema={

		name:Joi.string().min(3).required()
	
	};
	return Joi.validate(course,schema);	
}