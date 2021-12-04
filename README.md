# library-management-system

A library management system (LMS) created using the MERN stack. 

## Development

### API Endpoints

(API request and response payloads to be added later)

#### Generic

**```GET /```**

If the user is already authenticated, redirect to ```/dashboard```, otherwise redirect to ```/login```.

**```GET /signup```**

Shows the signup form on the page. Also shows the buttons to connect using Google and GitHub.

**```POST /signup```**

Validate the data entered by the user in the signup form. 

If any errors are found during validation of entered data, then redirect to ```/signup```  again.

If the user already exists in the database, redirect to ```/login```.

If no errors are found, add this user to the database and then redirect to ```/login```.

**```GET /login```**

If the user is already authenticated, redirect to ```/dashboard```.

If the user is not authenticated, show the page with login form.

**```POST /login```**

Validate the data entered by the user.

If there is any error (any of the two fields - email and password - is missing), redirect to ```/login```.

If no error is found and the user is successfully authenticated, redirect to ```/dashboard```.

If the user is not successfully authenticated, redirect to ```/login```.

**```GET /auth/google```**

Authenticate using the user's Google account.

**```GET /auth/github```**

Authenticate using the user's GitHub account.

---

#### Related to Books

**```GET /book```**

Renders the book homepage and returns a list of all the books available in the system along with the number of copies available (not yet issued) so that a table with these details can be displayed on the book homepage. In case all copies have been issued, the quantity is shown as 0.

**```GET /book/:bookObj```** 

Receives a json object in the request and returns the books which match the data in that object. Can return more than one book.

**```POST /book```**

Validates the data (type validations) entered in the form.

If the data is valid, it checks if a book with the same details (name, author, year of release and publication) already exists or not.

If such a book doesn't exist, a new book with the received details is added to the database.

Else, if any of the above validations are failed, redirect to ```/book```.

**```PATCH /book/:bookId```**

Checks if a book with the id of ```bookId``` is present or not. If yes, updates the information of the book as per the request body.

**```DELETE /book/:bookId```**

Deletes the book with id of ```bookId``` from the database.

---

#### Related to Users - Only accessible to users with roles of admin or librarian

**```GET /user```**

This endpoint should only be accessible to users who have the role of ```admin``` or ```librarian```. Renders the users homepage and returns a list of all the users available in the system so that a table with these details can be displayed on the book homepage. 

**```GET /user/:userObj```** 

Receives a json object in the request and returns the users which match the data in that object. Can return more than one user.

**```POST /user```**

Validates the data entered in the form.

If the data is valid, it checks if a user with the same email already exists or not.

If such a user doesn't exist, a new user with the received details is added to the database.

Else, if any of the above validations are failed, redirect to ```/user```.

**```PATCH /user/:userId```**

Checks if a user with the id of ```userId``` is present or not. If yes, updates the information of the user as per the request body.

**```DELETE /user/:userId```**

Deletes the user with id of ```userId``` from the database. If this user has a role of ```librarian```, it can only be deleted by ```admin```, so normal users trying to delete a ```librarian``` should be prohibited.