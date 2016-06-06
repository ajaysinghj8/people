export interface IPerson {
    name: string,
    image: string,
    desc: string
    id?: string,
    uid?:string,
    maritalstatus?:string,
    isFullStack?:boolean
}
export class Person implements IPerson {
    constructor(
        public name: string, 
        public image: string, 
        public desc: string, 
        public id: string,
        public uid: string,
        public maritalstatus: string,
        public isFullStack: boolean
    ) {

    }
}