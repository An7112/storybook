import Tabs from 'component/tabs/tabs';
import React, { useCallback } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
interface TabProps {
  tabKey: string;
}
const CustomListView: React.FC<TabProps> = (props) => {

  const realtime = `
    useEffect(() => {
      const newSocket = io('http://server-url'); // Thay thế 'server-url' bằng URL của máy chủ thực tế

      newSocket.on('realtimeNameFromServer', (newData: string) => {
        //Do something with the received data
      });

      return () => {
        newSocket.disconnect(); // Ngắt kết nối khi component bị hủy
      };
    }, []);
  `;

  return (
    <div className='container-custom'>
      <div>
        <h3>Realtime access.</h3>
        <p>Library: socket.io-client</p>
      </div>

      <div className='source-code'>
        <h3>Code</h3>
        <SyntaxHighlighter language="javascript" style={materialDark}>
          {realtime}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
function Realtime() {
  const Item = useCallback((props: TabProps) => {
    return <CustomListView {...props} />;
  }, []);

  return (
    <Tabs tabList={[{ id: 1, title: 'ReactJS' }]} RowList={Item} />
  )
}

export default Realtime