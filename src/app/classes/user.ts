import {Role} from './role';

export class User {

    /**
     * Set user class properties
     */
    constructor(
        public id: number = -1,
        public first_name: string = '',
        public last_name: string = '',
        public email: string = '',
        public active: number = 0,
        public created_at: string = '',
        public roles: Role[] = [],
    ) {}

    /**
     * Instantiate a new user instance
     *
     * @param userData
     * @returns {User}
     */
    public static newUser(userData) {
        let roles = [];

        if (userData.roles.length > 0) {
            roles = userData.roles.map(
                el => new Role(el.name)
            );
        }

        return new User(
            userData.id,
            userData.first_name,
            userData.last_name,
            userData.email,
            userData.active,
            userData.created_at,
            roles
        );
    }

    /**
     * Check if user is admin
     *
     * @returns {boolean}
     */
    public isAdmin() {

        let admin = false;

        this.roles.forEach(
            (el) => {
                if (el.name === 'Admin') {
                    admin = true;
                }
            }
        );

        return admin;
    }


}