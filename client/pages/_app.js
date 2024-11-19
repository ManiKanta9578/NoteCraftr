// pages/_app.js
import { Provider } from 'react-redux';
import '../styles/globals.css';
import Layout from '@/components/Layout';
import store from '@/store/store';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Layout>
                <LoadingSpinner />
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}
