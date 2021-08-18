import { string } from "prop-types";

export interface ColorMap {
    background: string;
    primary : string;
    secondary : string;
    mainText : string;
    secondaryText : string;
    outline : string;
    form : string;
    white : string;
    black : string;
    title: string;
}
export const colors : ColorMap = {
    background : '#FFFFFF',
    primary : '#1FCC79',
    secondary : '#FF6464',
    mainText: '#2E3E5C',
    secondaryText: '#9FA5C0',
    outline : '#D0DBEA',
    form : '#F4F5F7',
    black : '#000000',
    white : '#FFFFFF',
    title: '#3E5481'


}