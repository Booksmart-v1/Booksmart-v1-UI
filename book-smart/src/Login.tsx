import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
//   setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
// import Tab1 from './pages/Tab1';
// import Tab2 from './pages/Tab2';
// import Tab3 from './pages/Tab3';
import Welcome from './pages/login/Welcome';

setupIonicReact();

const Login: React.FC = () => (
  <IonApp>
    {/* <IonReactRouter>
      {/* <IonTabs> 
        <IonRouterOutlet>
          <Route exact path="/welcome"> */}
            <Welcome />
          {/* </Route> */}
          {/* <Route exact path="/signin">
            <Tab2 />
          </Route>
          <Route path="/signup">
            <Tab3 />
          </Route> */}
          {/* <Route exact path="/">
            <Redirect to="/welcome" />
          </Route>
        </IonRouterOutlet> */}
        {/* <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={triangle} />
            <IonLabel>Tab 1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={ellipse} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
        </IonTabBar> */}
      {/* </IonTabs> */}
    {/* </IonReactRouter> */}
  </IonApp>
);

export default Login;