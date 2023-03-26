## Development tasks

- [x] Using backend api endpoint /getBooks, implement table of books view
- [x] Using backend api endpoint /getCheckouts, also implement the checkouts view. Suppport paging and sorting for both views
- [x] Implement individual book and checkout view, support basic CRUD operations, implement checking out and returning books
- [x] Implement searching for books using freetext criteria
- [x] Implement filtering for books by status
- [ ] Implement saving / displaying favorite books for current user (you can use localStorage if you don't want to make back-end changes)
- [x] Add modal confirmation dialogues when deleting or checking out books
- [x] Implement a user-friendly way to display late checkouts

##### Bonus tasks:
- [ ] Implement advanced search form for books, where user can specify and combine different criterias (title, author year etc)
- [ ] Add UI and backend tests 
- [ ] Add support for multiple languages
- [ ] Add support for multiple users and different user roles: reader and librarian.
Reader should not be able to add / modify / delete existing book information or tamper with checkouts
but should be able to save favorites and check out / return books (that they have checked out)
- [ ] Containerize your application to make it cloud-native