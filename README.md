# Immunization Tracker - Back-End

**Developer:** Travis Little

**Cohort:** WebPT6

## Libraries / Technology

- JavaScript
- Node
- Express
- Knex

## Accesing the database endpoints

**App database root URL:** `https://bw4-immunization.herokuapp.com/`

Scroll down to End Points section for end points.

## Register and Login

### Parents Register
`https://bw4-immunization.herokuapp.com/api/parents/register`

**Expected JSON object EXAMPLE:**
```
{
	"email": "newfamily@email.com",     // Required. Unique.
	"password": "test",                 // Required.
	"firstname": "Jane",                // Required.
	"lastname": "Johnson",              // Required.
	"dob": "1986-09-19T21:01:23.369Z",  // Required. ISO String
	"street": "987 New Address Way",    // Required.
	"city": "San Jose",                 // Required.
	"state_province": "California",     // Required.
	"phonenumber": "555-555-1234"       // Required.
}
```

Returns status **201** with the new parent account JSON object
```
{
  "parent": {
    "id": 2,
    "email": "newfamily@email.com",
    "password": "HASHEDPASSWORD"          // Future versions of API will not include the password
    "firstname": "Jane",
    "lastname": "Johnson",
    "dob": "1986-09-19T21:01:23.369Z",
    "street": "987 New Address Way",
    "street2": null,
    "city": "San Jose",
    "state_province": "California",
    "phonenumber": "555-555-1234",
    "permission_granted": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoibmV3ZmFtaWx5QGVtYWlsLmNvbSIsInR5cGUiOiJwYXJlbnQiLCJpYXQiOjE1NjkyODM1NjUsImV4cCI6MTU2OTM2OTk2NX0.RC70OvFwh0qtnb_2TpW4Pkt6ZNe1_T0erg8LOpoooAo"
}
```

**TOKEN INFO**
Expires In: 1 day - final project will be lower

### Parents Login
`https://bw4-immunization.herokuapp.com/api/parents/login`

**Expected JSON Object Example**
```
{
	"email": "newfamily@email.com",   // Required
	"password": "test"                // Required
}
```

Returns status **200** with a welcome message and token
```
{
  "message": "Logged in as newfamily@email.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoibmV3ZmFtaWx5QGVtYWlsLmNvbSIsInR5cGUiOiJwYXJlbnQiLCJpYXQiOjE1NjkyODM2MTAsImV4cCI6MTU2OTM3MDAxMH0.w2-eCALqVlr7EDmuobhvYzk269Q8ZWN6rEBhbzg3EVU"
}
```

**COMING SOON:**
In future versions of this API, logging in will send back the parent's account data, their children, their doctors, and their children's immunization records in the body of the response.

### Doctors Register
`https://bw4-immunization.herokuapp.com/api/doctors/register`

**Expected JSON object EXAMPLE**
```
{
    "email": "example@example.com",
    "password": "test"
}
```
Returns status **201** with a JSON object of the new doctor

```
{
  "doctor": {
    "id": 3,
    "name": "New Doctors Office",
    "username": "newdoctor1",
    "email": "newdoctortest1@test.com",
    "password": "HASHEDPASSWORD"          // Future versions of API will not include the password
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoibmV3ZG9jdG9ydGVzdDFAdGVzdC5jb20iLCJ0eXBlIjoiZG9jdG9yIiwiaWF0IjoxNTY5Mjg0MTQ3LCJleHAiOjE1NjkzNzA1NDd9.eiXJY2MVnxpnUAAZ83X4PtNORDJ-CAGpSxUlEB5N4Ik"
}
```

### Doctors Login
`https://bw4-immunization.herokuapp.com/api/doctors/login`

Returns status **200** with a welcome message and a token

```
{
  "message": "Logged in as newdoctortest1@test.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoibmV3ZG9jdG9ydGVzdDFAdGVzdC5jb20iLCJ0eXBlIjoiZG9jdG9yIiwiaWF0IjoxNTY5Mjg2NDcyLCJleHAiOjE1NjkzNzI4NzJ9.7k97gwdpo7kdaprQAXC0VJz7EDBZT3_3LbABrWuHIJc"
}
```
**COMING SOON:**
In future versions of this API, logging in will send back the doctor's account data, their immunizations, and parents they're related to.

