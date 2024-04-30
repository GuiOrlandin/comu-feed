import { Module } from "@nestjs/common";
import { UserModule } from "./http/modules/user/user.module";
import { PrismaModule } from "./http/prisma/prisma.module";

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
