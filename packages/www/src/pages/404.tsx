import { PageProps } from 'gatsby';
import React, { FC } from 'react';
import * as s from '../pages-styles/_404.style';
import {PageLayout, Seo} from '../components';

const PageNotFound:FC<PageProps> = () => {
    return (
        <PageLayout>
            <Seo title="Ice-Cream Freezing" />
        <s.Container>
            <h1>🧊Your Ice-Cream🍦 is Freezing...🧊</h1>
            <h1>Retry after 3-4 minutes 😇</h1>
        </s.Container>
        </PageLayout>
    )
};

export default PageNotFound;
