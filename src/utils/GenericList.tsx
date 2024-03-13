import { ReactElement } from "react";

export default function GenericList(props: genericListProps){
    if (!props.list){
        if (props.loadingUI){
            return props.loadingUI;
        }
    }
    if (props.list.length === 0){
        if (props.emptyListUI){
            return props.emptyListUI;
        }
        return <>There are no elements to display</>
    } else{
        return props.children;
    }
}

interface genericListProps{
    list?: any;
    loadingUI?: ReactElement;
    emptyListUI?: ReactElement;
    children: ReactElement;
}