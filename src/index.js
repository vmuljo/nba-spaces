import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import Root from './routes/Root';
import Index from './routes/Index';
import { fetchTeam, fetchTeams, createSpace, fetchSpaces, fetchSpace, deleteSpace, updateSpace, saveComment} from './api';
import Team from './routes/Team';
import CreateSpaceModal from './routes/CreateSpaceModal';
import { toast } from 'react-toastify';
import SpacesIndex from './routes/SpacesIndex';
import Space from './routes/Space';
import NotFound from './routes/NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Index />,
        loader(){
          return fetchTeams();
        }
      },
      {
        path: '*',
        element: <NotFound />
      },
      {
        path: "/teams/:id",
        loader({params}){
          return fetchTeam(params.id);
        },
        element: <Team />,
        children: [
          {
            path: "/teams/:id",
            loader({params}){
              return fetchSpaces(params.id);
            },
            element: <SpacesIndex />,
            children: [
              {
                path: "/teams/:id/",
                element: <></>
              },
              {
                path: "/teams/:id/spaces/",
                element: <></>
              },
              {
                path: "/teams/:id/spaces/:spaceId",
                loader({params}){
                  return fetchSpace(params.spaceId);
                },
                element: <Space />,
                action({request, params}){
                  return request.formData().then((formData) => {
                    let today = new Date();
                    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    let dateTime = date+' '+time;

                    let username = formData.get("username");
                    let message = formData.get("chat-message");
                    if((username.length == 0) || message.length == 0){
                      return redirect(`/teams/${params.id}/spaces/${params.spaceId}/`)
                    }
                    else{
                      return saveComment(params.spaceId, formData.get("username"), dateTime, formData.get("chat-message")).then(
                        () => {
                          toast.success("Message successfully added");
                          return redirect(`/teams/${params.id}/spaces/${params.spaceId}/`)
                        },
                        () => {
                          toast.error("Failed to send message");
                          return redirect(`/teams/${params.id}/spaces/${params.spaceId}/`)
                        }
                      )
                    }
                  })
                },
              }
            ]
          },
          {
            path: "/teams/:id/createspaces",
            loader({params}){
              return fetchTeam(params.id);
            },
            element: <CreateSpaceModal />,
            action({request, params}){
              return request.formData().then((formData) => {
                const spaceName = formData.get("space-name");
                const spacePass = formData.get("space-pass");
                if((spaceName.length == 0) || spacePass.length == 0){
                  return redirect(`/teams/${params.id}/createspaces/`)
                } else {
                  return createSpace(params.id, formData.get("space-name"), formData.get("space-pass")).then(
                    () => {
                      toast.success("Space successfully created.");
                      return redirect(`/teams/${params.id}`)
                    },
                    () => {
                      toast.error("Space not created :(");
                      return redirect(`/teams/${params.id}/createspaces`)
                    }
                  )
                }
              })
            }
          }
        ]
      },
      {
        path: "/spaces/:spaceId/destroy",
        action({ request, params }) {
          return request.formData().then((formData) => {
            const password = formData.get("space-pass");
            // console.log(shajs('sha256').update(password).digest('hex'))
            const verifyPass = formData.get("verifyPass");
            const teamId = formData.get("teamId");
            if(password == verifyPass){
              return deleteSpace(params.spaceId).then(() => {
                toast.success("Your space was deleted.");
                return redirect(`/teams/${teamId}/`);
              });
            } else {
              console.log(password)
              console.log(verifyPass)
              toast.error("Incorrect password. Your space could not deleted.");
              
              return redirect(`/teams/${teamId}/spaces/${params.spaceId}/`);
            }
          });
        },
      },
      {
        path: "/spaces/:spaceId/edit",
        action({ request, params }) {
          return request.formData().then((formData) => {
            const password = formData.get("space-pass");
            const verifyPass = formData.get("verifyPass");
            const updatedTitle = formData.get("updated-space-name");
            const teamId = formData.get("teamId");
            if(password == verifyPass){
              return updateSpace(params.spaceId, updatedTitle).then(() => {
                toast.success("Your space was successfully updated.");
                return redirect(`/teams/${teamId}/spaces/`);
              });
            } else {
              toast.error("Could not update Space name. Incorrect password. Re-enter your password.");
              
              return redirect(`/teams/${teamId}/spaces/${params.spaceId}/`);
            }
          });
        },
      }
      
    ]
  },
  
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
