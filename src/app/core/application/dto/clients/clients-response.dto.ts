export interface IClients {
    content:          IResponseClient[];
    pageable:         Pageable;
    totalPages:       number;
    totalElements:    number;
    last:             boolean;
    numberOfElements: number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    empty:            boolean;
}

export interface IResponseClient {
    id:           number;
    firstName:    string;
    lastName:     string;
    phone:        string;
    email:        string;
    appointments: IAppointments[];
}

export interface IPostClient {
    firstName:    string;
    lastName:     string;
    phone:        string;
    email:        string;
}


export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    unsorted: boolean;
    sorted:   boolean;
    empty:    boolean;
}

export interface IAppointments {
    dateTime:   Date;
    duration:   number;
    comments:   string;
    clientId:   number;
    serviceId:  number;
    employeeId: number;
}

