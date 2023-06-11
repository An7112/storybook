import Tabs from 'component/tabs/tabs'
import React, { useCallback, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './layout.css'
import { DiClojureAlt } from 'react-icons/di';

interface TabProps {
    tabKey: string;
}
const CustomListView: React.FC<TabProps> = (props) => {

    const codeReactjs = `
        //HTML
        <>
            //Header
            <div id="header">
            </div>

            //Sidebar
            <div id="sidebar" class="open">

            </div>

            //Content
            <div className="content open">
                <div className="content-area">
                </div>
            </div>
        </>

        //CSS
        #header {
            width: 100vw;
            height: 80px;
            padding: var(--spacing-sm);
            background-color: var(--bg-contrast);
            position: fixed;
            display: flex;
            gap: var(--spacing-sm);
            align-items: center;
            z-index: 10;
        }
        
        #sidebar {
            width: 240px;
            height: calc(100vh - 80px);
            background-color: #ccc;
            margin-top: 80px;
            position: fixed;
            z-index: 9;
            background-color: var(--bg-contrast);
            left: -240px;
            transition: left 0.3s ease;
        }
        .content.open {
            width: calc(100% - 240px);
            transition: ease-in-out 0.3s;
        }
        .open {
            left:0;
        }
        .content {
            margin-left: auto;
            width: 100%;
            transition: ease-in-out 0.3s;
            padding: 100px 20px 20px 20px;
            min-height: 100vh;
            background-color: var(--bg-main);
        }
    `;

    const codeJS = `
        //HTML
        <body>
            //Header
            <div id="header">
            </div>

            //Sidebar
            <div id="sidebar" class="open">

            </div>

            //Content
            <div class="content open">
                <div class="content-area">
                </div>
            </div>
        </body>

    //CSS
    #header {
        width: 100vw;
        height: 80px;
        padding: var(--spacing-sm);
        background-color: var(--bg-contrast);
        position: fixed;
        display: flex;
        gap: var(--spacing-sm);
        align-items: center;
        z-index: 10;
    }
    
    #sidebar {
        width: 240px;
        height: calc(100vh - 80px);
        background-color: #ccc;
        margin-top: 80px;
        position: fixed;
        z-index: 9;
        background-color: var(--bg-contrast);
        left: -240px;
        transition: left 0.3s ease;
    }
    .content.open {
        width: calc(100% - 240px);
        transition: ease-in-out 0.3s;
    }
    .open {
        left:0;
    }
    .content {
        margin-left: auto;
        width: 100%;
        transition: ease-in-out 0.3s;
        padding: 100px 20px 20px 20px;
        min-height: 100vh;
        background-color: var(--bg-main);
    }
    
  `;

    return (
        <div className='container-custom'>
            <div className='layout-left'>
                <h3>Component Overview</h3>
                <p>Layout: The layout wrapper, in which Header Sider Content Footer or Layout itself can be nested, and can be placed in any parent container.</p>
            </div>
            <div className='source-code'>
                <h3>Code</h3>
                <SyntaxHighlighter language="javascript" style={materialDark}>
                    {props.tabKey === 'JS'
                        ?
                        codeJS
                        :
                        codeReactjs
                    }
                </SyntaxHighlighter>

            </div>
        </div>
    );
}

function Layout() {

    const Item = useCallback((props: TabProps) => {
        return <CustomListView {...props} />;
    }, []);

    return (
        <Tabs RowList={Item} />
    )
}

export default Layout