export interface IPerson {
    name: string,
    image: string,
    desc: string
    id?: string,
    maritalstatus?:string,
    isFullStack?:string
}
export class Person implements IPerson {
    constructor(
        public name: string, 
        public image: string, 
        public desc: string, 
        public id: string,
        public maritalstatus: string,
        public isFullStack: string
    ) {

    }
}