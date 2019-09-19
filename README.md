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
    "email": "smithfamily@email.com",
    "password": "foo"
    
}

// CHILDREN
{
    "id": 1,
    "parent_id": 1,
    "fullname": "Heather Smith",
    "dob": "1/1/2019"
}

// IMMUNIZATIONS
{
    "id": 1,
    "child_id": 1,
    "doctor_id": 1,
    "name": "Polio Vaccine",
    "date_administered": "3/1/2019",
    "location": "left arm"
}

// DOCTORS
{
    "id": 1,
    "name": "Dr Bob MD",
    "email": "drbob@email.com",
    "password": "foo"
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

## Schema



## End Points



