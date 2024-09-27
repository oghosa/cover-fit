import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  console.log('Custom _document.js is being used');
  return (
    <Html lang="en">
      <Head>
        <script
          src="https://sak.userreport.com/coverfit/launcher.js"
          async
          id="userreport-launcher-script"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}