require("dotenv").config();

const repository = require("./modules/auth/auth.repository");

(async () => {
    try {
        const user = await repository.findUserByEmail("admin@shusa.com");

        console.log(user);

        process.exit(0);
    } catch (err) {
        console.error(err);

        process.exit(1);
    }
})();