## Data Structures
**as of 9/22/2019**

**None of this is set in stone. All of it is subject to change based on the needs of the team**

```
// PARENTS
  {
    "id": 1,
    "email": "test@test.com",
    "password": "test",
    "firstname": "Jack",
    "lastname": "Smith",
    "dob": "1980-09-19T21:01:23.369Z",
    "street": "125 Address Way",
    "street2": null,
    "city": "A Big City",
    "state_province": "California",
    "phonenumber": "555-555-1234",
    "permission_granted": 0           // Boolean. 1 = TRUE, 0 = FALSE. Defaults to 0
  }

// CHILDREN
  {
    "id": 1,
    "parent_id": 1,
    "fullname": "Bobby Smith",
    "dob": "2019-05-19T21:01:23.369Z"
  }

// IMMUNIZATIONS
  {
    "id": 1,
    "child_id": 1,
    "doctor_id": 1,
    "name": "Measels Vaccine",
    "date_administered": "2019-09-19T21:01:23.369Z",
    "location": "Right arm"
  }

// DOCTORS
  {
    "id": 2,
    "name": "Test Doctors Office",
    "username": "testdoctor",
    "email": "doctortest@test.com",
    "password": "test"
  }

// PARENT_DOCTOR_DETAIL
{
    "id": 1,
    "doctor_id": 1,
    "parent_id": 1,
    "permission_requested": 1,        // Boolean. 1 = TRUE, 0 = FALSE. Defaults to 0
    "permission_granted": 1           // Boolean. 1 = TRUE, 0 = FALSE. Defaults to 0
}
```


## End Points

### Parents Table

**GET** on `https://bw4-immunization.herokuapp.com/api/parents`

Returns status **200** and a JSON array of all the parent accounts on the parents table.

```
[
  {
      "email": "balabb@email.com",
      "password": "test",
      "firstname": "Bob",
      "lastname": "Johnson",
      "dob": "1986-09-19T21:01:23.369Z",
      "street": "987 New Address Way",
      "city": "San Jose",
      "state_province": "California",
      "phonenumber": "555-555-1234",
      "permission_granted": 1
  }
]
```

**GET** on `https://bw4-immunization.herokuapp.com/api/parents/< ID >`

Returns status **200** and a JSON object of the parent account with specified ID

```
[
  {
    "id": 1
    "email": "balabb@email.com",
    "password": "test",
    "firstname": "Bob",
    "lastname": "Johnson",
    "dob": "1986-09-19T21:01:23.369Z",
    "street": "987 New Address Way",
    "city": "San Jose",
    "state_province": "California",
    "phonenumber": "555-555-1234",
    "permission_granted": 1
  }
]
```

Returns status **404** if server could not find record with specified ID.

**POST** on `https://bw4-immunization.herokuapp.com/api/parents`

Database expects a JSON object of the new parent account:

**EXAMPLE:**
```
{
	"email": "balabb@email.com",
	"password": "test",
	"firstname": "Bob",
	"lastname": "Johnson",
	"dob": "1986-09-19T21:01:23.369Z",
	"street": "987 New Address Way",
	"city": "San Jose",
	"state_province": "California",
	"phonenumber": "555-555-1234",
	"permission_granted": 1
}

```

Returns status **201** with a JSON object of the newly created parent account in the parents table.

```
{
    "id": 1,
    "email": "newfamily2@email.com",
    "password": "$2a$04$SYYxMrfTdhcXse/yy1s4WugDgBkCgItj.SJ.NudU0TzsOK.WMPUyu",
    "firstname": "Jack",
    "lastname": "Smith",
    "dob": "1980-09-19T21:01:23.369Z",
    "street": "125 Address Way",
    "street2": null,
    "city": "A Big City",
    "state_province": "California",
    "phonenumber": "555-555-1234",
    "permission_granted": 0
}

```

Returns status **500** if a required field is missing or email is not unique

