# Budget App using HTML5/CSS3, Bootstrap, Javascript & jQuery

Our app will have a balance, income, expense and a dashboard.

We also have buttons for income, expense and all transactions. We will use the buttons to toggle between the lists of transactions effected by the user. Once you toggle the income button, it displays the input field for entering the income value.

The expense button toggles the expense list together with the input field to enter expenses to our list. The expense list is displayed in red while the income values have a dark color.

There is also a chart on the dashboard to make it easier for the user to compare both income and expenses. If the user enters a value in the income field, the dashboard values are updated in real time to reflect the changes made.

New entries are added at the top of the list.

There is a trash button (icon) next to every list item which can be used to remove the item. When an entry is deleted, it automatically updates the application, that is, the income, expense and balance respective.

Both income and expense values can be modified by selecting the income/expense tab and hitting the edit icon next to the list item.

The last important feature is localStorage. If a user refreshes the app or browser, all the data(user's entries) will still be available since it is saved to local storage.

Used elements
Toggling to manipulate elements
Add entry to the UI using eventListener function
Display entry to UI
Update UI
Update chart
Delete or Edit the UI
commit to localStorage

## Part 1 - HTML / Bootstrap

First we are going to need a container for our app. Then inside we have the header which will have the balance, title and value. The income and expense values will also be included in this container. All these make up the dashboard of the app.

The footer of the dashboard will have the title, expenses, income and all tabs. These tabs will have an active class to indicate which one is currently selected or active.

The body of the dashboard will have three elements, one for expense, income and all tabs. All three have similar HTML code.

Inside the income tab container, we have a text type input to add a title for our entry, a number type input to add the amount and last, we have a button to submit our data. When a user clicks on the add income icon, the entry is added to the list.

The list is an unordered list with li elements with a unique id for every entry. Then there's the entry title, amount, the edit button and delete button.

## Step 2: Custom styling

We are going to some custom CSS styling to the entire app. First off we will reset the spacing and padding and set box-sizing to border-box.

We will be using CSS variables to style our app. First of all: CSS variables can have a global or local scope. Global variables can be accessed/used through the entire document, while local variables can be used only inside the selector where it is declared.

To create a variable with global scope, declare it inside the :root selector. The :root selector matches the document's root element.

## Javascript

To begin with our app's script, we need to select those elements needed. First we select the balance element, the income total element and the expense total element, the chart element, the toggle buttons, expense button, income button and view all transaction button. In other words we will select all the available elements

We will use the buttons to toggle between the transaction list, income and expense tabs

The difference between an active and inactive button is just the opacity of that element. Now, the important role is added to the opacity to overwrite any other CSS styles. The active class is applied to the button tab.

The element.classList will return a list of all the class lists of our element; while element.classList.remove.('active) method will applied to remove the active class to return the element to its inactive state. Remember that we can also use the .toggle() method to apply the active and inactive classes.

Before we can apply the active classes, we need to listen for a click event when the user clicks on the button. An event listener will be fired when a user clicks on one of the buttons.

Once the user clicks on the income button, this automatically toggles the other buttons inactive, that is, the all button and expense button will be inactive.

Clicking on a certain tab or button say expense button, it needs to display the exact list of expenses and then hide the income list. In order to do so, we need to add .hide class in our CSS file and set display: none. Whenever this class name is added to one of these elements, it is hidden while toggling the one with the click event.

For instance if the allBtn is clicked, the callback function will hide both the income and expense tabs while making their buttons inactive.

The hide function takes an array of elements. To toggle those elements, we have to add to each of them the .hide class name. To pull this off we need a for loop that starts at 0 and ends at 1 the last element and increases each time.

For each element inside the array, I will get to the classList and add the .hide class. This method is alright but we need a better method and that's using the forEach(), that is for each element inside our elements array, run the code in the function.

Our active function above is taking just one element and to activate that element we add the active class to that element. You can find the `active` class in our stylesheet.

The `show()` function takes in one element and it removes the class `.hide` from the class list of that element.

Our `hide()` function on the other hand takes in more than one elements which means they are inside an array. To hide those elements, we simply add to each one of the them the hide class name as demonstrated in the code snippet above

## Add entry

Let say we are in the dashboard and we want to add an income, we type in the title, an amount and click the button. This is about saving the data entered by the user. The button is selected using the `querySelector` method. We assign it the value of `addIncome`.

We need to know the value of our income title and amount. We can use `incomeTitle.value` & `incomeAmt.value`. We need to save our data entry some place and the best place is in an array.

We will create a variable called '`Entry_list`' which is an array. We need to save those elements in an array as objects. like so:

> Note: Javascript sees the number input as a string. So to convert it to a number, we need to use the `parseFloat()` method which will convert the string to a number because we have maths involved in calculating the income values.

Then we push the object with all the entries inside our entry list. Now the `push()` method which appends an entry at the end of an array. Then we need to clear the input field using a function called `clearInput()`. The clear function will just set the value of each input in that array to an empty string.

> Note: we don't want to add the entry if the user typed in just the title and not the amount or if user data entry is not complete. We need to check for input entries.

We are going to use the logical operator `||` in an `if ...else` code block to verify user input. This process will be repeated for all input fields including expense and income.

An entry in general has four properties, the `type`, `title`, `amount` and `id` - which is the `id` of the `li` element.

## Calculate balance, income and expense

**Income**
To calculate the income, we get the sum of type property `income`. We are going to do same for both the balance and expense amounts.

**Balance**
the balance is simply the `income - expense` which will be inside a function called `calculateBalance()` which takes in the income and expense as parameters; and returns income - expense.

## Display entry

What we will do is search for the entry in the entry list array and add the HTML code based on the information saved on entry list array and add the information on the `incomeList`, `expenseList` & `allList`. We will use the innerHTML to add out entry ` list.innerHTML += entry`.

We are using the `+=` because we don't want to overwrite the old entries in our list. In order to add entries in a manner that the recent entries appear at the top, we need to use the `insertAdjacentHTML()` method.

## Update UI

The update Ui is called whenever a user clicks on the add button. Each time the button is clicked, the `updateUI()` is called thereby changing the income, expense and balance, and then show that to the user.

Before we show our entry to the user we need to clear the list using the `clearElement()` method. We do this because we don't need to show our input entries a second time. This method basically loops over our elements and set each element into an empty string.

The entry is going to be the entry from the user which is stored in our ENTRY_LIST. The index is going to be our `id` from the `li` in the entry class. To show the entry of a particular list, we use the ` showEntry()` function.

To display absolute values for amounts we use the `Math.abs()` method. This way our values are always absolute numbers.

We will use a `forEach()` method to run the code and loop through entries.

The `updateChart()` function takes in the income and expense variables.

> To avoid showing negative values on our balance dashboard, we are going to have a variable `sign` with a ternary operator. If the expense is greater than the income, the balance would have a negative value but that would be appended before on the dollar sign instead of adding it in front of the amount. Like so: `-$2500`

> The conditional (ternary) operator is the only JavaScript operator that takes three operands: a condition followed by a question mark `(?)`, then an expression to execute if the condition is true followed by a colon (`:)`, and finally the expression to execute if the condition is false.

## Update chart

Whenever I add an entry we want to update the chart instantly. This function goes into our updateUI(). First select the chart element using querySelector, and also create a canvas element.

We set the width and height of the canvas to 100px. You can set it however you want. This will a a rectangular shape. To draw on the canvas or draw a shape, you need to get the context of the canvas using `getContext()`.

`getContext()` is an object that returns many properties and methods. For instance the `strokeStyle` deals with the color of the shape. We are will use the `arc()` function to draw a circle.

To draw a circle we need to set `x` which is the amount of pixels from the left side and the `y` position which is the amount of pixels from the top of the canvas. Both positions now form the center of our circle.

`R` here is the radius of our circle and the `startAngle` is the angle from which you want to start drawing your circle. The `endAngle` is where your circle ends.

`antiClockwise` is the last parameter is optional. You can set this param or you can just leave it that way. It is `false` by default. If anticlockwise is false then it means it will draw the circle clockwise and vice versa is the `antiClockwise` is true.

For example if the `startAngle = 0`, and the `endAngle = 0.5 *PI`; then it will draw the circle from point 0 in a clockwise direction.

That said, we are going to draw two circles, one for the income and the other for the expense. We will draw both circles with one being ontop of the other. If both income and expense are equal, both will take half of the circle.

We will apply different colors for both circles to differentiate between them. We are going to use positive angles or numbers. If we go clockwise, we will be using positive numbers or angle; while going anticlockwise we will use negative numbers or values.

To get how much an amount will take on the circle, we are going to use the ratio of the income and outcome.

For example we have an income of 1900 and outcome of 300. Both circles have the same position. We are going to use the `arc()` method: `ctx.arc(cvs.width/2, cvs.height/2) ` to get the center of the canvas.

The radius will the `100px` for the income and expense and will both start at 0; and go to the position `2 * PI`. One will go clockwise while the other goes anticlockwise. This implies when one circle goes 25%, the other one will go 75%.
`ctx.arc(cvs.width/2, cvs.height/2, R, 0, ratio * 2 * Math.PI, anticlockwise) `

## Delete or Edit features

Let's assume we have a couple of entries from the user. To delete entry from our UI, we need to use the `splice()` method. the `splice()` method takes and index and an array - that is how many items you want to remove from that array. The `deleteEntry()` function will take in the entry clicked on, and take in the splice() method on our ENTRY_LIST. The splice method takes in the id of the item as the index and 1 as the number of items to be deleted.

Before an item is deleted from the UI, it is first deleted from our list array. Once removed we have to update the entire UI by calling the `updateUI()` function.

**Edit entry function**

The edit button calls an `editEntry()` function. The function adds the entry into the input fields and delete the entry at the end of the function.

We use an if statement to check if it's an income or an expense. If it's an income it will add the item into the income input field, and if it's an expense it will be added to the expense input field. The `ENTRY` is simply the entry in our ENTRY_LIST array of objects.

For this to work we need to first know what button the user clicked. Then we are going to add an event listener to our lists. We will add three event listeners

To know which button the user clicked, we are going to use `event.target` and pass it in a variable. Whenever the edit or delete button is clicked we need to get the `parentNode` or parent element. The parent node is going to be our entry. Each item has an `id` and that id is the index of that element in our ENTRY_LIST

## LocalStorage

We don't want a user to lose their data once they close their browser, so we `localStorage()` method is used.

The `localStorage.setItem('key', value)` uses a key and a value. The key here is used to get back the data stored in the local storage. We use the `localStorage.getItem('key')`.

We need to convert arrays or objects to a JSON string since local storage only accepts strings. To do that we use the `JSON.stringify()` method. To get the item from local storage, we need to convert the item back to an object using `JSON.parse()` method.

Whenever we update our updateUI() function, we will update the local storage as well. Once a user reruns the app later on, we need to get the item from the local storage using `localStorage.getItem('key')` method. The key in this case will be the ENTRY_LIST.

If it's the first time that a user is using the app, this might throw an error because there's nothing in our localStorage. To prevent this, we will create a variable ENTRY_LIST. THen we say if there's data in our localStorage, then set it our entry list, but if there's none then set it to an empty array as demonstrated above.
