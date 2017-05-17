//funciton to get the responses sorted by updated, parameters are 1. the response array
//2. the size of the array you wish to return, 3. the tag that you want to filter by
const sortByUpdated = (responses, size, filter) => {
  //make a new array from the respones, and sort it based off the date of updated
  let newResponses = responses.slice().sort((a,b) => {
    //calls the helper function dateToNumber with the type that it wants to fitler by
    return dateToNumber(b, filter, 'updated') - dateToNumber(a, filter, 'updated');
  });
  //if the filter doesn't exist, then we slice it to make it equal the size asked
  if (!filter) return newResponses.slice(0, size);
  //if a filter exists, we put it through our filterByTag helper function
  return filterByTag(filter, newResponses, size);
}

//function to get the responses sorted through last executed. Parameters are the same
//as the sort by updated
const sortByLastExecuted = (responses, size, filter) => {
  //make a copy of the responses array and sort it based off of last executed
  let newResponses = responses.slice().sort((a,b) => {
    //calls the helper funciton dateToNumber but this time with the last parameter being the string
    //'last executed'
    return dateToNumber(b, filter, 'last executed') - dateToNumber(a, filter, 'last executed');
  });
  //if filter doesn't exist, return an array with the required size
  if (!filter) return newResponses.slice(0, size);
  //or else we return it through our helper function
  return filterByTag(filter, newResponses, size);
}

//helper function to help us parse our date to a number in order to compare it with our array.sort method
//takes in 3 parameters: 1. the array of responses, 2. the filter, 3. the type of sorting were doing
//(updated or last executed)
const dateToNumber = (response, filter, type) => {
  //if the filter exists AND the responses tags does has the filter, then we return 0, which will put it at the 
  //end of the array
  if (filter && !response.tags.includes(filter)) return 0;
  //if it passes the filter, we return the number of miliseconds it hases through the Date.parse helper function
  return Date.parse(response.datetimes[type]);
}

//helper function to help us return an array which will have all the filtered responses
//takes in 3 parameters: 1. the filter, 2. the array of responses, 3. the size of the array
const filterByTag = (filter, responses, size) => {
  //make an results array in which to store all of our wanted responses
  let results = [];
  //iterate through our responses array
  for (let response of responses) {
    //if the results length is equal or more than the asked size, we return our results
    if (results.length >= size) return results;
    //if the response's tags has the fitler, we push it into the array
    if (response.tags.includes(filter)) results.push(response);
    //if not, we reached the point of our sorted array that in which nothing to the right of our element
    //has the filter included, so we want to reutrn our results array
    else return results;
  }
  //this is for the edge case in case all of the responses in our responses array has the filter
  return results;
}

//test case, i mixed up updated, last executed, and tags
let responses = [
{
  'id': 1,
  'name': "Client ABC",
  'price': 12.50,
  'datetimes': {
    'updated': '2016-01-01T23:28:56.782Z',
    'last executed': '2016-04-01T23:29:11.045Z'
  },
  'tags': ['this', 'that', 'other']
},
{
  'id': 2,
  'name': "Fred",
  'price': 13.50,
  'datetimes': {
    'updated': '2017-01-01T23:28:56.782Z',
    'last executed': '2015-04-01T23:29:11.045Z'
  },
  'tags': ['this', 'that']
},
{
  'id': 3,
  'name': "Daniel",
  'price': 14.00,
  'datetimes': {
    'updated': '2016-01-06T23:28:56.782Z',
    'last executed': '2016-02-08T23:29:11.045Z'
  },
  'tags': ['that', 'other']
},
{
  'id': 4,
  'name': "Eva",
  'price': 16.00,
  'datetimes': {
    'updated': '2016-01-01T22:28:56.782Z',
    'last executed': '2016-04-01T22:29:11.045Z'
  },
  'tags': ['this', 'other']
},
{
  'id': 5,
  'name': "San",
  'price': 21.50,
  'datetimes': {
    'updated': '2015-09-01T23:28:56.782Z',
    'last executed': '2016-09-01T23:29:11.045Z'
  },
  'tags': ['that', 'other']
},
{
  'id': 6,
  'name': "Pat",
  'price': 50.50,
  'datetimes': {
    'updated': '2016-01-01T23:28:57.782Z',
    'last executed': '2016-04-01T23:29:19.045Z'
  },
  'tags': ['this', 'that', 'other', 'CSA']
}
]

//test cases
console.log(sortByUpdated(responses, 6, 'CSA'))
console.log(sortByLastExecuted(responses, 2, 'other'))


//assumptions: The date string is a date object and therefore we can call the date methods on it
//all dates are valid dates, no invalid dates
//all tags are in the array format, even if there is one or less
//If the filter does not match any tags, then it will return an empty array
//if the number of responses that include the tags of the filter are less than the asked size
//it will return a smaller array than the asked amount.
//an api call is provided and has given me the responses, in which we will then put the responses through 
//these two functions. So these two functions are to be called AFTER the api call

//Time taken: 1 and a half hours