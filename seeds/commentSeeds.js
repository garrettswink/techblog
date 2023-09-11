const { Comment } = require('../models');

const commentSeedData = [
    {
        comment_text: "This is a comment",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "This is another comment",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "This is a third comment",
        user_id: 3,
        post_id: 3
    },
    {
        comment_text: "This is a fourth comment",
        user_id: 4,
        post_id: 2
    }
];

const seedComments = () => Comment.bulkCreate(commentSeedData);

module.exports = seedComments;
    