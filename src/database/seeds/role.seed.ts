// import { Factory, Seeder } from 'typeorm-seeding';
// import { Connection } from 'typeorm';
// import { Role } from 'src/roles/entities/Role.entity';

// export default class CreateRole implements Seeder {
//   public async run(factory: Factory, connection: Connection): Promise<any> {
//     const roleRepository = connection.getRepository(Role);
//     const newRole = roleRepository.create([{ name: 'USER' }, { name: 'ADMIN' }, { name: 'BUSINESS' }, { name: 'FARM' }, { name: 'GUEST' }]);
//     return await roleRepository.save(newRole);
//   }
// }
