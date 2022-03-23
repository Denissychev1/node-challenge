# Node Challenge

Take home test for Node.js developers.

## The challenge

This challenge has been designed to measure your knowledge of Node.js, Express, Typescript and various technologies, like monorepos, databases and testing. For your exercise, you will be enhancing this API which serves as the backend for the Pleo app. Whenever a user of the app navigates to the expenses view, it calls this API to collect the list of expenses for that user.

Your objective is to write this new route to fetch the list of expenses for a given user. Right now that domain is empty, so you'll have to build everything from scratch- but you can look over at the user domain for inspiration. Please make sure that the endpoint scales adequately and supports paging, sorting and filtering. Additionally, we would also like you to write some tests for your route.

Finally, as a bonus objective, try to improve any aspect of this API. It could be to add more TS types, better security, tests, add features, graphql support, etc. 

## Working process

- [x] First of all, I decided to code minimal working router: without any options, except userId.
- [x] Part 2 is to add paging and sort.
- [x] Part 3 is to add filtering.
- [x] Part 4 refactoring code and documentation

## My thoughts

First of all, I decided to work in dev- branch, because whatever I do, I do it in a my own branch.
I faced a problem with running tests as I am a Windows user and it is not allowed to add any variables in terminal. So, reading about this issue in internet had helped me.

I faced a problem with deciding, which way of validating request is better. As I first thought I decided
to get SQL-query with column names of expense table. Then check, whether user's filter/sort query column exists in column array.
After a short time of thinking, I realised that I do not want to go to db in order to take columns - the validation process in my realisation got to use db anyway - so in this case my component goes to database twice, and as I think (because there is no any strong logical operations during getting information) it is not being optimal, moreover route will anyway throw an error with non-existing column, and I removed my idea from the dev branch.
So, I left the validation of filter/sort structure and some enums of sorting/filtering. Of course, this is not
the best solution as there are not all filtering operations allowed.

In future (if I will have time) is good to make a validator as detached class in order to check all queries whether they are valid.
But as I think - better solution is to attach a GraphQL - schema with description - it is easier to test (for example in Altair) - as while you a writing query - it will not give you a chance to write something extraordinary from documentation.

## Important information

filtering query should be like `[["column1", "operation1", "value1"], ["column2", "operation2", "value2"]]`
sorting query should be like `[["column1", "asc/desc"], ["column2", "asc/desc"]]`

## Conclusion

It has taken me 3 days working approximately 3 hours per day. It could be seen like it is too much time for this challenge, but as I have said earlier, I decided to remove some code because of irrational purposes of those.

## Instructions

Fork this repo with your solution. Ideally, we'd like to see your progression through commits, and don't forget to update the README.md to explain your thought process.

Please let us know how long the challenge takes you. We're not looking for how speedy or lengthy you are. It's just really to give us a clearer idea of what you've produced in the time you decided to take. Feel free to go as big or as small as you want.

## Install

Make sure that you have a modern version of `yarn` that supports workspaces (`>= 1.0`), then run:

```bash
yarn
```

You will also need to [install Postgres](https://www.postgresqltutorial.com/install-postgresql-macos/), create a `challenge` database and load the sql file `dump.sql`:

```bash
psql challenge < dump.sql
```

## Start

To enable logs, use the standard `NODE_DEBUG` flag with the value `DEBUG`

```bash
NODE_DEBUG=DEBUG yarn start
```

## Test

Make sure that you have a modern version of `yarn` that supports workspaces, then run:

```bash
yarn test
```

The command above will run the following test suites sequentially:

| Test suite | Run command | Description |
-------------|-------------|-------------|
| Unit | `yarn test:unit` | Simple unit tests. |
| Mid-level | `yarn test:mid-level` | Small integration tests that integration of small components together.  |
| Acceptances | `yarn test:acceptance` | Large integration tests, system tests, end-to-end tests. |


Happy hacking 😁!
