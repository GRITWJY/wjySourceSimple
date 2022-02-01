import {START} from "../util/route";

export class History {

	constructor(router, base) {
		this.router = router
		this.current = START
	}

	listen(cb) {
		this.cb = cb
	}

	transitionTo(location, onComplete, onAbort) {
		const route = this.router.match(location, this.current)
		console.log('wjy-route', route)
		this.confirmTransition(route,
			() => {
				this.updateRoute(route)
				onComplete && onComplete(route)
			},
			err => {
			}
		)
	}

	confirmTransition(route, onComplete, onAbort) {
		onComplete()
	}

	updateRoute(route) {
		this.current = route
		this.cb && this.cb(route)
	}
}
