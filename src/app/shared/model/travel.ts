import { Customer } from "./customer";

export class Travel {
    id?: string;
    customer?: Customer;
    reason?: string;
    start?: Date;
    end?: Date;
    hotel?: number;
    car?: number;
    taxi?: number;
    country?: string;
    city?: string;
    user?: string;
    paid?: boolean;
    amount?: number;
    submitted?: boolean;
    submittedDate?: Date
}
