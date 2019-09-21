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

## Data Structures
**Preliminary as of 9/20/2019**

**None of this is set in stone. All of it is subjec to change based on the needs of the team**

```
// PARENTS
  {
    "id": 1,
    "name": "Smith Family",
    "email": "test@test.com",
    "password": "test"
  }

// CHILDREN
  {
    "id": 1,
    "parent_id": 1,
    "fullname": "Bobby Smith"
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
    "id": 1,
    "name": "Dr Test Office MD",
    "email": "drtest@test.com",
    "password": "test"
  }

// PARENT_DOCTOR_DETAIL
{
    "id": 1,
    "doctor_id": 1,
    "parent_id": 1,
    "permission_requested": 1,
    "permission_granted": 1
}
```


## End Points

### Parents Table

**GET** on `https://bw4-immunization.herokuapp.com/api/parents`

Returns status **200** and a JSON array of all the parent accounts on the parents table.

```
[
    {
        "id": 1,
        "name": "Smith Family",
        "email": "test@test.com",
        "password": "test"
    }
]
```

**GET** on `https://bw4-immunization.herokuapp.com/api/parents/< ID >`

Returns status **200** and a JSON object of the parent account with specified ID

```
[
    {
        "id": 1,
        "name": "Smith Family",
        "email": "test@test.com",
        "password": "test"
    }
]
```

Returns status **404** if server could not find record with specified ID.

**POST** on `https://bw4-immunization.herokuapp.com/api/parents`

Database expects a JSON object of the new parent account:

**EXAMPLE:**
```
{
	"name": "New Parents",      // Required
	"email": "test1@test.com",  // Required. Must be unique
	"password": "test"          // Required. This will be hashed in future versions
}

```

Returns status **201** with a JSON object of the newly created parent account in the parents table.

```
{
  "id": 2,
  "name": "New Parents",
  "email": "test1@test.com",
  "password": "test"      
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
    "parent_id": 1,
    "fullname": "Bobby Smith"
  }
]
```

**GET** on `https://bw4-immunization.herokuapp.com/api/children/< ID >`

Returns status **200** and a JSON object of the child with specified ID

```
  {
    "id": 1,
    "parent_id": 1,
    "fullname": "Bobby Smith"
  }
```
Returns status **404** if server could not find record with specified ID.

**POST** on `https://bw4-immunization.herokuapp.com/api/children`

Server expects a JSON object of the new child

**EXAMPLE:**
```
{
	"parent_id": 1,           // Required - ID of the child's parent.
	"fullname": "New Child"   // Required
}
```

Returns status **201** and a JSON object of the new child record

```
{
  "id": 2,
  "parent_id": 1,
  "fullname": "New Child"
}
```

Returns status **500** if a required field is missing

### Doctors Table

**GET** on `https://bw4-immunization.herokuapp.com/api/doctors`

Returns status **200** with an array of all the doctors in the doctors table.

```
[
  {
    "id": 1,
    "name": "Dr Test Office MD",
    "email": "drtest@test.com",
    "password": "test"              // This will be hashed in future versions
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
	"name": "New Doctor",
	"email": "test2@test.com",
	"password": "test"
}
```

Returns status **201** and a JSON object of the new doctor record

```
{
  "id": 2,
  "name": "New Doctor",
  "email": "test2@test.com",
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
    "doctor_id": 1,
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
    "doctor_id": 1,
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
    "child_id": 1,              // Required. ID of the child the immunization was administered TO
    "doctor_id": 1,             // Required. ID of the doctor the immunization was administered BY
    "name": "Polio Vaccine",    // Required. Name of the immunization
    "date_administered": "2019-09-19T21:01:23.369Z",      // Required
    "location": "Left arm"                                // Required
}
```

Returns status **201** and a JSON object of the new immunization record

```
{
  "id": 2,
  "child_id": 1,
  "doctor_id": 1,
  "name": "Polio Vaccine",
  "date_administered": "2019-09-19T21:01:23.369Z",
  "location": "Left arm"
}
```

Returns status **500** if a required field is missing


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

