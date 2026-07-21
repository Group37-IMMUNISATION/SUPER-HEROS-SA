const userService = require("../modules/users/user.service");

(async () => {

    try {

        const user = await userService.createUser({

            roleId: 4,
            fullName: "Wathum Oscar",
            email: "oscar@example.com",
            password: "Password@123",
            phone: "0700000000",
            profilePhoto: null

        });

        console.log(user);

    } catch (error) {

        console.error(error);

    }

})();