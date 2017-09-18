import { action, observable } from 'mobx';

export class Author {
    @observable id;
    @observable name;

    constructor(id = '', name = '') {
        this.id = id;
        this.name = name;
    }

    @action
    setId(id) {
        this.id = id;
    }

    @action
    setName(name) {
        this.name = name;
    }
}
