export class Category {

    constructor(
       private id: number = -1,
       private name = '',
       public status: number = -1,
       public text_status: string = ''
    ) {}

    /**
     * Instantiate a new category instance
     *
     * @param categoryData
     * @returns {Category}
     */
    public static newInstance(categoryData) {
        // return new instance
        return new Category(
            categoryData.id,
            categoryData.name,
            categoryData.status,
            categoryData.text_status,
        );
    }

    /**
     * Get id
     *
     * @returns {number}
     */
    public getId() {
        return this.id;
    }

    /**
     * Set id
     *
     * @param id
     * @returns {number}
     */
    public setId(id: number) {
        return this.id = id;
    }

    /**
     * Get name
     *
     * @returns {string}
     */
    public getName() {
        return this.name;
    }

    /**
     * Set name
     *
     * @param name
     * @returns {string}
     */
    public setName(name: string) {
        return this.name = name;
    }

}
