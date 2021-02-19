import * as H from "history";

export namespace ReactRouter {

	export interface RouteComponentProps<P> {
		match: match<P>;
		location: H.Location;
		history: H.History;
		staticContext?: any;
	}

	export interface match<P> {
		params: P;
		isExact: boolean;
		path: string;
		url: string;
	}

	export interface ReduxConnected<P> {
		params: P,
		match: match<P>,
	}
}