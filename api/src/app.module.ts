import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { DatabaseModule } from "./infra/database/database.module";
import { UserModule } from "./infra/http/modules/user/user.module";
import { AuthModule } from "./infra/http/modules/auth/auth.module";
import { JwtAuthGuard } from "./infra/http/modules/auth/guards/jwt-auth.guard";
import { CommunityModule } from "./infra/http/modules/community/community.module";
import { PostModule } from "./infra/http/modules/post/post.module";
import { LoveModule } from "./infra/http/modules/love/love.module";
import { CommentModule } from "./infra/http/modules/comment/comment.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads", "userAvatar"),
      serveRoot: "/files/avatarImage",
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads", "communityImage"),
      serveRoot: "/files/communityImage",
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/files",
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    CommunityModule,
    PostModule,
    LoveModule,
    CommentModule,
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
