step 1:-  install node and mongodb run in you systen
step 2:- download repo
step3:- cd /IMDB  and   run npm i or yarn  
step 3 :- IMDB/frontend  and runn npm i or yarn

step4:- signup and update user in mongodb is isAdmin : true for admin user

/** 
* Paste one or more documents here
*/
{
    "name": "admin",
    "email": "admin@gmail.com",
    "password": "$2a$08$a4.L1SbO0ah8YJnHsD8pAubXT4sC/ub6gh0M9pKB43G3HJj.aB4My",
    "isAdmin": true,
    "isSeller": true,
    "seller": {
        "rating": 0,
        "numReviews": 0
    },
    "createdAt": {
        "$date": "2022-02-07T11:14:47.737Z"
    },
    "updatedAt": {
        "$date": "2022-02-07T11:14:47.737Z"
    },
    "__v": 0
}

step5: login with admin user and add movies 

