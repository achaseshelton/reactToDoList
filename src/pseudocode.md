## To Do List  

User wants to create a to do list to keep track of the things they need to do and what tasks they have already completed.  

#### Requirements  
1. Dynamically render the content using react components.
2. Use local storage to store the to do list data in the browser.
3. Display all the to do list items.
4. Three views for all items, completed items, and to do items.
5. Diplay prompting text to add items.
6. Cross out or check off items as the user checks them completed.
7. See how many items you need to do in each view.
8. Remove one or all items in a click.
9. Check off all items as completed in 1 click.
10. Ability to click a button and mark all items as completed.

#### Data Structures and Components  

1. State  
    - Array of to do list objects.  
    - Contain the description, a completed status, a deleted status.  
    - When created the completed status is to do, and not deleted.  
    - When created will feed the variables to the list item component as props using a .map.  

2. Header
    - Basic header to display the title at the top of the page.

3. Text Bar
    - Bar that appears under the header.
    - empty text bar with text prompting the user to enter a to do list item.
    - on enter or click, creates a to do list item with the value entered in the bar as the description and the default statuses.
    - Clears the bar on enter or click?  

4. To Do List Item.
    - Uses the description props to show the text in the item.
    - Has a button to toggle completed stauts.
    - If the status is completed display with a line through the text.
    - Delete button to toggle the deleted status.
    - If the status is deleted to do list item doesnt render.  

5. View Bar - Each button their own component or function? Child of the to do list component? buttons will change state?
    - Appears at the bottom of the page.
    - Far left shows the items in the view.
        - When all is clicked determines the number of items in the state array, total number of indexes + 1.
        - When to do is clicked, filter the items by those with a to do staus and add the total number of those items.
        - When completed is clicked, filter the items of those with a completed status add those number together.
    - All button appears to the right of the number of items
        - Shows all items in the do list with a not deleted status.
    - To Do button appears to the right of the all button.
        - Only renders the items that have a to do status.
    - Complete button appears to the right of the to do button.
        - Only renders the items that have a completed status.
    - Complete All button appears at the end of the bar.
        - Toggles all items to have a completed status.  
  
#### Functions

1. Create
    - Uses the text bar to create an object and add it to state.
    - Value of the text bar is the description.
    - Gives a set value of to do, and not deleted when creating the item.  

2. Read
    - reads the data in state to create the do list?
    - read needs a value
        - if all, show all items in the state.
        - to do shows all items with a to do status
        - completed shows all the items with a completed status.
    - reads the total number of items, or those with to do, or completed status to populate number of items for each.  
  
3. Update
    - Set state on clicks and enters?
    - Runs component did update?

  
4. Delete
    - Determine which ToDoItem was clicked.
    - setState of the ToDoItem clicked to have a deleted value of true.

5. Complete
    - Determine which ToDoItem was clicked
    - setState aof the ToDoItem clicked to have a completed value of true.

6. componentDidMount
    - If there is an array of items in local storage get the array
    - Parse the json file from local storage.
    - Set the item array in state to be the parsed local storage array.

7. componentDidUpdate
    - Take the itemArray from state and stringify it.
    - Take the stringified json file and set it in local storage.

#### Logic

1. User enters text into the bar and clicks add or hits enter.
    - Creates a smart object
        - object contains an id equal to index? or new Date?
        - textValue is equal to currentToDo
        - completed is equal to false
        - deleted is equal to false
    - adds item to the itemArr (stringified?) and? in local storage.
  
2. User clicks the completed button.
    - toggles the completed status of the corresponding ToDoItem to be true
    

3. User clicks the delete all button
    - filters the itemArr in state to a new array with only items with a deleted status of false.
    - Maps the new array for every item to have a deleted status of true.

4. User clicks the delete button
    - toggles the deleted status of the corresponding ToDoItem to be true.

5. user click a filter button
    - Parse the itemArr?
    - filters through the state array
    - check filter by state
        - if filter state is all, return the every item in the array.
        - if filter state is active, return the items in the array with a completed status of false.
        - if filter state is completed, return the items in the array with a completed status of true.
    - maps over the items to return a ToDoitem component.