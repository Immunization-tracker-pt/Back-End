# Immunization Tracker - Back-End

**Developer:** Travis Little

**Cohort:** WebPT6

## Libraries / Technology

- JavaScript
- Node
- Express
- Knex

## Data Structures
**Preliminary as of 9/18/2019**

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

### Parents Data

**GET** on `/api/parents`

Returns status 200 and a JSON array of all the parent accounts on the parents table.

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

**POST** on `/api/parents`

Database expects a JSON object of the new parent account:

```
{
	"name": "New Parents",      // Required
	"email": "test1@test.com", // Required. Must be unique
	"password": "test"          // Required
}

```

Returns status 201 with a JSON object of the newly created parent account in the parents table.

```
{
  "id": 2,
  "name": "New Parents",
  "email": "test1@test.com",
  "password": "test"
}

```

Returns status 500 if a required field is missing or email is not unique

```
{
  "message": "Could not add parent to server",
  "dbError": {
    "errno": 19,
    "code": "SQLITE_CONSTRAINT"
  }
}
```

### Children Data

**GET** on `/api/children`

Returns status *200* with an array of all the children in the children table.

```
[
  {
    "id": 1,
    "parent_id": 1,
    "fullname": "Bobby Smith"
  }
]
```


