import { Module } from "@nestjs/common";
import { DatabaseModule } from "./infra/database/database.module";
import { UserModule } from "./infra/http/modules/user/user.module";
import { AuthModule } from "./infra/http/modules/auth/auth.module";

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
