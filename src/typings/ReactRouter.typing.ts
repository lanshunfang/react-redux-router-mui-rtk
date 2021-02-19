import { match as RawMatch, RouteComponentProps as RawRouteComponentProps } from "react-router";
import { useLocation } from "react-router-dom";

export namespace ReactRouter {

	// export interface RouteComponentProps<P> {
	// 	match: match<P>;
	// 	location: H.Location;
	// 	history: H.History;
	// 	staticContext?: any;
	// }
	export type RouteComponentProps = RawRouteComponentProps;

	// export interface match<P> {
	// 	params: P;
	// 	isExact: boolean;
	// 	path: string;
	// 	url: string;
	// }

	export type match = RawMatch;

	export interface ReduxConnect {
		location: ReturnType<typeof useLocation>,
		// params: ReturnType<typeof useParams>,
	}
}