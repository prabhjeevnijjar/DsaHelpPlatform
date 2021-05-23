const { number } = require('joi');
const mongoose = require('mongoose');
const resourceSchema = new mongoose.Schema({
    name: {             //resource name
        type: String,
        required: true
    },
    resourcetype: {
        type: String,   //dsa,programming language, devops, CI/CD
    },
    resourcesubtype: [
        {
            type: String    //arrays, strings, AWS, Azure, Jenkins
        }
    ],
    resourcelink: {
        type: String    //URL
    },
    resourceauthor: [
        {
            type: String    //publisher name(s)
        }
    ],
    resourcestudytype: [
        {
            type: String     //text based, video based, full course(udemy/pluralsight coursera), whatsapp/telegram group
        }
    ],
    postedDate: {
        type: Number,
        default: Date.now,
    },
    upvotedBy: [
        {
            type: String,
            ref: "Users",
        },
    ],
    downvotedBy: [
        {
            type: String,
            ref: "Users",
        },
    ],
    reviews: [
        {
            text: {
                type: String
            },
            givenby: {
                type: String,
                ref: "User",
            }
            // unique: true
        },
    ],
    upvotecount: {
        type: Number,
        default: 0,
    },
    downvotecount: {
        type: Number,
        default: 0,
    },
    lastedited: [
        {
            editeddate: {
                type: Number,
                default: Date.now()
            },
            editedcomment: {
                type: String,
            }

        }
    ],
    status: {
        type: String,        //"published", "unpublished","deleted",
        required: true
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Resource', resourceSchema);
