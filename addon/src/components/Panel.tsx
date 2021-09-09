import React, {useMemo, useState} from 'react';

import {useParameter} from '@storybook/api';
import {ActionBar, ScrollArea, Tabs} from '@storybook/components';
import {styled} from '@storybook/theming';

import {useTokenTabs} from '../hooks/useTokenTabs';
import {Config} from '../types/config.types';
import {TokenCards} from './TokenCards';
import {TokenTable} from './TokenTable';
import {ImportExport} from "./ImportExport";

export const Panel = () => {
    const config = useParameter<Config>('designToken');

    const [tokenValueOverwrites, setTokenValueOverwrites] = useState<{
        [tokenName: string]: any;
    }>({});

    const {
        activeCategory,
        cardView,
        setActiveCategory,
        setCardView,
        styleInjections,
        tabs
    } = useTokenTabs(config);
    const tabsExtended = [...tabs, {label: 'Import/Export', categories: []}]

    const TokenContainer = useMemo(
        () =>
            styled.div(() => ({
                padding: 15
            })),
        []
    );

    return (
        <>
            <style>{styleInjections}</style>

            <ScrollArea vertical horizontal>
                <Tabs
                    actions={{onSelect: (id) => setActiveCategory(id)}}
                    selected={activeCategory}
                >
                    {tabsExtended.map((tab) => (
                        <div key={tab.label} id={tab.label} title={tab.label}>
                            {tab.label === 'Import/Export' ?
                                <ImportExport tabs={tabs} tokenValueOverwrites={tokenValueOverwrites}
                                              setTokenValueOverwrites={setTokenValueOverwrites}/> :

                                <TokenContainer>
                                    {cardView && <TokenCards categories={tab.categories}
                                                             setTokenValueOverwrites={setTokenValueOverwrites}
                                                             tokenValueOverwrites={tokenValueOverwrites}/>}
                                    {!cardView && <TokenTable categories={tab.categories}
                                                              setTokenValueOverwrites={setTokenValueOverwrites}
                                                              tokenValueOverwrites={tokenValueOverwrites}/>}
                                </TokenContainer>
                            }
                        </div>
                    ))}
                </Tabs>
            </ScrollArea>

            <ActionBar
                key="actionbar"
                actionItems={[
                    {
                        onClick: () => {
                            setCardView(!cardView);
                        },
                        title: cardView ? 'Table View' : 'Card View'
                    }
                ]}
            />
        </>
    );
};
