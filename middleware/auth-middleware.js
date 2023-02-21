const jwt = require('jsonwebtoken');
const { Database } = require('fakebase');
const database = new Database('./data');
const Users = database.table('users');

class Auth {
    constructor() {}

    async validateToken(req, res, next){

        const response = {};
        response.statusCode = 401
        response.message = "Unauthorized"

        if (req?.headers?.authorization) {
            const token = req.headers.authorization.split(' ')[1]
            let decoded

            try {
                decoded = jwt.verify(token, process.env.TOKEN_SECRET || 'default')
            } catch (e) {
                return response;
            }
            
            let userId = decoded.data.id

            // Fetch the user by id
            const user = await Users.findById(userId);
            req.user = user;

            next();
        } else {
            res.send(response)
        }
    }
}

module.exports = new Auth();
