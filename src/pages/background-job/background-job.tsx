import Tabs from 'component/tabs/tabs';
import React, { useCallback } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
interface TabProps {
  tabKey: string;
}
const CustomListView: React.FC<TabProps> = (props) => {

  const backgroundJob = `
    useEffect(() => {
      const id = '' // Replace it with the id of the element that needs to be refreshed
      const unSubFromRefreshBackgroundJob = RealTimeAccess.subscribe(REFRESH_BACKGROUND_JOB, (_, data: { id?: string }) => {
        if (data.id === id) {
          //Do something
        }
      });
      return () => {
        unSubFromRefreshBackgroundJob();
      }
    }, []) //id or name of the component to refresh

    return (
      //UI
      <ManageJobTable/>
      <Button></Button>
    )
  `;

  return (
    <div className='container-custom col-2'>
      <div>
        <h3>Background Job.</h3>
        <p>Use Realtime access to create background job functionality.</p>
      </div>

      <div className='source-code'>
        <h3>Code</h3>
        <SyntaxHighlighter language="javascript" style={materialDark}>
          {backgroundJob}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

function BackgroundJob() {

  const Item = useCallback((props: TabProps) => {
    return <CustomListView {...props} />;
  }, []);

  return (
    <Tabs tabList={[{ id: 1, title: 'ReactJS' }]} RowList={Item} />
  )
}

export default BackgroundJob