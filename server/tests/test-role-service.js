const roleService = require("../modules/roles/role.service");

async function test() {

    console.log(await roleService.getAllRoles());

    console.log(await roleService.getRoleById(1));

    try {
        await roleService.getRoleById(999);
    } catch (error) {
        console.log(error.message);
    }

}

test();