import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutesModule } from "./app-routes/app-routes.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataStorageService } from "./services/data-storage.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RecipesResolverService } from "./services/recipes-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthService } from "./services/auth.service";
import { RecipesService } from "./services/recipes.service";
import { ShoppingListService } from "./services/shopping-list.service";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { AuthGuard } from "./auth/auth.guard";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    DataStorageService,
    RecipesResolverService,
    AuthService,
    RecipesService,
    ShoppingListService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
  
})
export class AppModule {}
