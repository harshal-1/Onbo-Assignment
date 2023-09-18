Steps to run the project:

1. Unzip the attached zip file
2. Open 'Onbo Assignment' folder in the code editor such as VS Code
3. Open Terminal
4. Run "npm install" to install the node modules
5. Run "npm install nodemon" to install nodemon
6. Run "npm start" to run the script file
7. Test the endpoints in an api testing application such as Postman

The sample data has been added to the database for testing purpose which could also be viewed in 'records.json' file for reference  attached in the zip

The postman_collection named 'Onbo.postman_collection.json' is also attached in the zip file and endpoints for testing along with other information could be found there

But for the convinience I have listed All the required endpoints along with type of requests and kind and sample data in form of examples to test below


1. Creating a Record:

POST Request on "http://127.0.0.1:3000/api/v1/data"
Data to pass should be in format of json
Eg:
{
    "climate": "humid",
    "area_code": 151,
    "temperature": 5,
    "humidity": 62,
    "chances_of_rain": 35
}

2. Getting All Records:

GET Request on "http://127.0.0.1:3000/api/v1/data"

3. Getting Records for an area:

GET Request on "http://127.0.0.1:3000/api/v1/data/{area_code}"
Eg:
"http://127.0.0.1:3000/api/v1/data/101"

4. Getting Records for particular climate in an area:

GET Request on "http://127.0.0.1:3000/api/v1/data/{area_code}/{climate}"
Eg:
"http://127.0.0.1:3000/api/v1/data/101/hot"

5. Getting Special Data:

GET Request on "http://127.0.0.1:3000/api/v1/data/getFormattedData"
Data to pass should be in format of json
Eg:
{
  "from_climate": "hot",
  "to_climate": "humid",
  "area_code": 101
}
