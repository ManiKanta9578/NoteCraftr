// pages/_app.js
import { Provider } from 'react-redux';
import '../styles/globals.css';
import Layout from '@/components/Layout';
import store from '@/store/store';

export default function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}
