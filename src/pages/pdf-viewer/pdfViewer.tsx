import Tabs from 'component/tabs/tabs'
import React, { useCallback } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
    <div className='container-custom paginated'>
      <h3>Bạn có thể sử dụng embed và iframe để tạo chức năng pdf viewer, hoặc có thể sử dụng thư viện ngoài.</h3>

      <div className='source-code'>
        <h3>Embed</h3>
        <p>Thẻ embed hỗ trợ nhúng các loại tệp đa phương tiện, bao gồm cả PDF. 
        Nó cho phép bạn tùy chỉnh kích thước và vị trí của trình xem PDF</p>
        <p>Ưu điểm của embed là nó đơn giản và dễ sử dụng. 
        Tuy nhiên, nó có thể gặp một số vấn đề tương thích trên một số trình duyệt cũ hoặc hệ điều hành.</p>
        <SyntaxHighlighter language="javascript" style={materialDark}>
          {embed}
        </SyntaxHighlighter>
      </div>
      <div className='source-code'>
        <h3>Iframe</h3>
        <p>Thẻ iframe cũng cho phép nhúng các tệp PDF vào trang web, và nó cũng hỗ trợ nhúng các trang web khác.</p>
        <p>Ưu điểm của iframe là nó được hỗ trợ tốt trên hầu hết các trình duyệt và hệ điều hành. 
          Tuy nhiên, một số vấn đề an ninh có thể phát sinh khi nhúng nội dung từ một nguồn bên ngoài.</p>
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