import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';

export class Repository {
    private observable: Observable<any>;
    private data: Array<any> = [];

    constructor() { }

    /**
     * Quickly setup your dependencies
     * Perfect if you like to just get your data
     * and start coding
     *
     * @param httpObservable - the http request as an Observable
     * @param className - the Class we're translating the data to
     * Class needs to have "newInstance" static function
     * which returns a new class instance
     * @returns {TeardownLogic|any|AnonymousSubscription|Object|Subscription}
     */
    setup(httpObservable, className) {
        return this.getAll(httpObservable).subscribe(
            response => this.setData(response.data.map(
                el => className.newInstance(el)
            )),
            error => console.log('Ah, no ' + className + ' found.', error)
        );
    }

    /**
     * Reset model data and fetch it again
     * 
     * @param {Observable} httpObservable - http call
     * @param {class} className - model we're loading
     * @returns {TeardownLogic|any|AnonymousSubscription|Object|Subscription}
     */
    reset(httpObservable, className) {
        this.data.length = 0;

        return this.setup(httpObservable, className);
    }

    /**
     * Get your data
     *
     * @param httpObservable - the http request as an Observable
     * @returns {any}
     */
    getAll(httpObservable: Observable<any>) {
        let data = this.getData();
        let loading = this.getObservable();

        if (data.length > 0) {
            return Observable.of({data: data});
        } else if (loading) {
            return loading;
        } else {
            return this.setObservable(httpObservable);
        }
    }

    /**
     * Get the static representation
     * of the data
     *
     * @returns {Array<any>}
     */
    getData() {
        return this.data;
    }

    /**
     * Set your data
     *
     * @param data
     * @returns {Array<any>}
     */
    setData(data: Array<any>) {
        return this.data = data;
    }

    /**
     * Observable var getter
     *
     * @returns {Observable<any>}
     */
    getObservable() {
        return this.observable;
    }

    /**
     * Observable var setter
     *
     * @returns {Observable<any>}
     */
    setObservable(observable: Observable<any>) {
        return this.observable = observable;
    }

    /**
     * Find a specific item from
     * your data
     *
     * @param id
     * @returns {T}
     */
    find(id) {
        let dataId = parseInt(id, 10);

        return _.find(this.data,
            el => el.id === dataId
        );
    }

    /**
     * Add an item to your data
     *
     * @param id
     * @returns {T}
     */
    add(data) {
        return this.data.push(data);
    }

    /**
     * Update an object from your data
     *
     * @param data
     * @returns {Array<any>}
     */
    update(data) {
        let id = parseInt(data.id, 10);
        let index = _.findIndex(this.data, { id });

        if (typeof(this.data[index]) != 'undefined') {
            this.data[index] = data;
        }

        return this.data;
    }

    /**
     * Remove an object from your data
     *
     * @param id
     * @returns {T[]}
     */
    remove(id) {
        return _.remove(this.data, { id });
    }
}
