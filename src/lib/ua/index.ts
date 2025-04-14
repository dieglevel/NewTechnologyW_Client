import { GetServerSidePropsContext } from "next";

export async function getUserAgent({ req }: GetServerSidePropsContext) {
	const userAgent = req.headers["user-agent"] || "";
	return {
		props: { userAgent },
	};
}
