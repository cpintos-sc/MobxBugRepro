import { flow, Instance, SnapshotOut, types } from 'mobx-state-tree';
import { withRootStore } from './withRootStore';

const AppStateStateStoreModel = types
  .model('AppStateStore')
  .props({})
  .extend(withRootStore)
  .actions(self => ({
    demoFunction: flow(function* () {
      const rootStore = self.rootStore as RootStore;
      // Here is the problem, comment the next line and uncomment the following one
      yield rootStore.handleLogout(); // This is not working
      // rootStore.handleLogout(); // This does, but we can't use yield and pause the execution
    }),
  }));

const RootStoreModel = types
  .model('RootStore')
  .props({
    appStateStore: types.optional(AppStateStateStoreModel, {}),
  })
  .actions(self => ({
    // Note that the flow function does not inherit the type of the parameter
    // it shows as "(property) handleLogout: (forcedLogout?: any) => Promise<void>"
    handleLogout: flow(function* (forcedLogout = false) {
      // do something async, for example, flush cookies, delete device token, etc.
    }),
  }));

export interface RootStore extends Instance<typeof RootStoreModel> {}

export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}

export interface AppStateStateStore
  extends Instance<typeof AppStateStateStoreModel> {}

export interface AppStateStateStoreSnapshot
  extends SnapshotOut<typeof AppStateStateStoreModel> {}
