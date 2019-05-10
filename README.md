# t.roS -- Sorting, visualized

t.roS is a sort algorithm visualizer built in javascript and HTML with zero dependencies, atop a rudamentary rails API.  

Its features include:

  - Side-by-side visualization of sorting algorithms
  - Ability to change sort timings (access speed, swap speed, compare speed)
  - Ability to change the amount of items being sorted
  - Save and persist sorts for later comparison

## Setup

Setting up a fresh instance of t.roS for local development and tweaking is simple.  Just follow these steps:

1. Clone the project into a local directory
2. From the terminal, run `rails db:migrate`
3. Use `rails db:seed` to initialize the settings entry in the database
4. In `config/database.yml`, make sure you are pointing t.roS toward a running Postgres database
5. In `app/assets/javascripts/main.js`, modify the first two lines so they point at your local url, rather than the heroku version.
6. Run `rails s` in your terminal.
7. Navigate to `localhost:3000`

t.roS should be up and running!

## Visit t.roS
Want to poke around a running version?  Check it out the [Heroku Site!](https://tros.herokuapp.com/)

## Using t.roS
##### Setting up your graph
The red bubble at the site of the screen can be used to open the settings menu.  From here you can update the various timings, and alter the size of the arrays.

##### Saving
Saving is locked on incomplete sorts.  Only once a sort has been finished can you save the results by clicking the save button.

##### Re-shuffle arrays
Clicking the shuffle button reshuffles the arrays.  It does not add new elements to the array--it only reorders the existing items.  If you want a new dataset, simply reset the count, or refresh the page.

##### Viewing results
They populate beneath the the main buttons, and can be removed at will!

## Contributing to t.roS
Have something you'd like to add, or an issue to report?  Fill out an issue report, or make a commit to a branch, and fill out a pull request and I'd be happy to look it over.  I'm a little team of one, so it might take me a little bit, but I promise I'll put your changes under advisement.  

Remember, contributions should be:
- Productive
- Professional
- Practical

When filing an issue report, please include the following:
1. A description of the bug
2. The steps to reproduce the bug
3. The expected behavior
4. The actual behavior

## Using t.roS
Feel free to use t.roS, or its associated code if you wish.  I'm fine with it provided that you credit the original source material!

## Licensing
MIT
