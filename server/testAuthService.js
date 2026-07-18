require("dotenv").config();

const authService = require("./modules/auth/auth.service");

(async () => {
    try {
        const result = await authService.login(
            "admin@shusa.com",
            "Admin@123"
        );

        console.log(result);

        process.exit(0);
    } catch (err) {
        console.error(err);

        process.exit(1);
    }
})();