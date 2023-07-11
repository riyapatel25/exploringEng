
# WIE EXPLORING ENG

# HOW TO RUN THE CODE

## To run backend:
  - cd into "backend" folder
  - npm install dependencies
  - run on port `localhost:3000` (frontend depends on backend running on port 3000)

  Available routes on backend.

```
/api/getMatchingPrograms
```
  - main endpoint that frontend calls to return matched rebate programs
  - computes the dollars available given the product price
```
/api/productNames
```
  - matches product input passed in, with the product table by concatenating the manufactuerer and model strings
  - this is for the dropdown menu

### Routes that returns data from each table

```
/api/products
/api/programs
/api/zips
/api/zip_program_junction
```
...
## To run frontend:
  - make sure backend is running
  - cd into "rebateapp" folder
  - npm install dependencies
  - run on `localhost`, any port other than `3000`
 

# COOL THINGS I ADDED

1. UI works/scales on different devices
2. Dynamically checking conditions
   - in this route: `/api/getMatchingPrograms` instead of hard coding the conditions, it reads in a list of conditions from the `conditions.json` file
   - if we wanted to add more conditions, this supports changing schemas over time -> would only need to update conditions.json
4. Populating prodoct dropdown thorugh API call
   - instead of hardcoding the dropdown menu for products available, calls the `/api/productNames` route 
   - if we wanted to add more products this supports changing schemas over time
5. Reusable components
6. Error handling

# TECH STACK

1. React
2. Javascript
3. Bootstrap
4. Express

# FUTURE IMPROVEMENTS

1. Scaling CSS properties better depending on the device (Bootstrap display utility classes)
2. Adding sorting functionality to the returned rebate programs
3. Better looking UI
4. Making code more dynamic to support extensibility
    - similar to how I made the conditions/ product dropdown dynamic -> extend this idea to different parts of the code
6. Better error handling -> very basic right now


# SOME SAMPLE TESTS TO RUN  
Go to Rebates Tab

--------------------------------------------------------------------------
  - Product: everything works
  - Zipcode: 94117 
  - Product Price: any integer value (no commas/special chars)
--------------------------------------------------------------------------
  - enter an invalid zipcode to see error response
--------------------------------------------------------------------------
  - don't select a product to see error response
--------------------------------------------------------------------------
  First try this-> shouldn't display any rebates
  - Product: program one
  - Zipcode: 94117 
  - Product Price: any integer value (no commas/special chars)
    
  Next get rid of second condition which is for network required in conditions.json -> should display product "mama" since that condition isn't required anymore
  - Product: program one
  - Zipcode: 94117 
  - Product Price: any integer value (no commas/special chars)
--------------------------------------------------------------------------
  - test dollar returned values for different price inputs
--------------------------------------------------------------------------
