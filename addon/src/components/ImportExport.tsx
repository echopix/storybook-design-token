import React, {ChangeEvent} from 'react';
import {Tab} from "../types/tab.types";
import {TabProps, TokenState} from "../types/tab-props.types";

interface ImportExportProps extends TabProps {
    tabs: Tab[];
}

export const ImportExport = ({ tabs, tokenValueOverwrites, setTokenValueOverwrites }: ImportExportProps) => {
    const previewIframe: HTMLIFrameElement = document.querySelector(
        '#storybook-preview-iframe'
    ) as HTMLIFrameElement;

    const input = (text:ChangeEvent<HTMLTextAreaElement>) =>{
        try {
            const json = JSON.parse(text.target.value);
            const categories = Object.keys(json);
            categories.forEach((category: string)=>{
                const categoryKeys = Object.keys(json[category]);
                categoryKeys.forEach((key: string) => {
                    setTokenValueOverwrites(prevState => ({
                        ...prevState,
                        [key]: json[category][key]
                    }));
                    previewIframe?.contentWindow?.document.documentElement.style.setProperty(key,json[category][key])
                });
            });
        } catch(e){
            //unable to convert to JSON -> do nothing
            console.error(e);
        }
    }

    const output = (tabs: Tab[], tokenValueOverwrites: TokenState) => {
        console.log(tokenValueOverwrites);
        return tabs.reduce((acc,tab)=>{
            acc[tab.label] = tab.categories.reduce((acc,curr)=> {
                for(const token of curr.tokens){
                    acc[token.name] = tokenValueOverwrites[token.name] || token.value
                }
                return acc;
            }, {} as any);
            return acc;
        },{} as any);

    }

    return <textarea onChange={input} value={JSON.stringify(output(tabs, tokenValueOverwrites), null, 4)}/>;
};
