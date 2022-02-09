import React from "react";
import {Category} from "./category.types";

export type TokenState = {
    [tokenName: string]: any;
}

export interface TabProps {
    tokenValueOverwrites: TokenState;
    setTokenValueOverwrites: React.Dispatch<React.SetStateAction<TokenState>>;
}

export interface CardTabProps extends TabProps {
    categories: Category[];
    readonly?: boolean;
    showValueColumn?: boolean;
}
