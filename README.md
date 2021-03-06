#  DATABASE TABLES

* Database is seeded with users and plant data
* User names are: Alpha, Beta, Gamma, Delta
* All passwords are '1234'

### Users

| attribute      | data type | required                |
|----------------|-----------|-------------------------|
| user_id        | integer   | auto-assigns            |
| username       | string    | Yes + must be unique    |
| password       | string    | Yes                     |
| phone_number   | string    | Yes + must be unique *  |

* NOTE: phone_number format (###-###-####) to be enforced on client side 


### Plants

| attribute           | data type | required     |
|---------------------|-----------|--------------|
| plant_id            | integer   | auto-assigns |
| plant_nickname      | string    | Yes          |
| species_id (FK)     | integer   | Yes          |
| user_id (FK)        | integer   | Yes          |

* FK: foreign key

### Species

| attribute         | data type | required     |
|-------------------|-----------|--------------|
| species_id        | integer   | auto-assigns |
| species_name      | string    | Yes          |
| h2o_frequency     | integer   | Yes          |
| image             | string    | No           |

- FK: foreign key
- Image is a URL 



#  API END POINTS

* Base URL: https://water-my-plants-build-week.herokuapp.com/

### Authentication End Points

##### Register
* Method: POST
* URL: '/api/auth/register' 
* Requires: { username, password, phone_number } 
* Returns:  { user_id, username, phone_number }

##### Login
* Method: POST
* URL: '/api/auth/login' 
* Requires: { username, password }
* Returns:  { user_id, username, token }

##### Update (Restricted)
* Method: PUT
* URL: '/api/auth/update' 
* Requires: { user_id, password, phone_number } 
* Returns:  { user_id, phone_number }

### Plant End Points ##

##### Get By User ID
* Method: GET
* URL: '/api/plants/:user_id' 
* Requires: user_id (nothing in the body, just in the URL param)  
* Returns: { plant_id, plant_nickname, species_name, h2o_frequency, image, species_id }

##### Create Plant w. User ID
* Method: POST
* URL: '/api/plants/:user_id' 
* Requires: { plant_nickname, species_name, h2o_frequency }  
* Returns:  { plant_id, plant_nickname, species_name, h2o_frequency, image, species_id }
* Note: Creating a plant with an existing name, will set the h2o_frequency with the value in the database, not what is provided.

##### Update Plant w. Plant ID
* Method: PUT
* URL: '/api/plants/:plant_id' 
* Requires: { plant_nickname, species_name, h2o_frequency, species_id }  
* Returns:  { plant_id, plant_nickname, species_name, h2o_frequency, image, species_id }
* Note: Updating a plant with an existing name but a different h2o_frequency than what is found in the database, will update the database. A new species name will create a new species in the database

##### Delete Plant w. Plant ID
* Method: DELETE
* URL: '/api/plants/:plant_id' 
* Requires: nothing  
* Returns:  nothing
