import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home/Home';
import History from './pages/History/History';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import i18n from 'i18next';
import fetchToken from './api/fetchToken';

const loadStylesheet = (theme: string, platform: string) => {
    // Dynamically load the main CSS file
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = `./stylesheets/${theme}/${platform}.css`; // Specify the path to your main CSS file
    document.head.appendChild(cssLink);
}

const rootLoader = async () => {
    const params = new URLSearchParams(document.location.search)
    const token = params.get('token')
    const theme = params.get('theme')?.toLowerCase() || 'dark'
    if (!token) throw Error('There was an error while loading the page')
    const res = await fetchToken({ token });
    if (!res || res.status !== 200 || !res.info || !Object.keys(res.info).length) throw Error('There was an error while loading the page')
    const platform = res.info.platform?.toUpperCase() || 'default'
    loadStylesheet(theme, platform)
    i18n.setDefaultNamespace(platform)
    return {
        ...res.info,
        iconsPath: `icons/${theme}/${platform}`,
    }
}

const router = createBrowserRouter([
    {
        id: "root",
        path: "/",
        element: <Layout />,
        errorElement: <ErrorMessage />,
        loader: rootLoader,
        shouldRevalidate: () => false,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'history',
                element: <History />,
            },
        ],
    },
]);

export default router;