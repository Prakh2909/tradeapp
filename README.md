# tradeapp

Technical Stack:
Nodejs
Express
MongoDB 

Database:
	MongoDB Atlas (Cloud Based)

Deployment:
	Heroku

Version control:
	Git/Github

Database Design:
{
		type:  	  String  	 “buy”/”sell”   		  default: buy   
		ticker: 	String  	 “tcs/wipro/..”   		Required
		price:  	Int      	 Any +ve value		    Required
		share: 	  Int   		 Any +ve Value		    Required
}

Link:  https://prakhar-trade-app.herokuapp.com/
Source Code: https://github.com/Parker29/tradeapp


API endpoints:
POST /trade : to add a trade in the portfolio

PATCH /trade/:id : to update a trade by its id

DELETE /trade/:id : to delete a trade by its id

GET /portfolio : to get all the securities and trades corresponding to it.

GET /trade : to get the aggregate view of all securities in the portfolio with its final quantity and average buy price

GET /returns : to get the returns . Assuming current price: 100
