const mongoose = require('mongoose');
const recommenedresourceSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    link: {
        type: String
    },
    description: {
        type: String
    }
},
    {
        timestamps: true
    }
);
recommenedresourceSchema.statics = {
    create(data) {
        
    }
}
module.exports = mongoose.model('Recommenedresource', recommenedresourceSchema);
