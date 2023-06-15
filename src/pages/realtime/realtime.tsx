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

  const realtimeRedux = `
    import React, { useState, useEffect } from 'react';
    import { useDispatch } from 'react-redux';
    import { Dispatch } from 'redux';
    
    type HandlerFunction = (topic: string, data: any) => void
    type KeyGenerator<Props> = string | ((props: Props) => string)
    export interface PubSubInterface {
        subscribe(topic: string, callback: HandlerFunction): () => void,
        publish(topic: string, payload: object): void,
    }
    
    export type MessageData<MessageContent = any> = {
        count: number,
        messageContent: MessageContent | null,
        topic?: string,
    }
    
    export class InternalPubSub implements PubSubInterface {
        key: string;
        connection: Record<string, Record<string, HandlerFunction>>
    
        constructor(key: string) {
            this.key = key;
            this.connection = {};
        }
    
        subscribe(topic: string, callback: HandlerFunction) {
            const token = //Random;
    
            if (!this.connection[topic]) {
                this.connection[topic] = { [token]: callback };
            }
            else this.connection[topic][token] = callback;
    
            return () => {
                delete this.connection[topic][token];
            };
        }
    
        publish(topic: string, payload: object) {
            if (!this.connection[topic]) return;
    
            Object.keys(this.connection[topic]).forEach(token => {
                const handler = this.connection[topic][token];
                handler?.(topic, payload);
            });
        }
    
        withEvent<Props, MessageContent = {}>(
            keyList: KeyGenerator<Props> | KeyGenerator<Props>[],
            callback?: (message: MessageContent, dispatch: Dispatch<any>, props: Props) => void,
        ) {
            return (Comp: React.ComponentType<Props>): React.ComponentType<Props & { message?: MessageData<MessageContent> | undefined }> => {
                return (props: Props & { message?: MessageData<MessageContent> | undefined }) => {
                    const [data, setData] = useState<MessageData>({
                        count: 0,
                        messageContent: null,
                        topic: undefined,
                    });
                    const dispatch = useDispatch();
    
                    useEffect(() => {
                        const normalizedKeyGetterList = Array.isArray(keyList) ? keyList : [keyList];
                        const unSubscribeMap = normalizedKeyGetterList
                            .map(keyGetter => {
                                const normalizedKey = typeof keyGetter === 'function' ? keyGetter(props) : keyGetter;
                                const unSubscribeCallback = this.subscribe(
                                    normalizedKey,
                                    (topic: string, data: any) => {
                                        setData(cur => ({
                                            count: cur.count + 1,
                                            messageContent: data,
                                            topic,
                                        }));
                                        if (callback) callback(data, dispatch, props);
                                    },
                                );
                            
                                return unSubscribeCallback;
                            });
    
                        return () => {
                            unSubscribeMap.map((item: Function) => item());
                        };
                    }, [dispatch, props]);
    
                    return <Comp message={data} {...props} />;
                };
            };
        }
    }
  `

  return (
    <div className='container-custom col-2'>
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
      <div className='source-code'>
        <h3>Realtime access with Redux</h3>
        <SyntaxHighlighter language="javascript" style={materialDark}>
          {realtimeRedux}
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