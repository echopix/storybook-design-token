import React, {useEffect, useMemo, useState} from 'react';

import {Icons} from '@storybook/components';
import {styled} from '@storybook/theming';

import {Token, TokenPresenter, TokenSourceType} from '../types/token.types';
import {Input} from './Input';
import {ToolButton} from './ToolButton';
import {PopoverPicker} from "./inputs/colorPicker/PopoverPicker";

interface TokenValueProps {
    onValueChange: (newValue: any) => void;
    readonly?: boolean;
    token: Token;
}

export const TokenValue = ({
                               onValueChange,
                               readonly,
                               token
                           }: TokenValueProps) => {

    const Container = useMemo(
        () =>
            styled.div(() => ({
                position: 'relative',
                display: 'flex',
                flexDirection: 'row'
            })),
        []
    );

    const ResetButton = useMemo(
        () =>
            styled.span(() => ({
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translate3d(0, -50%, 0)'
            })),
        []
    );

    useEffect(() => {
        const previewIframe: HTMLIFrameElement = document.querySelector(
            '#storybook-preview-iframe'
        ) as HTMLIFrameElement;

        if (token.defaultValue !== token.value) {
            previewIframe?.contentWindow?.document.documentElement.style.setProperty(
                token.name,
                token.value
            );
        } else {
            previewIframe?.contentWindow?.document.documentElement.style.setProperty(
                token.name,
                token.defaultValue
            );
        }
    }, [token.value]);

    return (
        <Container>
            {token.sourceType !== TokenSourceType.CSS &&
            token.sourceType !== TokenSourceType.SVG && <span>{token.value}</span>}
            {token.presenter === TokenPresenter.COLOR && <PopoverPicker color={token.value} onChange={(val) => {
                onValueChange(val);
            }}/>}
            {(token.sourceType === TokenSourceType.CSS ||
                token.sourceType === TokenSourceType.SVG) && (
                <Input
                    readOnly={readonly}
                    onChange={(event) => {
                        const newRawValue = (event.target as HTMLInputElement).value;
                        onValueChange(newRawValue);
                    }}
                    value={token.value}
                />
            )}

            {token.defaultValue !== token.value && (
                <ResetButton>
                    <ToolButton
                        onClick={() => {
                            token.value = token.defaultValue;
                            onValueChange(token.defaultValue);
                        }}
                    >
                        <Icons icon="close"/>
                    </ToolButton>
                </ResetButton>
            )}
        </Container>
    );
};
