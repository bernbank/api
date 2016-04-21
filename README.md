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

* Import sample mongodb dataset locally.

* Install mongodb library for node
```
npm install mongodb
```

* Start Application with 
```
npm install start
```

* Viw the API running: http://localhost:3000/








