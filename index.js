import express from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from './services/verifyAuth.js';

const port = 5000;

const app = express();

app.use(express.json());

app.post('/api/login', (req, res) => {
	const user = {
		id:Date.now(),
		userEmail:'example@gmail.com',
		password:'123'
	};

	jwt.sign({user},'secretkey',(err, token)=>{
		res.json({ token });
	});
});

app.get('/api/profile', verifyToken, (req,res)=>{

	jwt.verify(req.token,'secretkey',(err, authData)=>{
		if(err) {
			res.sendStatus(403);
			return;
		}

		res.json({
			message:"Welcome to Profile",
			userData:authData
		});
	})
});

app.listen(port,err=>{
	if(err) {
		console.log(err);
	}
	console.log(`Server Started on PORT ${port}`);
})