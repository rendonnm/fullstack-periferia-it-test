import { describe, it, expect, beforeEach } from "vitest";
import { useAuthStore } from "../stores/authStore";

describe("authStore", () => {
  beforeEach(() => {
    useAuthStore.setState({ token: null });
    localStorage.clear();
  });

  it("should initialize with null token", () => {
    const { token } = useAuthStore.getState();
    expect(token).toBeNull();
  });

  it("should set token", () => {
    const testToken = "test-jwt-token";
    const { setToken } = useAuthStore.getState();

    setToken(testToken);

    const { token } = useAuthStore.getState();
    expect(token).toBe(testToken);
  });

  it("should logout and clear token", () => {
    const { setToken, logout } = useAuthStore.getState();

    setToken("test-token");
    expect(useAuthStore.getState().token).toBe("test-token");

    logout();
    expect(useAuthStore.getState().token).toBeNull();
  });

  it("should persist token in localStorage", () => {
    const testToken = "persisted-token";
    const { setToken } = useAuthStore.getState();

    setToken(testToken);

    const storedData = localStorage.getItem("auth-storage");
    expect(storedData).toBeTruthy();

    const parsed = JSON.parse(storedData!);
    expect(parsed.state.token).toBe(testToken);
  });
});
