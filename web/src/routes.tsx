import { BrowserRouter, Route, Switch } from "react-router-dom";

import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import TeacherList from "./pages/TeacherList";
import TeacherForm from "./pages/TeacherForm";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/study" component={TeacherList} />
        <Route path="/give-classes" component={TeacherForm} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
