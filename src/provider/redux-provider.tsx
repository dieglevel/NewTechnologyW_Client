"use client";

import { LocalStorageKey } from "@/lib/local-storage";
import { store } from "@/redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
	return <Provider store={store}>{children}</Provider>;
}