```
{
  "message": "Could not add parent to server",
  "dbError": {
    "errno": 19,
    "code": "SQLITE_CONSTRAINT"
  }
}
```

### Children Table

**GET** on `https://bw4-immunization.herokuapp.com/api/children`

Returns status **200** with an array of all the children in the children table.

```
[
  {
    "id": 1,
    "parent_id": 2,
    "fullname": "Bobby Smith",
    "dob": "2019-05-19T21:01:23.369Z"
  }
]
```

**GET** on `https://bw4-immunization.herokuapp.com/api/children/< ID >`

Returns status **200** and a JSON object of the child with specified ID

```
  {
    "id": 1,
    "parent_id": 1,
    "fullname": "Bobby Smith",
    "dob": "2019-05-19T21:01:23.369Z"
  }
```
Returns status **404** if server could not find record with specified ID.

**POST** on `https://bw4-immunization.herokuapp.com/api/children`

Server expects a JSON object of the new child

**EXAMPLE:**
```
{
    "parent_id": 1,
    "fullname": "Bobby Smith",
    "dob": "2019-05-19T21:01:23.369Z"
}
```

Returns status **201** and a JSON object of the new child record

```
{
    "id": 1,
    "parent_id": 1,
    "fullname": "Bobby Smith",
    "dob": "2019-05-19T21:01:23.369Z"
}
```

Returns status **500** if a required field is missing

### Doctors Table

**GET** on `https://bw4-immunization.herokuapp.com/api/doctors`

Returns status **200** with an array of all the doctors in the doctors table.

```
[
  {
    "id": 2,
    "name": "Test Doctors Office",
    "username": "testdoctor",
    "email": "doctortest@test.com",
    "password": "test"
  }
]
```

**GET** on `https://bw4-immunization.herokuapp.com/api/doctors/< ID >`

Returns status **200** and a JSON object of the doctor with specified ID

```
  {
    "id": 1,
    "name": "Dr Test Office MD",
    "email": "drtest@test.com",
    "password": "test"              // This will be hashed in future versions
  }
```
Returns status **404** if server could not find record with specified ID.

**POST** on `https://bw4-immunization.herokuapp.com/api/doctors`

Server expects a JSON object of the new doctor

**EXAMPLE:**
```
{
    "name": "New Doctors Office",
    "username": "newdoctor",
    "email": "newdoctortest@test.com",
    "password": "test"
}
```

Returns status **201** and a JSON object of the new doctor record

```
{
  "id": 3,
  "name": "New Doctors Office",
  "username": "newdoctor",
  "email": "newdoctortest@test.com",
  "password": "test"
}
```

Returns status **500** if a required field is missing



### Immunization Table

**GET** on `https://bw4-immunization.herokuapp.com/api/immunizations`

Returns status **200** with an array of all the immunizations in the immunizations table.

```
[
  {
    "id": 1,
    "child_id": 1,
    "doctor_id": 2,
    "parent_id": 2,
    "name": "Measels Vaccine",
    "date_administered": "2019-09-19T21:01:23.369Z",
    "location": "Right arm"
  }
]
```

**GET** on `https://bw4-immunization.herokuapp.com/api/immunizations/< ID >`

Returns status **200** and a JSON object of the immunization with specified ID

```
  {
    "id": 1,
    "child_id": 1,
    "doctor_id": 2,
    "parent_id": 2,
    "name": "Measels Vaccine",
    "date_administered": "2019-09-19T21:01:23.369Z",
    "location": "Right arm"
  }
```
Returns status **404** if server could not find record with specified ID.

**POST** on `https://bw4-immunization.herokuapp.com/api/immunizations`

Server expects a JSON object of the new immunization

**EXAMPLE:**
```
  {
    "child_id": 1,
    "doctor_id": 2,
    "parent_id": 2,
    "name": "Measels Vaccine",
    "date_administered": "2019-09-19T21:01:23.369Z",
    "location": "Right arm"
  }
```

Returns status **201** and a JSON object of the new immunization record

```
{
    "id": 1,
    "child_id": 1,
    "doctor_id": 2,
    "parent_id": 2,
    "name": "Measels Vaccine",
    "date_administered": "2019-09-19T21:01:23.369Z",
    "location": "Right arm"
  }
```

