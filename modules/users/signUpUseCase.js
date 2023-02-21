const { Database } = require('fakebase');
const database = new Database('./data');
const Users = database.table('users');
const jwt = require('jsonwebtoken');

module.exports = async (params) => {
    const response = {
        status: 200,
        message: '',
        data: {}
    }

    //validate params
    const failedValidation = [];

    !params?.userName && failedValidation.push('userName');
    !params?.password && failedValidation.push('password');


    if(failedValidation.length > 0) {
        response.status = 400;
        response.message = `Missing params ${failedValidation.join(',')}`
    } else {
        const user = await Users.findOne((user) => user.user_name === params.userName);

        if(user) {
            response.status = 400;
            response.message = 'user name already taken';
        } else {
            await Users.create({ user_name: params.userName, password: params.password });
            response.message = 'user created';
            response.data.token = jwt.sign(
                {
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 3, // 3 hrs
                    data: {
                        ...user,
                    }
                },
                process.env.TOKEN_SECRET || 'default'
            )
        }
    }

    return response;
}