export class ScrumMaster {
    
    user: string;
    name: string;
        
    static adatp(): ScrumMaster {
        let userJira = new ScrumMaster();
        userJira.user = "";
        userJira.name = "";
        return userJira;
    }    
}