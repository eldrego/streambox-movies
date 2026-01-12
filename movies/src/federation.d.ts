declare module 'streambox/useAuthStore' {
  import { UseBoundStore } from 'zustand';
  import { AuthState } from 'streambox/src/store/auth.store';
  const useAuthStore: UseBoundStore<AuthState>;
  export default useAuthStore;
}
