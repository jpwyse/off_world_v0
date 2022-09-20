import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { ErrorBoundary } from 'react-error-boundary';
import routes from './routes/routes';
import { authenticate } from './redux/actions/auth';
import ErrorMsg from './elements/ErrorMsg';



const App = () => {
  const dispatch = useDispatch();
  const routing = useRoutes(routes());


  useEffect(() => {
    dispatch(authenticate());
  }, []);


  return (
    <React.Fragment>
      <SnackbarProvider hideIconVariant>
        <ErrorBoundary FallbackComponent={ErrorMsg}>
          {routing}
        </ErrorBoundary>
       </SnackbarProvider>
    </React.Fragment>
  );
};

export default App;
