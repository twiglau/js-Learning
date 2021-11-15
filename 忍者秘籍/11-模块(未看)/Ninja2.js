import * as ninjaModule from './Ninja1';
export default class Ninja {
    constructor(name){
        this.name = name;
    }
}
export function compareNinjas(ninja1,ninja2){
    return ninja1.name === ninja2.name;
}

import ImportedNinja, {compareNinjas} from './Ninja1';