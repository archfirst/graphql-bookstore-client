import { action, observable, runInAction } from 'mobx';

export class Publisher {
    @observable id;
    @observable name;

    constructor(id = '', name = '') {
        // runInAction because constructor cannot be decorated with @action
        runInAction('Construct new Org', () => {
            this.id = id;
            this.name = name;
        });
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
