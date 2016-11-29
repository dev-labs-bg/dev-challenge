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
        public experience: number = 0,
        public bonus_points: number = 0,
        public roles: Role[] = [],
        public attributes: any = {},
    ) {}

    /**
     * Instantiate a new user instance
     *
     * @param userData
     * @returns {User}
     */
    public static newInstance(userData) {
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
            userData.experience_points,
            userData.bonus_points,
            roles,
            userData.attributes,
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

    getName() {
        return this.first_name + ' ' + this.last_name;
    }


}