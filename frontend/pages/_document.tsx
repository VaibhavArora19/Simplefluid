import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html id="html" lang="en" data-theme="bumblebee">
      <Head>
        <link rel={"stylesheet"} href="https://pro.fontawesome.com/releases/v6.0.0-beta1/css/all.css" />
        <link href="https://cdn.lineicons.com/3.0/lineicons.css" rel="stylesheet"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@300;400&display=swap" rel="stylesheet"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
