import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { DatabaseModule } from "./infra/database/database.module";
import { UserModule } from "./infra/http/modules/user/user.module";
import { AuthModule } from "./infra/http/modules/auth/auth.module";
import { JwtAuthGuard } from "./infra/http/modules/auth/guards/jwt-auth.guard";
import { CommunityModule } from "./infra/http/modules/community/community.module";
import { PostModule } from "./infra/http/modules/post/post.module";

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    CommunityModule,
    PostModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
