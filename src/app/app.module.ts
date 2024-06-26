import {NgModule, Provider} from '@angular/core';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {registerLocaleData} from "@angular/common";
import ruLocale from "@angular/common/locales/ru";

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import {PostComponent} from "./shared/components/post/post.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {PostPageComponent} from "./post-page/post-page.component";
import {AdminModule} from "./admin/admin.module";
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "./shared/shared.module";
import {AuthInterceptor} from "./shared/auth.interceptor";

registerLocaleData(ruLocale, 'ru')

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AdminModule,
    SharedModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
