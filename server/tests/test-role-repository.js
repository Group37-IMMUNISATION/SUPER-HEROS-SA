const roleRepository = require("../modules/roles/role.repository");

async function test() {

    console.log(await roleRepository.findAll());

    console.log(await roleRepository.findById(1));

}

test();