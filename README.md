# Bernbank API docs

## Pledges Collection

### POST /pledges
Creates a new pledge entity in the collection
#### Request
##### Schema
```json
{
    "email": "string (required)",
    "amount": "number (required)"
}
```

#### Responses
* 200 OK
```json
{
    "_id": "uuid",
    "email": "string",
    "amount": "number"
}
```
* 400 Pledge cannot be null or undefined
* 400 Pledge must be an object
* 400 Pledge cannot be empty
* 400 Pledge must have an associated email property
* 400 Pledge must have a valid formatted email address

### GET /pledges/:email
Fetches a pledge by email address
#### Request
##### Params
* email - The user's email address

#### Responses
* 200 OK
```json
{
    "_id": "uuid",
    "email": "string",
    "amount": "number"
}
```
* 404 Pledge not found

### DELETE /pledges/:email
Deletes a pledge by email address
#### Request
##### Params
* email - The user's email address

#### Responses
* 204 No Content


### GET /pledges/?date=YYYY-MM-DD
Gets the total number of pledges done on a specific date.
#### Request
##### Params
* Query parameter 'date' is required and needs to have the format YYYY-MM-DD
#### Responses
* 200 OK
```json
{"total":"number"}'
```


## Daily Call Logs Collection

### PUT /dailyCallLogs/:date
Fetches and stores caller data from BerniePB by date
#### Request
##### Params
* date - The date for which to store the data.  The date should be in the format of YYYY-MM-DD.

#### Responses
* 204 No Content

## Installation
* Install the latest NodeJS version (on Ubuntu):
```
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
```

* Clone repository
```
git clone https://github.com/bernbank/api.git
```

* Enter API directory
```
cd api
```

* Install dependencies in package.json 
```
npm install
```

* Install mongodb on your server following these instructions (Ubuntu) : https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/

*  To import a sample mongodb dataset locally, run the following PUT request form Python's command line interface (You need to have Requests library installed)
```
import requests
r = requests.put('http://localhost:3000/dailyCallLogs/2016-04-21');
```

* Install mongodb library for node
```
npm install mongodb
```

* Start Application with 
```
npm install start
```

* Viw the API running: http://localhost:3000/