Returns status **500** if a required field is missing

### Other End Points

#### FOR DOCTORS

**Doctor to request permission to edit a parent account**

- Doctor request to permission to edit a Parent account.
- Must enter doctor ID and parent ID into URL as paramaters, see below for example.

PUT `https://bw4-immunization.herokuapp.com/api/doctors/request-permission/<doctor_id>/<parent_id>`

**EXAMPLE:** PUT `https://bw4-immunization.herokuapp.com/api/doctors/request-permission/1/1`

**EXAMPLE RESPONSE:**
```
{
  "message": "Requested permission to edit account for parent 1",
  "updatedParentDoctorDetail": [
    {
      "id": 3,
      "doctor_id": 1,
      "parent_id": 1,
      "permission_requested": 1,
      "permission_granted": 0
    }
  ]
}
```

**Doctor to REVOKE request permission to edit a parent account**

- Doctor request to permission to edit a Parent account.
- Must enter doctor ID and parent ID into URL as paramaters, see below for example.

PUT `https://bw4-immunization.herokuapp.com/api/doctors/revoke-request-permission/<doctor_id>/<parent_id>`

**EXAMPLE:** `https://bw4-immunization.herokuapp.com/api/doctors/revoke-request-permission/1/1`

**EXAMPLE RESPONSE:** 
```
{
  "message": "Revoking request to edit parent: 1",
  "updatedParentDoctorDetail": [
    {
      "id": 3,
      "doctor_id": 1,
      "parent_id": 1,
      "permission_requested": 0,
      "permission_granted": 0
    }
  ]
}
```

**Get all parent records with doctor**

GET `https://bw4-immunization.herokuapp.com/api/doctors/parent/<doctor_id>`

**EXAMPLE:** `https://bw4-immunization.herokuapp.com/api/doctors/parent/1`

**EXAMPLE RESPONSE:** Returns an ARRAY of all parents related to the given doctor_id
```
[
  {
    "parent_id": 1,
    "firstname": "Jack",
    "lastname": "Smith",
    "email": "newfamily2@email.com",
    "dob": "1980-09-19T21:01:23.369Z",
    "street": "125 Address Way",
    "city": "A Big City",
    "state_province": "California",
    "phonenumber": "555-555-1234",
    "PARENT_permission_granted": 0,
    "permission_granted": 0,
    "permission_requested": 0
  }
]
```

**Get all Immunization records with doctor ID**

GET `https://bw4-immunization.herokuapp.com/api/doctors/immunizations/doctor/<doctor_id>`

**EXAMPLE:** `https://bw4-immunization.herokuapp.com/api/doctors/immunizations/doctor/1`

**EXAMPLE RESPONSE:** Returns an ARRAY of all Immunizations related to the given doctor_id
```
[
  {
    "id": 1,
    "child_id": 1,
    "doctor_id": 1,
    "parent_id": 1,
    "name": "Measels",
    "date_administered": "2019-09-19T21:01:23.369Z",
    "location": "Right arm"
  }
]
```


### Parent Doctor Detail Table
**END POINTS ARE NOT IMPLEMENTED FOR THIS TABLE YET**

This table holds the data which links doctors to parents, and the data relevant between them (such as if the parents have granted access to the doctor to add/edit immunization records). Data in this table will likely be incorporated into the existing  `/api/parents`, `/api/doctors`, `/api/immunizations` end points.
```
{
    "id": 1,
    "doctor_id": 1,                 // Required.  ID for the doctor of the parent
    "parent_id": 1,                 // Required.  ID for the parent  
    "permission_requested": 1,      // Boolean. 1 = true, 0 = false, 0 is default. 
    "permission_granted": 1         // Boolean. 1 = true, 0 = false, 0 is default.  
}
```

#### Doctor / Parent permissions - Preliminary


**permission_requested:**  Has the doctor requested permission to add/edit records? Boolean. 1 = true, 0 = false, 0 is default.

**permission_granted:** Have the parents granted permission to add/edit records? Boolean. 1 = true, 0 = false, 0 is default.

