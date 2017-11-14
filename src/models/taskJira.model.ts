export class TaskJira {
    
    _id: string;
    title: string;
        
    static adatp(): TaskJira {
        let taskJira = new TaskJira();
        taskJira.title = "";
        return taskJira;
    }    
}