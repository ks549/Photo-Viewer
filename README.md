Photo Viewer

```javascript
"client": "webpack-dev-server --mode development --devtool inline-source-map --hot",
"server": "nodemon src/server/index.js",
"dev": "concurrently \"npm run server\" \"npm run client\""
```



```Instruction to run the code
step1: clone the repo
step2: npm install
step3: npm run dev
```

Technologies used:
•	Cloud Firestore| Firebase
•	Nodejs
•	Express
•	React hooks| ReactJS
•	Reducer
•	SCSS
Reason to use Firebase DB
•	It is cloud based. 
•	The provided data has no complicated relation.
•	When you validate my code, you no need to configure DB and load dump sql to load the data.
•	You can share the DB which I configured. I have embedded the authentication key in the code.
•	Whoever has access to my code can access the DB content.  
Time spent on Photo Viewer
	
Sno	Technology	Time Spent
1	Firebase DB	Research to choose DB, UI & back-end technologies – 1hour
Configure DB and load data -  1 hour
Set up DB connection and query to get expected – 30 mins

2	Node js	Node js using express framework +
Make server to listen to the request + 
API pagination and search API handled  - 3 hours
3	React hooks/ Reducer	Building page and reducer – 2 hours
4	SCSS	Styling + responsive – 30 mins
		Service Validation + UI validation -  30mins
Bug fixing + Code cleanup – 1 hour

