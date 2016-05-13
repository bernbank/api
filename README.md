# Bernbank API docs

## Pledges Collection

### POST /api/pledges/:email
Creates a new pledge entity in the collection
#### Request
##### Schema
```json
{
    "email": "string (required)",
    "amount": "integer (required) (Amount of cents to pledge)"
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
* 400 Pledge must have an amount present
* 400 Pledge must be an integer from 1 to 10000.

### GET /api/pledges/:email
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

### DELETE /api/pledges/:email
Deletes a pledge by email address
#### Request
##### Params
* email - The user's email address

#### Responses
* 204 No Content


### GET /api/pledges/?date=YYYY-MM-DD
Gets the total number of pledges done on a specific date.
#### Request
##### Params
* Query parameter 'date' is required and needs to have the format YYYY-MM-DD
#### Responses
* 200 OK
```json
{
  "total":"number",
  "call_threshold" : "number"
}'
```


### GET /api/pledges/?total
Gets the total number of pledges of all time.
#### Request

##### Params
* Query parameter 'total' is required

#### Responses
* 200 OK
```json
{ 
  "total":"number",
  "amount" : "number", 
}'
```

### GET /api/pledges/?historic
Gets the total number of pledges for every day from all time
#### Request

##### Params
* Query parameter 'historic' is required

#### Responses
* 200 OK
```json
[
  {
    "total": "number",
    "amount": "number",
    "date": "string"
  },
]
```

## Daily Call Logs Collection

### PUT /api/dailyCallLogs/:date
Fetches and stores caller data from BerniePB by date
#### Request
##### Params
* date - The date for which to store the data.  The date should be in the format of YYYY-MM-DD.

#### Responses
* 204 No Content

### GET /api/dailyCallLogs/total
Gets the total number of Ring Makers of all time
#### Request
##### Params

#### Responses
* 200 OK
```json
{ "total": "number",
  "data": 
   [ 
       { "_id": "uuid",  "date": "string", "total": "number" },
       { "_id": "uuid",  "date": "string", "total": "number" }
   ] 
}
```
* 404 Pledge not found


### GET /api/dailyCallLogs/total?date=YYYY-MM-DD
Gets the total number of Ring Makers of all time
#### Request
##### Params
* date  - Date in format YYYY-MM-DD

#### Responses
* 200 OK
```json
{
    "_id": "uuid",
    "date": "string",
    "total": "integer"
}
```

* 404 Pledge not found


## Mailing list

### GET /api/mailing/unsubscribe/:email 
Removes an email from mailing ist.
#### Request
##### Params
* email - The email to be deleted from the database

#### Responses
* 301 Redirects to http://berniebank.com

### DELETE /api/mailing/:email
Removes an email from mailing ist.
#### Request
##### Params
* email - The email to be deleted from the database

#### Responses
* 200 OK

```json 
{
    "_id": "uuid",  
    "email": "string", 
    "active": "boolean" 
    "firstname": "number" 
    "lastname": "number" 
}
```


### POST /api/mailing/  
Inserts a bunch of emails into the database.
#### Request
##### Params
```json
[ 
   {"email": "string", "firstname": "number", "lastname": "number"  },
   {"email": "string", "firstname": "number", "lastname": "number"  }
] 
```
#### Responses
* 200 OK

### GET /api/mailing/send  
Send emails to all  users
#### Request
##### Params

#### Responses
* 200 OK


### GET /api/mailing/send?dryrun=target@gmail.com
Send a single email to just to the email in the 'dryrun' parameter.
#### Request
##### Params
* dryrun - The email target where the test email will be delivered.
#### Responses
* 200 OK


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
r = requests.put('http://localhost:3000/api/dailyCallLogs/2016-04-21');
```

* Install mongodb library for node
```
npm install mongodb
```

* Start Application with 
```
npm install start
```

* View the API running: http://localhost:3000/api/








