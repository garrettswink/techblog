const { User } = require("../models");

const userSeeds = [
    {
        username: "bobross",
        email: "bobross@bob.com",
        password: "password12345",
    },
    {
        username: "johndoe",
        email: "johndow@doe.com",
        password: "password12345",
    },
    {
        username: "janedoe",
        email: "jane@doe.com",
        password: "password12345",
    },
    {
        username: "jimmyjohn",
        email: "jj@gmail.com",
        password: "password12345",
    },
    {
        username: "NancyReagan",
        email: "nancy@wh.gov",
        password: "password12345",
    }
];

const seedUsers = () => User.bulkCreate(userSeeds);

module.exports = seedUsers;