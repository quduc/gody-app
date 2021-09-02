export interface GoogleDistanceResponse {
    __typename: 'GoogleDistanceResponse';
    status: string;
    error_message: string;
    rows: [
        {
            elements: [
                {
                    distance: {
                        text: string;
                        value: number;
                    },
                    duration: {
                        text: string;
                        value: number;
                    },
                    status: string;
                }
            ]
        }
    ]
}

export interface Auth {
    __typename: "Auth";
    token: string;
    expires_in: number;
}
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
export interface LocationGeometry {
    lat: number; //latitude
    lng: number; //longitude
}
export interface Location {
    location: LocationGeometry;
    description: string;
}

export interface Booking {
    origin: Location;
    destination: Location;
    fare: number;
    distance: any;
    duration: any;
    car_service: CarService;
}

export interface ObjectResponse<T> {
    __typename: 'ObjectResponse';
    result: T
}
export interface BaseResponse {
    __typename: "BaseResponse";
}

export interface ErrorResponse {
    __typename: "ErrorResponse";
    error: string;
};

