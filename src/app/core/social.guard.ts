import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute} from '@angular/router';

import { AuthService } from './auth.service';
import { UserService } from '../shared/user.service';
import { User } from '../classes/user';

@Injectable()
export class SocialGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {

        return new Promise(resolve => {
            let routeUser = JSON.parse(route.params['user']);
            
            this.userService.repository.getAll(this.userService.apiGetURLS.all).subscribe(
                response => {
                    this.userService.repository.setData(response.data.map(
                        el => User.newInstance(el)
                    ));
                    
                    let foundUser = this.userService.repository.find(routeUser.id);

                    if (!foundUser || foundUser.provider.token != routeUser.provider.token) {
                        this.authService.toggleAuthentication(false);
                        return resolve(false);
                    } else {
                        // login if he's completed registration
                        if (foundUser.attributes) {
                            this.authService.toggleAuthentication(true, foundUser, route.params['token'], true);
                        }

                        return resolve(true);
                    }
                }
            );
        });
    }
}
