import Document, { Head, Html, Main, NextScript } from 'next/document';
export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="icon" href="/dragon icon.png" />
                    <link href="https://fonts.googleapis.com/css2?family=Cuprum&display=swap" rel="stylesheet"></link>
                </Head>
                <body>
                <img className="bgimg" src="/dragonlogo blue.png" alt="logo" />
                    <Main/>
                    <NextScript />
                </body>
            </Html>
        );
    }
}