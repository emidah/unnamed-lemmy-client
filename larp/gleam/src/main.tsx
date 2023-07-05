import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.scss'
import { SWRConfig } from 'swr'
import PostView from './components/postView/PostView.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/post/:postId",
        element: <PostView />
      }
    ]

  },

]);

const SWROptions = {
  errorRetryInterval: 2000
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SWRConfig value={SWROptions}>
      <RouterProvider router={router} />
    </SWRConfig>
  </React.StrictMode>,
)
