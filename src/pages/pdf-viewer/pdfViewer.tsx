import Tabs from 'component/tabs/tabs'
import React, { useCallback } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './pdfviewer.css'

interface TabProps {
  tabKey: string;
}
const CustomListView: React.FC<TabProps> = (props) => {

  const embed = `
    <embed src={file} type="application/pdf" width="100%" height="600px" />
  `;

  const iframe  = `
    <iframe src={file} title="PDF Viewer" width="100%" height="600px" />
  `;
  return (
    <div className='container-custom pdfviewer'>
      <h3>You can use embed and iframe to create pdf viewer functionality, or you can use an external library.</h3>

      <div className='source-code'>
        <h3>Embed</h3>
        <p>The embed tag supports embedding multimedia file types, including PDF.
        It allows you to customize the size and position of the PDF viewer</p>
        <p>The advantage of embed is that it is simple and easy to use.
        However, it may have some compatibility issues on some older browsers or operating systems.</p>
        <SyntaxHighlighter language="javascript" style={materialDark}>
          {embed}
        </SyntaxHighlighter>
      </div>
      <div className='source-code'>
        <h3>Iframe</h3>
        <p>The iframe tag also allows embedding PDF files into web pages, and it also supports embedding other web pages.</p>
        <p>The advantage of iframe is that it is well supported on most browsers and operating systems.
          However, some security issues can arise when embedding content from an external source.</p>
        <SyntaxHighlighter language="javascript" style={materialDark}>
          {iframe}
        </SyntaxHighlighter>

      </div>
    </div>
  );
}

function PDFViewer() {

  const Item = useCallback((props: TabProps) => {
    return <CustomListView {...props} />;
  }, []);

  return (
    <Tabs tabList={[{ id: 1, title: 'ReactJS' }]} RowList={Item} />
  )
}

export default PDFViewer