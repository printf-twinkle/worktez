export interface Activity {
    Comment: string;
    Date:string;
    Time:string;
    Type: string;
}

export interface ActivityId extends Activity { id: string; }
