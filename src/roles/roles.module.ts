import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
// import CreateRole from 'src/database/seeds/role.seed';
import { Connection } from 'typeorm';
import { Role } from './entities/Role.entity';
// import { factory } from 'typeorm-seeding';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService,
    /**CreatRole */],
  exports:[RolesModule,TypeOrmModule]
})
export class RolesModule {
  // constructor(private readonly connection: Connection) {}
  // async onModuleInit() {
  //   await this.connection.runMigrations();
  //   await this.connection.getRepository(Role).count().then(async (count) => {
  //     if (count === 0) {
  //       await this.connection.getRepository(Role).save(await CreateRole.prototype.run(factory,this.connection));
  //     }
  //   });
  // }
}
