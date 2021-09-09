import React, {useCallback, useMemo, useRef, useState} from "react";
import { HexColorPicker } from "react-colorful";

import useClickOutside from "./useClickOutside";
import {styled} from "@storybook/theming";


export const PopoverPicker = ({ color, onChange }: {color: string, onChange:(color:string)=>void}) => {

    const Picker = useMemo(
        () =>
            styled.div(() => ({
                position: 'relative',
                display: 'flex',
                'alignItems': 'center',
                'marginRight':'5px'
            })),
        []
    );

    const Swatch = useMemo(
        () =>
            styled.div(() => ({
                width: '20px',
                height: '20px',
                'borderRadius': '5px',
                'boxShadow': '0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer'
            })),
        []
    );

    const Popover = useMemo(
        () =>
            styled.div(() => ({
                position: 'absolute',
                top: 'calc(100% + 2px)',
                left: 0,
                'zIndex':1000,
                'borderRadius': '8px',
                'boxShadow': '0 6px 12px rgba(0, 0, 0, 0.15)'
            })),
        []
    );

    const popover = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [isOpen, toggle] = useState(false);

    const close = useCallback(() => toggle(false), []);
    useClickOutside(popover, close);

    return (
        <Picker>
            <Swatch
                style={{ backgroundColor: color }}
                onClick={() => toggle(true)}
            />
            {isOpen && (
                <Popover ref={popover}>
                    <HexColorPicker color={color} onChange={onChange} />
                </Popover>
            )}
        </Picker>
    );
};
