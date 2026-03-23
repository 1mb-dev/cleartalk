import { Route, Switch } from 'wouter';
import { Layout } from './components/layout.tsx';
import { Coach } from './routes/coach.tsx';
import { People } from './routes/people.tsx';
import { PersonDetail } from './routes/person.tsx';
import { Log } from './routes/log.tsx';
import { Profile } from './routes/profile.tsx';
import { Insight } from './routes/insight.tsx';

export function App() {
  return (
    <Switch>
      {/* Public route -- no tab bar */}
      <Route path="/insight/:pair/:situation" component={Insight} />

      {/* App routes -- with tab bar */}
      <Route>
        <Layout>
          <Switch>
            <Route path="/" component={Coach} />
            <Route path="/coach/:contactId" component={Coach} />
            <Route path="/coach/:contactId/:situation" component={Coach} />
            <Route path="/people" component={People} />
            <Route path="/people/:id" component={PersonDetail} />
            <Route path="/log" component={Log} />
            <Route path="/profile" component={Profile} />
            <Route>
              <div class="route-shell">
                <h1>Not found</h1>
                <p>This page doesn't exist.</p>
              </div>
            </Route>
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}
