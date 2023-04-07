import _ from "lodash";
import * as moment from "moment";

export class Todo {
    public id: number;
    public content: string;
    public checked: boolean;
    public time_create: string;
    public time_update: string;
    public edit: boolean;

    constructor(args?) {
        const {
            id = 0,
            content = "",
            checked = false,
            time_create = "",
            time_update = "",
        } = args || {};
        this.id = id;
        this.content = content;
        this.checked = checked;
        this.time_create = moment(time_create).format("DD/MM/YYYY HH:mm:ss");
        this.time_update = moment(time_update).format("DD/MM/YYYY HH:mm:ss");
        this.edit = false;
    }
}