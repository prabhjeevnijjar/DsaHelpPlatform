import {create} from "../database/model/recommendedresource"
module.exports = {
    async fetchResource(req, res) {

    },
    async createResource(req, res) {
        let data = {
            postedBy: req.user, //Get from auth middleware
            link: req.body.link,
            description: req.body.description
        }
        await create(data)
    }
}