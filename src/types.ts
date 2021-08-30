export interface DrawerItemProps {
    id: number;
    icon: any;
    name: string;
    screen: string
}

export interface CarService {
    id: number;
    image: any;
    name: string;
    type: number;  //1 : economy *** 2: primium *** 3: Luxury
    description: string;
    price: number;
    seats: number;
    time?: string;
}

export interface Auth {
    __typename: "Auth";
    access_token: string;
    expires_in: number;
}

export interface LocationGeometry {
    lat : number; //latitude
    lng : number; //longitude
}
export interface Location {
    location : LocationGeometry;
    description : string;
}